import express from "express"
import { createComment, getCommentById, getCommentsByCommentableId } from "../../controllers/commentController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/comment", isAuthenticated, createComment);

router.get("/comment/:id", isAuthenticated, getCommentById);

router.get("/:onModel/:id", isAuthenticated, getCommentsByCommentableId);





export default router;