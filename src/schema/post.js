import mongoose from "mongoose";

const postScheme = new mongoose.Schema({
    caption:{
        type: String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postScheme);

export default Post;