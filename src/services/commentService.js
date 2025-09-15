import { countAllComments, createComment, findCommentById, findCommentsByCommentableId } from "../repositories/commentRepository.js"
import { findPostById } from "../repositories/postRepository.js"

export const createCommentService = async (content, userId, onModel, commentableId) => {
    try {
        
        const parent = await fetchCommentParent(onModel, commentableId);

        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not exists`
            }
        }

        const newComment = await createComment(content, userId, onModel, commentableId);

        await addChildCommentToParent(onModel, newComment, parent);

        console.log("New comment created")

        return newComment;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const findCommentByIdService = async (id) => {
    try {
        const comment = await findCommentById(id);

        if (!comment) {
            throw {
                status: 404,
                message: "Comment not exists"
            }
        }
        return comment;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findCommentsByCommentableIdService = async (onModel, commentableId, offset, limit) => {
    try {
        
        const comments = await findCommentsByCommentableId(onModel, commentableId, offset, limit);

        const totalDocuments = await countAllComments(onModel, commentableId);
        const totalPages = Math.ceil(totalDocuments / limit);

        return { comments, totalDocuments, totalPages };

    } catch (error) {
        console.log(error);
        throw error;
    }
}




// helper functions 
const fetchCommentParent = async (onModel, commentableId) => {
    try {
        let parent;

        if (onModel.toLowerCase() === 'post') {
            parent = await findPostById(commentableId);
        } else if (onModel.toLowerCase() === 'comment') {
            parent = await findCommentById(commentableId);
        }
        return parent;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
const addChildCommentToParent = async (onModel, comment, parent) => {
    try {
        if (onModel.toLowerCase() === "post") {
            parent.comments.push(comment._id);
        } else if (onModel.toLowerCase() === "comment") {
            parent.replies.push(comment._id);
        }
        await parent.save();

    } catch (error) {
        console.log(error);
        throw error;
    }
}