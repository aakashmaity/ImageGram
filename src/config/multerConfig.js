import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";


const storage = new CloudinaryStorage({
    resource_type: "auto",
    cloudinary: cloudinary,
    params:{
        folder: "imageGram",
        // allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: (req, file) => {
            // console.log("multer:filee -> ", file)
            return "post-"+Date.now() + Math.round(Math.random() * 1e9)
        }
    }
})

const upload = multer({ storage: storage });

export default upload;