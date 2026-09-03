const jobAnalysisSchema = {
    type: "object",
    properties: {
        requiredSkills: {
            type: "array",
            items: { type: "string" },
        },

        preferredSkills: {
            type: "array",
            items: { type: "string" },
        },

        experience: {
            type: "string",
        },

        education: {
            type: "string",
        },

        responsibilities: {
            type: "array",
            items: { type: "string" },
        },

        keywords: {
            type: "array",
            items: { type: "string" },
        },

        roleCategory: {
            type: "string",
        },

        confidence: {
            type: "number",
        },
    },

    required: [
        "requiredSkills",
        "preferredSkills",
        "experience",
        "education",
        "responsibilities",
        "keywords",
        "roleCategory",
        "confidence",
    ],
};

const jobAnalysisPrompt = (jobDescription) => `
Extract structured information from the following job description.

Rules:
- Only use information explicitly present in the job description.
- Do not invent or assume information.
- If information is missing, return an empty string or empty array.
- Keep extracted information concise.
- Separate required skills from preferred/nice-to-have skills.
- Return only the requested JSON structure.

Job Description:
${jobDescription}
`;

export { jobAnalysisPrompt, jobAnalysisSchema };