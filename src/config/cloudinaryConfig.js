import { v2 as cloudinary } from "cloudinary";
import { config } from "./envConfig";

const cloudinaryConfig = () => {
    try {
        cloudinary.config({
        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret
    });
    } catch (error) {
        console.log("Something went wrong while configuring Cloudinary");
        log.error(error.message);
    }
}

cloudinaryConfig();

export default cloudinary;
