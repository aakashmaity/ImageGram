// server -> ODM (Object Document Mapper) -> Database
// ODM library automatically converts methods into database queries

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
    try {
        const data = await mongoose.connect(process.env.DB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Something went wrong while connecting to the database");
        console.error(error);
    }
}