import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";


const storage = new CloudinaryStorage({
    resource_type: "auto",
    cloudinary: cloudinary,
    params:{
        folder: "imageGram",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

const upload = multer({ storage: storage });
console.log("upload::: ", upload);

export default upload;