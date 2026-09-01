import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadResume from "../middleware/uploadMiddleware.js";

import {
    uploadResumeController,
    getResumeController,
    extractResumeTextController,
    parseResumeController,
} from "../controllers/resumeController.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", uploadResume.single("resume"), uploadResumeController);
router.get("/", getResumeController);
router.get("/text", extractResumeTextController);
router.get("/parse", parseResumeController);

export default router;