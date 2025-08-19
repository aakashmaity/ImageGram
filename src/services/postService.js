import { countAllPosts, createPost, deletePostById, findAllPosts, updatePostById } from "../repositories/postRepo.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user;
    
    const newPost = await createPost(caption, image);
    return newPost;
}
export const getAllPostsService = async(offset, limit) => {
    const posts = await findAllPosts(offset, limit)

    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { posts, totalDocuments, totalPages };
}
export const deletePostByIdService = async(id) => {
    const response = await deletePostById(id);
    return response;
}
export const updatePostByIdService = async(id, updateObject) => {
    const response = await updatePostById(id, updateObject);
    return response;
}