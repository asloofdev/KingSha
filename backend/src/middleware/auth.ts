import { NextFunction,Request,Response} from "express";
import jwt from "jsonwebtoken"

const verfyToken = (req:Request,res:Response,nextFunction:NextFunction) =>{
    const token = req.cookies["auth_token"];

    if(!token){
        res.status(401).json({message:"unathorized"})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY as string)
    }
    catch(error ){
        res.status(401).json({message:'unauthorized'})
    }
} 