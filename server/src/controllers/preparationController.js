import {
    generateSkillGapRecommendations,
    getSkillGapRecommendations,
} from "../services/preparation/skillGapService.js";

const generateSkillGaps = async (req, res, next) => {
    try {
        const analysis =
            await generateSkillGapRecommendations(
                req.params.id,
                req.userId
            );

        res.status(200).json(analysis);
    } catch (error) {
        next(error);
    }
};

const getSkillGaps = async (req, res, next) => {
    try {
        const analysis =
            await getSkillGapRecommendations(
                req.params.id,
                req.userId
            );

        res.status(200).json(analysis);
    } catch (error) {
        next(error);
    }
};

export {
    generateSkillGaps,
    getSkillGaps,
};