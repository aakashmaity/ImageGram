import express from "express";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { getMyNotifications, markAsRead } from "../../controllers/notificationController.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyNotifications);
router.patch("/:id/read", isAuthenticated, markAsRead);

export default router;

