import mongoose from "mongoose";
import Post from "../schema/post";

export const createPost = async (caption, image, user) => {
    try {
        const newPost = Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        console.log(error.message);
    }
}
export const findAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (error) {
        console.log(error.message);
    }
}
export const findPostById = async (postId) => {
    try {
        const post = await Post.findById(postId)
        return post;
    } catch (error) {
        console.log(error.message);
    
    }
}
export const deletePostById = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndUpdate(postId);
        return deletedPost;
    } catch (error) {
        console.log(error.message);
    }
}