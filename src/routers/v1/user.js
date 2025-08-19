// Here all the user related routes present
// We look at the remaining part of url after /users

import express from "express";
import { getUserProfile } from "../../controllers/userController.js";

const router = express.Router();

router.get("/profile", getUserProfile)


export default router;