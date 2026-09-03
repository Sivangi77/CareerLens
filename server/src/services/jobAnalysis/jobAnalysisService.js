import Application from "../../models/Application.js";
import JobAnalysis from "../../models/JobAnalysis.js";
import ai from "../../config/gemini.js";
import { jobAnalysisPrompt, jobAnalysisSchema } from "./jobPrompt.js";

const analyzeJobDescription = async (applicationId, userId) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  if (!application.jobDescription?.trim()) {
    throw new Error("Job description is required for analysis.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: jobAnalysisPrompt(application.jobDescription),
    config: {
      responseMimeType: "application/json",
      responseSchema: jobAnalysisSchema,
    },
  });

  const analysis = JSON.parse(response.text);

  const jobAnalysis = await JobAnalysis.findOneAndUpdate(
    { applicationId },
    analysis,
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    },
  );

  return jobAnalysis;
};

export { analyzeJobDescription };
