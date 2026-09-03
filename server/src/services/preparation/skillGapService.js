import Application from "../../models/Application.js";
import Resume from "../../models/Resume.js";
import JobAnalysis from "../../models/JobAnalysis.js";
import MatchAnalysis from "../../models/MatchAnalysis.js";
import SkillGapAnalysis from "../../models/SkillGapAnalysis.js";
import generateGeminiContent from "../ai/geminiService.js";
import {
    skillGapPrompt,
    skillGapSchema,
} from "./skillGapPrompt.js";

const generateSkillGapRecommendations = async (
    applicationId,
    userId
) => {
    const application = await Application.findOne({
        _id: applicationId,
        userId,
    });

    if (!application) {
        throw new Error("Application not found.");
    }

    const resume = await Resume.findOne({
        userId,
    });

    if (!resume) {
        throw new Error("Resume not found.");
    }

    const jobAnalysis = await JobAnalysis.findOne({
        applicationId,
    });

    if (!jobAnalysis) {
        throw new Error(
            "Job analysis not found. Analyze the job description first."
        );
    }

    const matchAnalysis = await MatchAnalysis.findOne({
        applicationId,
    });

    if (!matchAnalysis) {
        throw new Error(
            "Match analysis not found. Analyze the application match first."
        );
    }

    const response = await generateGeminiContent({
        model: "gemini-3.6-flash",
        contents: skillGapPrompt({
            resumeSkills:
                resume.parsedProfile?.skills || [],

            requiredSkills:
                jobAnalysis.requiredSkills || [],

            preferredSkills:
                jobAnalysis.preferredSkills || [],

            matchedSkills:
                matchAnalysis.matchedSkills || [],

            partialSkills:
                matchAnalysis.partialSkills || [],

            missingSkills:
                matchAnalysis.missingSkills || [],
        }),

        config: {
            responseMimeType: "application/json",
            responseSchema: skillGapSchema,
        },
    });

    const analysis = JSON.parse(response.text);

    const skillGapAnalysis =
        await SkillGapAnalysis.findOneAndUpdate(
            { applicationId },
            analysis,
            {
                returnDocument: "after",
                upsert: true,
                runValidators: true,
            }
        );

    return skillGapAnalysis;
};

const getSkillGapRecommendations = async (
    applicationId,
    userId
) => {
    const application = await Application.findOne({
        _id: applicationId,
        userId,
    });

    if (!application) {
        throw new Error("Application not found.");
    }

    return await SkillGapAnalysis.findOne({
        applicationId,
    });
};

export {
    generateSkillGapRecommendations,
    getSkillGapRecommendations,
};