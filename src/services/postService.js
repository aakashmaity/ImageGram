import { countAllPosts, createPost, deletePostById, findAllPosts, updatePostById } from "../repositories/postRepo.js";

export const createPostService = async (postobject) => {
    try {
        const caption = postobject.caption?.trim();
        const image = postobject?.image;
        const user = postobject?.user;

        const newPost = await createPost(caption, image, user);
        return newPost;
    } catch (error) {
        console.log(error.message);
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
        console.log(error.message);
        throw error;
    }
}
export const deletePostByIdService = async (id) => {
    try {
        const response = await deletePostById(id);
        return response;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
export const updatePostByIdService = async (id, updateObject) => {
    try {
        const response = await updatePostById(id, updateObject);
        return response;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}