// Here all the post related routes present
// We look at the remaining part of url after /posts

import express from "express";
import upload from "../config/multerConfig.js";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", upload.single("image"), createPost);
router.get("/", getAllPosts);


export default router;