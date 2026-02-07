import express from "express";
import {
  login,
  register,
  getMe,
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/job/get-all", getAllJobs);
router.post("/job/new", addJob);
router.put("/job/:job_id", updateJob);
router.delete("/job/:job_id", deleteJob);

router.get("/me", authMiddleware, getMe);


export default router;
