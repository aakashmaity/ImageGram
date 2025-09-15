import Like from "../schema/like.js"

export const createLike = async (likeType, user, onModel, likableId) => {
    try {
        let newLike = await Like.create({ likeType, user, onModel, likableId });

        newLike = await newLike.populate([
            { path: "user", select: "username email _id" },
        ]);
        return newLike;
    } catch (error) {
        throw error;
    }
}

export const updateLikeById = async (id, likeType, user, onModel, likableId) => {
    try {
        const updatedLike = await Like.findByIdAndUpdate(id, { likeType, user, onModel, likableId }, { new: true })
            .populate([
                { path: "user", select: "username email _id" },
            ]);
        return updatedLike;

    } catch (error) {
        throw error;
    }
}

export const deleteLikeById = async (id) => {
    try {
        const deletedLike = await Like.findByIdAndDelete(id);
        return deletedLike;
    } catch (error) {
        throw error;
    }
}

// export const findLikesMadeByUserId = async (userId, onModel, likableId) => {
//     try {
//         const likes = await Like.find({ userId, onModel, likableId }).populate('userId', 'username email _id');
//         console.log("Likes in repo:", likes);
//         return likes;
//     } catch (error) {
//         throw error;
//     }
// }