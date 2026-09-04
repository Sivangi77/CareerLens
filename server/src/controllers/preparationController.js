import {
    generateSkillGapRecommendations,
    getSkillGapRecommendations,
} from "../services/preparation/skillGapService.js";

import {
    generateStudyPlan,
    getStudyPlan,
    updateStudyTask
} from "../services/preparation/studyPlanService.js";

import {
    generateInterviewQuestions,
    getInterviewQuestions,
} from "../services/preparation/interviewQuestionService.js";

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

const generateInterviewQuestionsController = async (req, res, next) => {
    try {
        const questions = await generateInterviewQuestions(
            req.params.id,
            req.userId
        );

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};

const getInterviewQuestionsController = async (req, res, next) => {
    try {
        const questions = await getInterviewQuestions(
            req.params.id,
            req.userId
        );

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};

const updateStudyTaskController = async (req, res, next) => {
    try {
        const { stepOrder, taskIndex, completed } = req.body;

        const studyPlan = await updateStudyTask(
            req.params.id,
            req.userId,
            stepOrder,
            taskIndex,
            completed
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
    generateInterviewQuestionsController,
    getInterviewQuestionsController,
    updateStudyTaskController,
};