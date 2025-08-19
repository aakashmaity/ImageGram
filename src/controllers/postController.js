import { createPostService, findAllPostsService } from "../services/postService.js";


export async function createPost(req, res) {
    // call the service layer function
    
    const newPost = await createPostService({
        caption: req.body.caption,
        image: req.file.path,
    })
    

    return res.status(201).json({ 
        success: true,
        message: "Post created successfully",
        data: newPost
    })
}

export async function getAllPosts(req, res) {
    
    const posts = await findAllPostsService();

    return res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: posts
    })
}
