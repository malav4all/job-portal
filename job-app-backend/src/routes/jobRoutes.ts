import express from "express";
import { createJob, getJobs, deleteJob } from "../controllers/jobController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.delete("/:id", authMiddleware, deleteJob);

export default router;
