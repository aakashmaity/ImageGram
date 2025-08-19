import { createPost, findAllPosts } from "../repositories/postRepo.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user;

    const newPost = await createPost(caption, image);
    return newPost;
}

export const findAllPostsService = async() => {
    const posts = await findAllPosts()
    return posts;
}