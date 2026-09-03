import express from "express";
import {
    generateSkillGaps,
    getSkillGaps,
} from "../controllers/preparationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/applications/:id/skill-gaps",
    authMiddleware,
    generateSkillGaps
);

router.get(
    "/applications/:id/skill-gaps",
    authMiddleware,
    getSkillGaps
);

export default router;