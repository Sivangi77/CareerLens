import {
    createResume,
    getResume,
} from "../services/resume/resumeService.js";

export const uploadResumeController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF is required.",
            });
        }

        const resume = await createResume(req.userId, req.file);

        res.status(201).json(resume);
    } catch (error) {
        next(error);
    }
};

export const getResumeController = async (req, res, next) => {
    try {
        const resume = await getResume(req.userId);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found.",
            });
        }

        res.status(200).json(resume);
    } catch (error) {
        next(error);
    }
};
