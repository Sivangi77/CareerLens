import express from "express";
import { analyzeJD } from "../controllers/analysisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/applications/:id/analyze-jd",
    authMiddleware,
    analyzeJD
);

export default router;