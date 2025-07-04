import { NextFunction,Request,Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string;
        }
    }
}

const verfyToken = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.cookies.auth_token;

    if(!token){
        res.status(401).json({message:"unathorized"})
        return
        
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY as string)
        req.userId = (decode as JwtPayload).userId
        next()
    }
    catch(error ){
         res.status(401).json({message:'unauthorized'})
         return
        
    }
} 

export default verfyToken;