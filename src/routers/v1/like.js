import express from "express"
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { createLike, deleteLike, updateLike } from "../../controllers/likeController.js";

const router = express.Router();

router.post("/", isAuthenticated, createLike);

router.put("/:id", isAuthenticated, updateLike);

router.delete("/:id", isAuthenticated, deleteLike);




export default router;