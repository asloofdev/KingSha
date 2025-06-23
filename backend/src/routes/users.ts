import express,{Request,Response} from "express";
import User from "../models/user"




const router = express.Router();
router.post("/register",async (res:Response,req:Request)=>{
    try {
        let user = await User.findOne({
            email:req.body.email,
        })

        if(user){
            res.status(400).json({message:"User already Created "})
        }

        user = new User(req.body);
        await user.save();

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
})