// Here all the user related routes present
// We look at the remaining part of url after /users

import express from "express";
import { getUserProfile, getAllUsers, signup, signin } from "../../controllers/userController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSighupSchema } from "../../validators/zodSignupSchema.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";

const router = express.Router();


/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Register a new user!
 *     responses:
 *       200:
 *         description: Registered successfully.
 */


router.get("/profile", getUserProfile);

router.get("/", getAllUsers);

router.post('/signup', validate(zodSighupSchema), signup);

router.post('/signin', validate(zodSigninSchema), signin);


export default router;