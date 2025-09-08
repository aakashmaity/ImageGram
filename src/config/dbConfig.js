// server -> ORM/ODM (Object Relation/Document Mapper) -> Database
// ODM library acts as a interface b/w code and  raw queries
// It automatically converts object oriented functions into database raw queries.
// Ex. Mongoose, Sequelize, TypeORM, Prisma

import mongoose from "mongoose";
import { config } from "./envConfig.js";

const MONGODB_URI = config.db.url;

if (!MONGODB_URI) {
    throw new Error("⚠️ Please define MONGODB_URI in your environment variables");
}

// Use global cache in serverless to avoid multiple connections
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            // No need for useNewUrlParser or useUnifiedTopology in Mongoose v6+
            bufferCommands: false, // optional: disables mongoose buffering
        });
    }

    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn;
}