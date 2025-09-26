import { createNotification, findNotificationsByReceiver, markNotificationAsRead } from "../repositories/notificationRepository.js";
import { sendNotification } from "../socket.js";

export const notifyAndPersist = async ({ type, sender, receiver, entityModel = null, entityId = null, message }) => {
    try {
        const payload = { type, sender, receiver, entityModel, entityId, message };
        const saved = await createNotification(payload);
        sendNotification(receiver, {
            _id: saved._id,
            type: saved.type,
            message: saved.message,
            sender: saved.sender,
            entityModel: saved.entityModel,
            entityId: saved.entityId,
            createdAt: saved.createdAt
        });
        return saved;
    } catch (error) {
        throw error;
    }
}

export const getNotificationsForUser = async (receiverId, offset, limit) => {
    try {
        const { notifications, totalDocuments } = await findNotificationsByReceiver(receiverId, { offset, limit });
        return { notifications, totalDocuments };
    } catch (error) {
        throw error;
    }
}

export const readNotification = async (id) => {
    try {
        return await markNotificationAsRead(id);
    } catch (error) {
        throw error;
    }
}

