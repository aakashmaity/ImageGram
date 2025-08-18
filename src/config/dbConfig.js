// server -> ORM/ODM (Object Relation/Document Mapper) -> Database
// ODM library acts as a interface b/w code and  raw queries
// It automatically converts object oriented functions into database raw queries.
// Ex. Mongoose, Sequelize, TypeORM, Prisma

import mongoose from "mongoose";
import { config } from "./serverConfig.js";


export default async function connectDB() {
    try { 
        const data = await mongoose.connect(config.db.url)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Something went wrong while connecting to the database");
        console.error(error);
    }
}