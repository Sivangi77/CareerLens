import express from "express";
import {
    analyzeApplicationMatch,
    getApplicationMatch,
} from "../controllers/matchController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/applications/:id/analyze-match",
    authMiddleware,
    analyzeApplicationMatch
);

router.get(
    "/applications/:id/match-analysis",
    authMiddleware,
    getApplicationMatch
);

export default router;