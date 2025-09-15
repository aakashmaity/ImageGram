import { createLikeService, deleteLikeService, updateLikeService } from "../services/likeService.js";


export async function createLike(req, res) {
    try {
        // console.log("Request body:", req.body)
        // console.log("Request user:", req.user._id)

        const { reactionType: likeType, onModel, likableId } = req.body;
        const user = req.user._id;

        const newLike = await createLikeService(likeType, user, onModel, likableId);
        console.log("New like created:", newLike);
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

export async function updateLike(req, res) {
    try {
        console.log("Request body:", req.body)
        console.log("Request user:", req.user._id)

        const { reactionType: likeType, onModel, likableId } = req.body;
        const { id } = req.params
        const user = req.user._id;

        const newLike = await updateLikeService(id, likeType, user, onModel, likableId);
        console.log("like updated:", newLike);
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

export async function deleteLike(req, res) {
    try {
        // console.log("Request body:", req.body)
        // console.log("Request user:", req.user._id)

        const { onModel, likableId } = req.body;
        const { id } = req.params;
        console.log("deletable likeid:",id)

        const deletedLike = await deleteLikeService(id, onModel, likableId);
        return res.status(200).json({
            success: true,
            message: "Like deleted successfully",
            deletedLike: deletedLike
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

// export async function findLikesMadeByUserId(req, res) {
//     try {
//         // console.log("Request body:", req.body)
//         // console.log("Request user:", req.user._id)

//         const { onModel, likableId } = req.query;
//         // const { id } = req.params;

//         const likes = await findLikesMadeByUserIdService(req.user._id, onModel, likableId);
//         return res.status(200).json({
//             success: true,
//             message: "Likes fetched successfully",
//             likes: likes
//         })

//     } catch (error) {
//         if (error?.status) {
//             return res.status(error?.status).json({
//                 success: false,
//                 message: error?.message
//             })
//         }
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         })
//     }
// }