import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createApplicationController,
    getApplicationsController,
    getApplicationByIdController,
    updateApplicationController,
    deleteApplicationController,
    getApplicationEventsController,
} from "../controllers/applicationController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createApplicationController);
router.get("/", getApplicationsController);
router.get("/:id", getApplicationByIdController);
router.patch("/:id", updateApplicationController);
router.delete("/:id", deleteApplicationController);
router.get("/:id/events", getApplicationEventsController);

export default router;