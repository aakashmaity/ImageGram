import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    likeType:{
        type: String,
        default: 'like',
        enum:['like', 'love']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    onModel:{
        type: String,
        required: true,
        ref: ['Post', 'Comment'],
    },
    likableId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);
export default Like;