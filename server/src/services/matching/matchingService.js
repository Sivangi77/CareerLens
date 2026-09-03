import Application from "../../models/Application.js";
import Resume from "../../models/Resume.js";
import JobAnalysis from "../../models/JobAnalysis.js";
import MatchAnalysis from "../../models/MatchAnalysis.js";
import { normalizeSkills } from "./skillNormalizer.js";

const calculateScore = (
    requiredSkills,
    matchedSkills,
    partialSkills,
    preferredSkills,
    preferredMatched
) => {
    const requiredScore =
        requiredSkills.length === 0
            ? 0
            : (
                  (
                      matchedSkills.length +
                      partialSkills.length * 0.5
                  ) /
                  requiredSkills.length
              ) * 100;

    const preferredScore =
        preferredSkills.length === 0
            ? 0
            : (
                  preferredMatched.length /
                  preferredSkills.length
              ) * 100;

    const score =
        requiredSkills.length === 0
            ? Math.round(preferredScore)
            : Math.round(
                  requiredScore * 0.8 +
                  preferredScore * 0.2
              );

    return {
        score,
        requiredScore: Math.round(requiredScore),
        preferredScore: Math.round(preferredScore),
    };
};

const isPartialSkillMatch = (resumeSkill, requiredSkill) => {
  if (resumeSkill === requiredSkill) {
    return false;
  }

  const resumeWords = resumeSkill.split(" ");
  const requiredWords = requiredSkill.split(" ");

  if (resumeWords.length === 1 && requiredWords.length === 1) {
    return false;
  }

  return (
    resumeSkill.includes(requiredSkill) || requiredSkill.includes(resumeSkill)
  );
};

const calculateSkillMatch = (resumeSkills, requiredSkills, preferredSkills) => {
  const resume = normalizeSkills(resumeSkills);
  const required = normalizeSkills(requiredSkills);
  const preferred = normalizeSkills(preferredSkills);

  const matchedSkills = [];
  const partialSkills = [];
  const missingSkills = [];

  required.forEach((skill) => {
    if (resume.includes(skill)) {
      matchedSkills.push(skill);
      return;
    }

    const partialMatch = resume.some((resumeSkill) =>
      isPartialSkillMatch(resumeSkill, skill),
    );

    if (partialMatch) {
      partialSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const preferredMatched = [];

  preferred.forEach((skill) => {
    if (resume.includes(skill)) {
      preferredMatched.push(skill);
    }
  });


  const scoreResult = calculateScore(
    required,
    matchedSkills,
    partialSkills,
    preferred,
    preferredMatched
);

  return {
    score: scoreResult.score,

    matchedSkills,

    partialSkills,

    missingSkills,

    breakdown: {
        requiredSkills: scoreResult.requiredScore,
        preferredSkills: scoreResult.preferredScore,
    },

    evidence: [
        `${matchedSkills.length} of ${required.length} required skills matched.`,
        `${partialSkills.length} required skills have partial matches.`,
        `${preferredMatched.length} of ${preferred.length} preferred skills matched.`,
    ],
};
};

const analyzeMatch = async (applicationId, userId) => {
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
      "Job analysis not found. Analyze the job description first.",
    );
  }

  const result = calculateSkillMatch(
    resume.parsedProfile?.skills || [],
    jobAnalysis.requiredSkills || [],
    jobAnalysis.preferredSkills || [],
  );

  const matchAnalysis = await MatchAnalysis.findOneAndUpdate(
    { applicationId },
    result,
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    },
  );

  application.matchScore = result.score;
  await application.save();

  return matchAnalysis;
};

const getMatchAnalysis = async (applicationId, userId) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  return await MatchAnalysis.findOne({
    applicationId,
  });
};

export { calculateSkillMatch, analyzeMatch, getMatchAnalysis };
