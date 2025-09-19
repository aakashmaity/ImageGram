// Here all the post related routes present
// We look at the remaining part of url after /posts

import express from "express";
import upload from "../../config/multerConfig.js"
import { createPost, deletePost, getAllPosts, getPostById, getPostsMadeByUser, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";
import { createLike } from "../../controllers/likeController.js";

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


// fetch post details by postId
router.get("/:id", isAuthenticated, getPostById)

// Create a new post
router.post("/", isAuthenticated, upload.single("image"), validate(zodPostSchema), createPost);

// create new like for post
router.post("/:id/like", isAuthenticated, createLike);

// get All posts
router.get("/", isAuthenticated, getAllPosts);

// get posts made by userId
router.get("/user/:userId", isAuthenticated, getPostsMadeByUser);

// get all post's comments
router.get("/:id/comments", getAllPosts);

// delete a post
router.delete("/:id", isAuthenticated, deletePost);

// update a post
router.put("/:id", isAuthenticated, isAdmin, upload.single("image"), updatePost);  // Only Admin can update any post, Normal user cannot update any post details





export default router;