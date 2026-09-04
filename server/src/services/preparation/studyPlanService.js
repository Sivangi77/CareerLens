import Application from "../../models/Application.js";
import Resume from "../../models/Resume.js";
import JobAnalysis from "../../models/JobAnalysis.js";
import MatchAnalysis from "../../models/MatchAnalysis.js";
import SkillGapAnalysis from "../../models/SkillGapAnalysis.js";
import StudyPlan from "../../models/StudyPlan.js";

import generateGeminiContent from "../ai/geminiService.js";
import { studyPlanPrompt, studyPlanSchema } from "./studyPlanPrompt.js";

const generateStudyPlan = async (applicationId, userId) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  const resume = await Resume.findOne({ userId });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const jobAnalysis = await JobAnalysis.findOne({
    applicationId,
  });

  if (!jobAnalysis) {
    throw new Error(
      "Job analysis not found. Analyze the job description first.",
    );
  }

  const matchAnalysis = await MatchAnalysis.findOne({
    applicationId,
  });

  if (!matchAnalysis) {
    throw new Error(
      "Match analysis not found. Analyze the application match first.",
    );
  }

  const skillGapAnalysis = await SkillGapAnalysis.findOne({
    applicationId,
  });

  if (!skillGapAnalysis) {
    throw new Error(
      "Skill-gap analysis not found. Generate skill-gap recommendations first.",
    );
  }

  const response = await generateGeminiContent({
    model: "gemini-3.6-flash",

    contents: studyPlanPrompt({
      resumeSkills: resume.parsedProfile?.skills || [],
      requiredSkills: jobAnalysis.requiredSkills || [],
      preferredSkills: jobAnalysis.preferredSkills || [],
      matchedSkills: matchAnalysis.matchedSkills || [],
      partialSkills: matchAnalysis.partialSkills || [],
      missingSkills: matchAnalysis.missingSkills || [],
      skillGapRecommendations: skillGapAnalysis.recommendations || [],
    }),

    config: {
      responseMimeType: "application/json",
      responseSchema: studyPlanSchema,
    },
  });

  const generatedPlan = JSON.parse(response.text);

  const plan = {
    overview: generatedPlan.overview || "",
    steps: (generatedPlan.steps || []).map((step) => ({
      order: step.order,
      skill: step.skill,
      focus: step.focus || "",
      tasks: (step.tasks || []).map((task) => ({
        text: task,
        completed: false,
      })),
    })),
  };

  const studyPlan = await StudyPlan.findOneAndUpdate({ applicationId }, plan, {
    returnDocument: "after",
    upsert: true,
    runValidators: true,
  });

  return studyPlan;
};

const getStudyPlan = async (applicationId, userId) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  return await StudyPlan.findOne({ applicationId });
};

const updateStudyTask = async (
  applicationId,
  userId,
  stepOrder,
  taskIndex,
  completed,
) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  const studyPlan = await StudyPlan.findOne({
    applicationId,
  });

  if (!studyPlan) {
    throw new Error("Study plan not found.");
  }

  const step = studyPlan.steps.find((item) => item.order === Number(stepOrder));

  if (!step) {
    throw new Error("Study step not found.");
  }

  const task = step.tasks[Number(taskIndex)];

  if (!task) {
    throw new Error("Study task not found.");
  }

  task.completed = Boolean(completed);

  await studyPlan.save();

  return studyPlan;
};

export { generateStudyPlan, getStudyPlan, updateStudyTask };
