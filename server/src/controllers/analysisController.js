import { analyzeJobDescription, getJobAnalysis } from "../services/jobAnalysis/jobAnalysisService.js";

const analyzeJD = async (req, res, next) => {
    try {
        const jobAnalysis = await analyzeJobDescription(
            req.params.id,
            req.userId
        );

        res.status(200).json(jobAnalysis);
    } catch (error) {
        next(error);
    }
};

const getAnalysis = async (req, res, next) => {
    try {
        const jobAnalysis = await getJobAnalysis(
            req.params.id,
            req.userId
        );

        res.status(200).json(jobAnalysis);
    } catch (error) {
        next(error);
    }
};

export { analyzeJD, getAnalysis };