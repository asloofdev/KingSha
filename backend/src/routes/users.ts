import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { ReturnDocument } from "mongodb";

const router = express.Router();

router.post("/register",
  [
    check("firstName","First Name is required").isString(),
    check("lastName","
      
      
      
      
      
      
      last Name is required").isString(),
    check("email","email is required").isEmail(),
    check("password"," password with 6 or more character required").isLength({min:6})
  ]
  , async (req: Request, res: Response)=> {
  
    const erros = validationResult(req);
    if(!erros.isEmpty()){
      res.status(400).json({message:erros.array().map(error => error.msg)});
      return;
    }

    try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
       res.status(400).json({ message: "User already Created" });
       return;
    }
    else{
      user = new User(req.body);
            await user.save();

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRETE_KEY as string,
                { expiresIn: "1d" }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000,
            });
         
              res.status(200).json({ message: "User registration successful" });
              return;
    }
   
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: "Something went wrong" });
     return;
  }
});

export default router; 