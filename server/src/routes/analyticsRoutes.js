import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    getAnalyticsOverviewController,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/overview", getAnalyticsOverviewController);

export default router;