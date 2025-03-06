import express from "express";
import multer from "multer";
import {
  applyForJob,
  getApplicationsForRecruiter,
  getApplicationsForCandidate,
  updateApplicationStatus,
} from "../controllers/applicationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("resume"), applyForJob);
router.get("/recruiter", authMiddleware, getApplicationsForRecruiter); // Recruiters see job applications
router.get("/candidate", authMiddleware, getApplicationsForCandidate); // Candidates see their own applications
router.put("/:id/status", authMiddleware, updateApplicationStatus); // Recruiters update applicati

export default router;
