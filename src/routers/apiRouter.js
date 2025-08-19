import express from "express";
import v1Router from "./v1/v1Router.js"

const router = express.Router();


router.use("/v1", v1Router)     // If any URL starts with /api/v1, then forward to v1Router to handle the request

export default router;