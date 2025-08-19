import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try {
        const newPost = Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        console.log(error.message);
    }
}
export const countAllPosts = async () => {
    try {
        const count = await Post.countDocuments();
        return count;
    } catch (error) {
        console.log(error.message)
    }
}
export const findAllPosts = async (offset, limit) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
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
export const deletePostById = async (id) => {
    try {
        const response = await Post.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
export const updatePostById = async (id, updateObject) => {
    try {
        const response = await Post.findByIdAndUpdate(id, updateObject, { new: true });   // option: { new: true} helps to return new updated post object instead of old one
        return response;
    } catch (error) {
        console.log(error.message);
    }
}