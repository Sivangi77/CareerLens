const interviewQuestionSchema = {
    type: "object",
    properties: {
        questions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    category: {
                        type: "string",
                        enum: [
                            "technical",
                            "behavioral",
                            "role-specific",
                        ],
                    },
                    reason: { type: "string" },
                },
                required: ["question", "category", "reason"],
            },
        },
    },
    required: ["questions"],
};

const interviewQuestionPrompt = ({
    resumeProfile,
    requiredSkills,
    preferredSkills,
    responsibilities,
    roleCategory,
    matchedSkills,
    partialSkills,
    missingSkills,
    skillGapRecommendations,
}) => `
Generate interview questions for this job application.

Use ONLY the structured information provided below.

Do not invent:
- candidate experience
- candidate projects
- candidate skills
- qualifications
- job requirements
- responsibilities

Candidate Resume Profile:
${JSON.stringify(resumeProfile)}

Required Job Skills:
${JSON.stringify(requiredSkills)}

Preferred Job Skills:
${JSON.stringify(preferredSkills)}

Job Responsibilities:
${JSON.stringify(responsibilities)}

Role Category:
${JSON.stringify(roleCategory)}

Matched Skills:
${JSON.stringify(matchedSkills)}

Partial Skills:
${JSON.stringify(partialSkills)}

Missing Skills:
${JSON.stringify(missingSkills)}

Skill Gap Recommendations:
${JSON.stringify(skillGapRecommendations)}

Rules:
- Generate practical interview questions relevant to this specific job.
- Use technical questions for relevant technical skills.
- Use behavioral questions only when they can be grounded in the supplied candidate or role information.
- Use role-specific questions based on the supplied responsibilities and role category.
- Focus especially on required skills and identified skill gaps.
- Do not claim that the candidate has experience with a skill unless it appears in the resume profile.
- Questions should help the candidate prepare for the actual role.
- Keep questions concise and interview-ready.
- Keep reasons concise and explain why each question is relevant.
- Return only the requested JSON structure.
`;

export {
    interviewQuestionPrompt,
    interviewQuestionSchema,
};