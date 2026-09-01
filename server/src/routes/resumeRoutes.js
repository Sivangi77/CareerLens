import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadResume from "../middleware/uploadMiddleware.js";

import {
    uploadResumeController,
    getResumeController,
} from "../controllers/resumeController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", uploadResume.single("resume"), uploadResumeController);

router.get("/", getResumeController);

export default router;