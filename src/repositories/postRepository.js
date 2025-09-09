import { populate } from "dotenv";
import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try {
        const newPost = Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        throw error;
    }
}
export const countAllPosts = async () => {
    try {
        const count = await Post.countDocuments();
        return count;
    } catch (error) {
        throw error;
    }
}
export const findAllPosts = async (offset, limit) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).skip(offset).limit(limit).populate('user', 'username email _id')

        return posts;
    } catch (error) {
        throw error;
    }
}
export const findPostById = async (postId) => {
    try {
        const post = await Post.findById(postId)
        return post;
    } catch (error) {
        throw error;
    }
}
export const deletePostById = async (id) => {
    try {
        const response = await Post.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw error;
    }
}
export const updatePostById = async (id, postData) => {
    try {
        const response = await Post.findByIdAndUpdate(id, postData, { new: true });   // option: { new: true} helps to return new updated post object instead of old one
        return response;
    } catch (error) {
        throw error;
    }
}
