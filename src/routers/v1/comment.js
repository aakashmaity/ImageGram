import express from "express"
import { createComment, getCommentById } from "../../controllers/commentController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/comment", isAuthenticated, createComment);

router.get("/comment/:id", isAuthenticated, getCommentById);

export default router;