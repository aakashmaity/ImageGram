import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "LIKE_POST",
            "LIKE_COMMENT",
            "COMMENT_POST",
            "FOLLOW_USER"
        ]
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entityModel: {
        type: String,
        enum: ["Post", "Comment", null],
        default: null
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'entityModel',
        required: function () { return this.type !== 'FOLLOW_USER'; }
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

