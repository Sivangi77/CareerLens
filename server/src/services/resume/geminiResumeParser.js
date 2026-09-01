import ai from "../../config/gemini.js";

const parseResumeWithGemini = async (resumeText) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
Extract structured information from the following resume.

Rules:
- Only use information explicitly present in the resume.
- Do not invent or assume information.
- If information is missing, return an empty string or empty array.
- Keep descriptions concise.
- Return only the requested JSON structure.

Resume:
${resumeText}
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    summary: {
                        type: "string",
                    },
                    skills: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    experience: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                company: { type: "string" },
                                role: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                                description: { type: "string" },
                            },
                        },
                    },
                    education: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                institution: { type: "string" },
                                degree: { type: "string" },
                                field: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                            },
                        },
                    },
                    projects: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                description: { type: "string" },
                                technologies: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    certifications: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
                required: [
                    "summary",
                    "skills",
                    "experience",
                    "education",
                    "projects",
                    "certifications",
                ],
            },
        },
    });

    return JSON.parse(response.text);
};

export default parseResumeWithGemini;