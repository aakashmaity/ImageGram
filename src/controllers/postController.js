import { createPostService, deletePostByIdService, getAllPostsService, updatePostByIdService } from "../services/postService.js";


export async function createPost(req, res) {
    // call the service layer function

    const newPost = await createPostService({
        caption: req.body?.caption,
        image: req.file?.path,
    })


    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost
    })
}

//  get all post in paginated format -> /api/v1/posts?limit=10&offset=0  
export async function getAllPosts(req, res) {

    try {
        const offset = req.query?.offset || 0
        const limit = req.query?.limit || 10

        const paginatedPosts = await getAllPostsService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "Posts fetch successfully",
            data: paginatedPosts
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export async function deletePost(req, res) {
    try {
        const postId = req.params?.id
        const response = await deletePostByIdService(postId);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.json({
            success: true,
            message: "Post deleted Successfully",
            data: response
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const updateObject = req.body

        if(req?.file){
            updateObject.image = req?.file?.path
        }
                
        const response = await updatePostByIdService(postId, updateObject);
        return res.status(200).json({
            success: true,
            message:"Post updated successfully",
            data: response
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}