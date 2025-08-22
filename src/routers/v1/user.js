// Here all the user related routes present
// We look at the remaining part of url after /users

import express from "express";
import { getUserProfile, getAllUsers, signup } from "../../controllers/userController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSighupSchema } from "../../validators/zodSignupSchema.js";

const router = express.Router();

router.get("/profile", getUserProfile)

router.get("/", getAllUsers)

router.post('/signup', validate(zodSighupSchema), signup)


export default router;