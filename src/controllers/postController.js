import { createPostService, deletePostByIdService, findPostByIdService, getAllPostsService, getPostsMadeByUserService, updatePostByIdService } from "../services/postService.js";

export async function getPostById(req, res) {
    try {
        const postId = req.params?.id
        const userId = req.user?._id

        const { post } = await findPostByIdService(postId, userId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.json({
            success: true,
            message: "Post fetched Successfully",
            post
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function createPost(req, res) {
    // call the service layer function

    const ACCEPTED_IMAGE_MIMETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    try {
        const img = req.file
        if (!img || !img?.path) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        if (!ACCEPTED_IMAGE_MIMETYPES.includes(img?.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Only .jpg, .jpeg, .png, .webp files are supported"
            })
        }


        const newPost = await createPostService({
            caption: req.body?.caption,
            image: img?.path,
            user: req?.user._id
        })


        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//  get all post in paginated format -> /api/v1/posts?limit=10&offset=0  
export async function getAllPosts(req, res) {
    try {
        const offset = req.query?.offset || 0
        const limit = req.query?.limit || 10
        const userId = req.user?._id

        const { posts, totalDocuments, totalPages } = await getAllPostsService(userId, offset, limit);

        return res.status(200).json({
            success: true,
            message: "Posts fetch successfully",
            posts: posts,
            totalDocuments,
            totalPages,
            currentPage: Math.ceil(offset / limit) + 1
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function getPostsMadeByUser(req, res) {
    try {
        const userId = req.params.userId;
        const offset = req.query?.offset || 0
        const limit = req.query?.limit || 10

        const { posts, totalDocuments, totalPages } = await getPostsMadeByUserService(userId, offset, limit);

        return res.status(200).json({
            success: true,
            message: "Posts fetch successfully",
            posts: posts,
            totalDocuments,
            totalPages,
            currentPage: Math.ceil(offset / limit) + 1
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export async function deletePost(req, res) {
    try {
        const user = req?.user?._id
        const postId = req.params?.id

        const { response, totalDocuments } = await deletePostByIdService(postId, user);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.json({
            success: true,
            message: "Post deleted Successfully",
            data: response,
            totalDocuments,
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const postData = req.body
        console.log("Request body:", req.body)
        console.log("Id data:", postId)

        if (req?.file) {
            postData.image = req?.file?.path
        }

        const response = await updatePostByIdService(postId, postData);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        })
    } catch (error) {
        if (error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}