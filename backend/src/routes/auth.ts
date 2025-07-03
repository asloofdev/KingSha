import  express,{Request,Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import verfyToken from "../middleware/auth";


const router = express.Router();

router.post("/login",[
    check("email","email is required").isString(),
    check("password","password with 6 or more character is required").isLength({min:6})
],async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        res.status(400).json({message:errors.array().map(err=>err.msg)});
        return;
    }
                                                                                                                                
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email:email});

        if(!user){
            res.status(500).json({message:"Invalid Credential"});
            return;
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).json({message:"Invalid Credential"})
            return;
        }

        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRETE_KEY as string,
            {expiresIn:"1d"}
        );

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:86400000,
        });

        res.status(200).json({userId:user._id})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
})

router.get("/validate-token",verfyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})

export default router