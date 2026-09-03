import express from "express";
import { analyzeJD, getAnalysis } from "../controllers/analysisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/applications/:id/analyze-jd",
    authMiddleware,
    analyzeJD
);

router.get(
    "/applications/:id/job-analysis",
    authMiddleware,
    getAnalysis
);

export default router;