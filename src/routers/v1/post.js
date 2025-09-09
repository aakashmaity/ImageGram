// Here all the post related routes present
// We look at the remaining part of url after /posts

import express from "express";
import upload from "../../config/multerConfig.js"
import { createPost, deletePost, getAllPosts, getPostsMadeByUser, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Create a new post!
 *     responses:
 *       200:
 *         description: Post created successfully.
 */


router.post("/", isAuthenticated, upload.single("image"), validate(zodPostSchema), createPost);

router.get("/", isAuthenticated, getAllPosts);

router.get("/user/:userId", isAuthenticated, getPostsMadeByUser);

router.get("/:id/comments", getAllPosts);

router.delete("/:id", isAuthenticated, deletePost);

router.put("/:id", isAuthenticated, isAdmin, upload.single("image"), updatePost);  // Only Admin can update any post, Normal user cannot update any post details




export default router;