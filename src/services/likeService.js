import { findCommentById } from "../repositories/commentRepository.js";
import { createLike } from "../repositories/likeRepository.js";
import { findPostById } from "../repositories/postRepository.js";


export const createLikeService = async (likeType, userId, onModel, likableId) => {
    try {
        
        const parent = await fetchLikableParent(onModel, likableId);

        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not exists`
            }
        }

        const newLike = await createLike(likeType, userId, onModel, likableId);

        await addChildReactionToParent(onModel, newLike, parent);

        return newLike;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
// export const findCommentByIdService = async (id) => {
//     try {
//         const comment = await findCommentById(id);

//         if (!comment) {
//             throw {
//                 status: 404,
//                 message: "Comment not exists"
//             }
//         }
//         return comment;

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// export const findCommentsByCommentableIdService = async (onModel, commentableId, offset, limit) => {
//     try {
        
//         const comments = await findCommentsByCommentableId(onModel, commentableId, offset, limit);

//         const totalDocuments = await countAllComments(onModel, commentableId);
//         const totalPages = Math.ceil(totalDocuments / limit);

//         return { comments, totalDocuments, totalPages };

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }





// helper functions 
const fetchLikableParent = async (onModel, likableId) => {
    try {
        let parent;

        if (onModel.toLowerCase() === 'post') {
            parent = await findPostById(likableId);
        } else if (onModel.toLowerCase() === 'comment') {
            parent = await findCommentById(likableId);
        }
        return parent;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addChildReactionToParent = async (onModel, like, parent) => {
    try {
        if (onModel.toLowerCase() === "post") {
            parent.likes.push(like._id);
        } else if (onModel.toLowerCase() === "comment") {
            parent.likes.push(like._id);
        }
        await parent.save();

    } catch (error) {
        console.log(error);
        throw error;
    }
}