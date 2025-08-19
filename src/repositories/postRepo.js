import Post from "../schema/post.js";

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
export const deletePostById = async (id) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        console.log("deletedPost :", deletedPost)
        return deletedPost;
    } catch (error) {
        console.log(error.message);
    }
}