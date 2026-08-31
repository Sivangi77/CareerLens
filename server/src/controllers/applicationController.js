import {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
} from "../services/application/applicationService.js";

export const createApplicationController = async (req, res, next) => {
    try {
        const application = await createApplication({
            ...req.body,
            userId: req.userId,
        });

        res.status(201).json(application);
    } catch (error) {
        next(error);
    }
};

export const getApplicationsController = async (req, res, next) => {
    try {
        const applications = await getApplications(req.userId);

        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

export const getApplicationByIdController = async (req, res, next) => {
    try {
        const application = await getApplicationById(
            req.params.id,
            req.userId
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.status(200).json(application);
    } catch (error) {
        next(error);
    }
};

export const updateApplicationController = async (req, res, next) => {
    try {
        const application = await updateApplication(
            req.params.id,
            req.userId,
            req.body
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.status(200).json(application);
    } catch (error) {
        next(error);
    }
};

export const deleteApplicationController = async (req, res, next) => {
    try {
        const application = await deleteApplication(
            req.params.id,
            req.userId
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.status(200).json({
            message: "Application deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};