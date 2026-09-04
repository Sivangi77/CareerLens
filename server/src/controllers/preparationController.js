import {
    generateSkillGapRecommendations,
    getSkillGapRecommendations,
} from "../services/preparation/skillGapService.js";

import {
    generateStudyPlan,
    getStudyPlan,
} from "../services/preparation/studyPlanService.js";

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

const generateStudyPlanController = async (req, res, next) => {
    try {
        const studyPlan = await generateStudyPlan(
            req.params.id,
            req.userId
        );

        res.status(200).json(studyPlan);
    } catch (error) {
        next(error);
    }
};

const getStudyPlanController = async (req, res, next) => {
    try {
        const studyPlan = await getStudyPlan(
            req.params.id,
            req.userId
        );

        res.status(200).json(studyPlan);
    } catch (error) {
        next(error);
    }
};

export {
    generateSkillGaps,
    getSkillGaps,
    generateStudyPlanController,
    getStudyPlanController,
};