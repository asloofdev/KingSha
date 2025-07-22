import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"
import {v2 as cloundinary} from "cloudinary"

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
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URI,
    credentials:true
}));
app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

app.listen(7000,()=>{
    console.log('Server is running on local server 7000')})
