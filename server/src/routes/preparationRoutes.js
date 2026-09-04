import express from "express";
import {
    generateSkillGaps,
    getSkillGaps,
    generateStudyPlanController,
    getStudyPlanController
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
router.post(
    "/applications/:id/study-plan",
    authMiddleware,
    generateStudyPlanController
);

router.get(
    "/applications/:id/study-plan",
    authMiddleware,
    getStudyPlanController
);

export default router;