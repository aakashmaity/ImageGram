import Comment from "../schema/comment.js"

export const createComment = async (content, userId, onModel, commentableId) => {
    try {
        let newComment = await Comment.create({ content, userId, onModel, commentableId, likes: [], replies: [] });

        newComment = await newComment.populate([
            { path: "userId", select: "username email _id" },
            {
                path: "replies",
                select: "userId onModel commentableId content replies _id",
                populate: { path: "userId", select: "username email" }
            }
        ]);
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

export const findCommentsByCommentableId = async (onModel, commentableId, offset = 0, limit = 5) => {
    try {

        const comments = await Comment.find({ onModel, commentableId }).sort({ createdAt: -1 }).skip(offset).limit(limit)
            .populate('userId', 'username email _id')
            .populate({
                path: 'replies',
                select: 'userId onModel commentableId content updatedAt _id',
                populate: {
                    path: 'userId',
                    select: 'username email'
                }
            });
        return comments;
    } catch (error) {
        throw error;
    }
}

export const countAllComments = async (onModel, commentableId) => {
    try {
        const count = await Comment.countDocuments({ onModel, commentableId});
        return count;
    } catch (error) {
        throw error;
    }
}
