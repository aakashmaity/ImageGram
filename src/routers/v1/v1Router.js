import express from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";
import commentRouter from "./comment.js"
import likeRouter from './like.js'
import notificationRouter from './notification.js'

const router = express.Router();


router.use('/posts', postRouter)  // If in the remaining url i.e. after /api/v1 , we have url starts with /posts, then forward to postRouter to handle the request
router.use('/users', userRouter)  // If in the remaining url i.e. after /api/v1 , we have url starts with /users, then forward to userRouter to handle the request
router.use('/comments', commentRouter) 
router.use('/like', likeRouter)
router.use('/notifications', notificationRouter)


// Testing 
router.get("/ping", (req, res) => {
    const params = req.query;
    console.log("Query Params:", params);

    const body = req.body;
    console.log("Request Body:", body);

    const user = req?.user
    console.log("userr: ", user);
    
    return res.json({message: "Hello! Pong", params, body, user});
})

export default router;