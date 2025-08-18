import { createPost } from "../repositories/postRepo.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user;

    const newPost = await createPost(caption, image);
    return newPost;
}