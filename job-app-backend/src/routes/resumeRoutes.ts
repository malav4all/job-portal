import express from "express";
import multer from "multer";
import { parseResume } from "../controllers/resumeParserController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/parse", upload.single("resume"), parseResume);

export default router;
