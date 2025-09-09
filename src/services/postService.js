import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById, findPostMadeByUser, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (postobject) => {
    try {
        const caption = postobject.caption?.trim();
        const image = postobject?.image;
        const user = postobject?.user;

        const newPost = await createPost(caption, image, user);
        return newPost;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllPostsService = async (offset, limit) => {
    try {
        const posts = await findAllPosts(offset, limit)

        const totalDocuments = await countAllPosts();
        const totalPages = Math.ceil(totalDocuments / limit);

        return { posts, totalDocuments, totalPages };
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

        return { posts, totalDocuments, totalPages };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const deletePostByIdService = async (id, user) => {
    try {

        const postDetails = await findPostById(id);
        if(!postDetails) {   // if post not found
            throw {
                status: 404,
                success: false,
                message: "Post not found"
            }
        } 

        if(postDetails.user != user) {   // if postDetails.user or owner is not the logedin user .(checking ids)
            throw {
                status: 401,
                success: false,
                message: "Unauthorized to delete the post"
            }
        } 

        const response = await deletePostById(id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updatePostByIdService = async (id, postData) => {
    try {
        const response = await updatePostById(id, postData);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}