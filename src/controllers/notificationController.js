import { getNotificationsForUser, readNotification } from "../services/notificationService.js";

export async function getMyNotifications(req, res) {
    try {
        const { offset = 0, limit = 20 } = req.query;
        const userId = req.user._id;
        const { notifications, totalDocuments } = await getNotificationsForUser(userId, offset, limit);
        return res.status(200).json({ success: true, notifications, totalDocuments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function markAsRead(req, res) {
    try {
        const { id } = req.params;
        const updated = await readNotification(id);
        return res.status(200).json({ success: true, notification: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

