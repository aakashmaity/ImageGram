import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    likeType:{
        type: String,
        default: 'love',
        enum:['love', 'celebrate', 'funny', 'angry']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    onModel:{
        type: String,
        required: true,
        refPath: ['Post', 'Comment'],
    },
    likableId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);
export default Like;