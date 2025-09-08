import { createCommentService, findCommentByIdService } from "../services/commentService.js"

export async function createComment(req, res) {
    try {
        // console.log("Request body:", req.body)
        // console.log("Request user:", req.user._id)
        const { content, onModel, commentableId } = req.body;
        const newComment = await createCommentService(content, req.user._id, onModel, commentableId);
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            newComment: newComment
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

export async function getCommentById(req, res) {
    try {
        const { id } = req.params;
        const response = await findCommentByIdService(id);
        return res.status(200).json({
            success: true,
            message: "Comment fetched successfully",
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