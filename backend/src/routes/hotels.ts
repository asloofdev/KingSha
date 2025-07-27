import express,{Request,Response} from "express"
import multer from "multer"
import cloudinary from "cloudinary"
import Hotel, { HotelType } from "../models/hotel"
import verfyToken from "../middleware/auth"
import { body } from "express-validator"


const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024//5mb
        
    }
})

router.post("/",verfyToken,[
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("type").notEmpty().withMessage("Hotel type is Required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is Required and it must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilitiy is Required"),
    

],upload.array('image',6),async(req:Request,res:Response) =>{
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel:HotelType = req.body

        const uploadPromises = imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64")
            let dataURI = "data:"+image.mimetype+";base64,"+b64;
            const res =await cloudinary.v2.uploader.upload(dataURI)
            return res.url;

        })

        const imageUrls = await Promise.all(uploadPromises)
        newHotel.imageUrls = imageUrls
        newHotel.lastUpdate = new Date()
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel)
        await hotel.save();

        res.status(201).json(hotel)
    } catch (error) {
        console.log("Error creating hotel:",error)
        res.status(500).json({message:"Something went wrong"})
    }
})