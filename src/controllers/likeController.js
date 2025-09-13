import { createLikeService } from "../services/likeService.js";


export async function createLike(req, res) {
    try {
        // console.log("Request body:", req.body)
        // console.log("Request user:", req.user._id)

        const { reactionType : likeType, onModel, likableId } = req.body;
        const userId = req.user._id;

        const newLike = await createLikeService(likeType, userId, onModel, likableId);
        return res.status(201).json({
            success: true,
            message: "Like created successfully",
            newLike: newLike
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