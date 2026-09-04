const studyPlanSchema = {
    type: "object",
    properties: {
        overview: {
            type: "string",
        },

        steps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    order: {
                        type: "number",
                    },
                    skill: {
                        type: "string",
                    },
                    focus: {
                        type: "string",
                    },
                    tasks: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
                required: ["order", "skill", "focus", "tasks"],
            },
        },
    },
    required: ["overview", "steps"],
};

const studyPlanPrompt = ({
    resumeSkills,
    requiredSkills,
    preferredSkills,
    matchedSkills,
    partialSkills,
    missingSkills,
    skillGapRecommendations,
}) => `
Create a practical study plan for this job application.

Use ONLY the structured information provided below.

Do not invent:
- candidate skills
- candidate experience
- projects
- qualifications
- job requirements

The study plan should help the candidate improve the identified skill gaps.

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

Existing Skill Gap Recommendations:
${JSON.stringify(skillGapRecommendations)}

Rules:
- Focus primarily on missing and partial skills.
- Prioritize missing required skills before partial skills.
- Every step's skill must come from the missingSkills or partialSkills lists.
- Do not create new skills that are not present in the supplied data.
- Make the plan practical and concise.
- Organize the steps in a sensible preparation order.
- Each step should contain a skill, focus area, and concrete study tasks.
- Do not include fully matched skills unless needed for context.
- Return only the requested JSON structure.
`;

export { studyPlanPrompt, studyPlanSchema };