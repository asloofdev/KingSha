import express,{Request,Response} from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.memoryStorage()