import { findCommentById } from "../repositories/commentRepository.js";
import { createLike, deleteLikeById, updateLikeById } from "../repositories/likeRepository.js";
import { findPostById } from "../repositories/postRepository.js";
import { notifyAndPersist } from "./notificationService.js";


export const createLikeService = async (likeType, user, onModel, likableId) => {
    try {

        const parent = await fetchLikableParent(onModel, likableId);

        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not exists`
            }
        }

        const isExists = parent?.likes?.some(like => like?.user?._id.toString() == user.toString());

        if(isExists) {
            console.log("React is alraady exists for this user.")
            return null;
        }
        

        const newLike = await createLike(likeType, user, onModel, likableId);

        await addChildReactionToParent(onModel, newLike, parent);

        console.log(`Reaction created with type: ${likeType}`)

        try {
            const lowerModel = onModel.toLowerCase();
            const receiverId = lowerModel === 'post' ? parent?.user?._id : parent?.userId?._id;
            if (receiverId && receiverId.toString() !== user.toString()) {
                const type = lowerModel === 'post' ? 'LIKE_POST' : 'LIKE_COMMENT';
                const message = lowerModel === 'post' ? 'liked your post' : 'liked your comment';
                await notifyAndPersist({
                    type,
                    sender: user,
                    receiver: receiverId,
                    entityModel: lowerModel === 'post' ? 'Post' : 'Comment',
                    entityId: likableId,
                    message
                });
            }
        } catch (notifyError) {
            console.log('Failed to send like notification', notifyError);
        }
        return newLike;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateLikeService = async (id, likeType, user, onModel, likableId) => {
    try {
        const parent = await fetchLikableParent(onModel, likableId);
        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not exists`
            }
        }

        const updatedLike = await updateLikeById(id, likeType, user, onModel, likableId);
        console.log(`Reaction updated to ${likeType}`)
        return updatedLike;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteLikeService = async (id, onModel, likableId) => {
    try {
        const parent = await fetchLikableParent(onModel, likableId);
      
        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not exists`
            }
        }


        await removeChildReactionFromParent(id, onModel, parent);

        const deletedLike = await deleteLikeById(id);
        console.log("Reaction deleted.")
        return deletedLike;

    } catch (error) {
        console.log(error);
        throw error;
    }
}









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
const removeChildReactionFromParent = async (likeId, onModel, parent) => {
    try {
        if (onModel.toLowerCase() === "post") {
            parent.likes.pull(likeId);
        } else if (onModel.toLowerCase() === "comment") {
            parent.likes.pull(likeId);
        }
        await parent.save();

    } catch (error) {
        console.log(error);
        throw error;
    }
}