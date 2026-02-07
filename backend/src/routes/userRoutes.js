import express from "express";
import { updateCV } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/cv", updateCV);

export default router;
