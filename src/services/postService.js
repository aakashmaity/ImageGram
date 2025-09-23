import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById, findPostMadeByUser, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (postobject) => {
    try {
        const caption = postobject.caption?.trim();
        const image = postobject?.image;
        const user = postobject?.user;

        const newPost = await createPost(caption, image, user);
        console.log("New post created")
        return newPost;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findPostByIdService = async (id, userId) => {
    try {
        const post = await findPostById(id);
        const userLike = post.likes?.find(like => like?.user && like?.user?._id.toString() === userId.toString()) || null;
        const postWithCurrUserLike = {
            ...post.toObject?.() || post,
            currentUserLike: userLike ? userLike : null
        }

        return { post: postWithCurrUserLike };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllPostsService = async (userId, offset, limit) => {
    try {
        const posts = await findAllPosts(offset, limit)

        const totalDocuments = await countAllPosts();
        const totalPages = Math.ceil(totalDocuments / limit);

        const postWithCurrUserLike = posts.map(post => {
            const userLike = post.likes.find(like => like?.user && like?.user?._id.toString() === userId.toString());

            return {
                ...post.toObject(),
                currentUserLike: userLike ? userLike : null
            }
        })

        return { posts: postWithCurrUserLike, totalDocuments, totalPages };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getPostsMadeByUserService = async (userId, offset, limit) => {
    try {
        const posts = await findPostMadeByUser(userId, offset, limit)

        const totalDocuments = await countAllPosts(userId);
        const totalPages = Math.ceil(totalDocuments / limit);

        const postWithCurrUserLike = posts.map(post => {
            const userLike = post.likes.find(like => like?.user && like?.user?._id.toString() === userId.toString());

            return {
                ...post.toObject(),
                currentUserLike: userLike ? userLike : null
            }
        })

        return { posts: postWithCurrUserLike, totalDocuments, totalPages };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const deletePostByIdService = async (id, user) => {
    try {

        const postDetails = await findPostById(id);
        if (!postDetails) {   // if post not found
            throw {
                status: 404,
                success: false,
                message: "Post not found"
            }
        }

        if (postDetails.user._id != user) {   // if postDetails.user or owner is not the logedin user .(checking ids)
            throw {
                status: 401,
                success: false,
                message: "Unauthorized to delete the post"
            }
        }

        const response = await deletePostById(id);
        const totalDocuments = await countAllPosts();

        console.log("Post deleted")
        return { response, totalDocuments };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updatePostByIdService = async (id, postData) => {
    try {
        const response = await updatePostById(id, postData);

        console.log("Post updated.")
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}