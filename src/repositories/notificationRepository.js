import Notification from "../schema/notification.js";

export const createNotification = async (payload) => {
    try {
        const notification = await Notification.create(payload);
        return await notification.populate([
            { path: 'sender', select: 'username email _id' },
            { path: 'receiver', select: 'username email _id' },
        ]);
    } catch (error) {
        throw error;
    }
}

export const findNotificationsByReceiver = async (receiverId, { offset = 0, limit = 20 } = {}) => {
    try {
        const notifications = await Notification.find({ receiver: receiverId })
            .sort({ createdAt: -1 })
            .skip(Number(offset))
            .limit(Number(limit))
            .populate([
                { path: 'sender', select: 'username email _id' },
                { path: 'receiver', select: 'username email _id' },
            ]);
        const totalDocuments = await Notification.countDocuments({ receiver: receiverId });
        return { notifications, totalDocuments };
    } catch (error) {
        throw error;
    }
}

export const markNotificationAsRead = async (id) => {
    try {
        return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    } catch (error) {
        throw error;
    }
}

