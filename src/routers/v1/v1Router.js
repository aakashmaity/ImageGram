import express from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";

const router = express.Router();


router.use('/posts', postRouter)  // If in the remaining url i.e. after /api/v1 , we have url starts with /posts, then forward to postRouter to handle the request
router.use('/users', userRouter)  // If in the remaining url i.e. after /api/v1 , we have url starts with /users, then forward to userRouter to handle the request


export default router;