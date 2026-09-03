import {
    analyzeMatch,
    getMatchAnalysis,
} from "../services/matching/matchingService.js";

const analyzeApplicationMatch = async (req, res, next) => {
    try {
        const matchAnalysis = await analyzeMatch(
            req.params.id,
            req.userId
        );

        res.status(200).json(matchAnalysis);
    } catch (error) {
        next(error);
    }
};

const getApplicationMatch = async (req, res, next) => {
    try {
        const matchAnalysis = await getMatchAnalysis(
            req.params.id,
            req.userId
        );

        res.status(200).json(matchAnalysis);
    } catch (error) {
        next(error);
    }
};

export {
    analyzeApplicationMatch,
    getApplicationMatch,
};