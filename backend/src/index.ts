import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";


const mongoUri = process.env.MONGO_DB_CONNECTION;

if (!mongoUri) {
    
    throw new Error('MONGO_DB_CONNECTION environment variable is not defined.');
}


mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err))

    
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.get("/test",async(req:Request,res:Response)=>{
    res.json({message:"hello"})
})

app.listen(7000,()=>{
    console.log('Server is running on local server 7000')})
