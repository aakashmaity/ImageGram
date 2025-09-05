import Comment from "../schema/comment.js"

export const createComment = async (content, userId, onModel, commentableId) => {
    try {
        const newComment = await Comment.create({ content, userId, onModel, commentableId, likes: [], replies: [] });
        return newComment;
    } catch (error) {
        throw error;
    }
}
export const findCommentById = async (id) => {
    try {
        const comment = await Comment.findById(id).populate('userId', 'username email _id').populate('replies', 'userId onModel commentableId content replies _id');
        return comment;
    } catch (error) {
        throw error;
    }
}