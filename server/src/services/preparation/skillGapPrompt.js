const skillGapSchema = {
    type: "object",
    properties: {
        recommendations: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string",
                    },
                    priority: {
                        type: "string",
                        enum: ["high", "medium", "low"],
                    },
                    gapType: {
                        type: "string",
                        enum: ["missing", "partial"],
                    },
                    reason: {
                        type: "string",
                    },
                    recommendation: {
                        type: "string",
                    },
                },
                required: [
                    "skill",
                    "priority",
                    "gapType",
                    "reason",
                    "recommendation",
                ],
            },
        },
    },
    required: ["recommendations"],
};

const skillGapPrompt = ({
    resumeSkills,
    requiredSkills,
    preferredSkills,
    matchedSkills,
    partialSkills,
    missingSkills,
}) => `
Generate personalized skill-gap recommendations for a job application.

Use ONLY the structured information provided below.
Do not invent skills, experience, projects, qualifications, or candidate background.
Do not assume the candidate knows a skill unless it appears in the resume skills.

Resume Skills:
${JSON.stringify(resumeSkills)}

Required Job Skills:
${JSON.stringify(requiredSkills)}

Preferred Job Skills:
${JSON.stringify(preferredSkills)}

Matched Skills:
${JSON.stringify(matchedSkills)}

Partial Skills:
${JSON.stringify(partialSkills)}

Missing Required Skills:
${JSON.stringify(missingSkills)}

Rules:
- Focus primarily on missing and partial skills.
- Recommend what the candidate should improve or learn.
- Give higher priority to missing required skills.
- Use "missing" only for skills in the missing skills list.
- Use "partial" only for skills in the partial skills list.
- Keep reasons and recommendations concise.
- Do not include skills that are already fully matched unless necessary for context.
- Return only the requested JSON structure.
`;

export { skillGapPrompt, skillGapSchema };