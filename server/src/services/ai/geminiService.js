import ai from "../../config/gemini.js";

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error) => {
    const status = error?.status || error?.code;
    const message = error?.message || "";
    const causeCode = error?.cause?.code;

    return (
        status === 500 ||
        status === 503 ||
        message.includes("UNAVAILABLE") ||
        message.includes("ECONNRESET") ||
        causeCode === "ECONNRESET"
    );
};

const generateGeminiContent = async ({
    contents,
    config,
    model = "gemini-3.6-flash",
}) => {
    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent({
                model,
                contents,
                config,
            });
        } catch (error) {
            console.error(
                `Gemini request failed (attempt ${attempt + 1}/${maxRetries + 1}):`,
                {
                    status: error?.status,
                    code: error?.code,
                    message: error?.message,
                    causeCode: error?.cause?.code,
                }
            );

            const shouldRetry =
                isRetryableError(error) &&
                attempt < maxRetries;

            if (!shouldRetry) {
                throw new Error(
                    "AI service is temporarily unavailable. Please try again in a moment."
                );
            }

            const delay = 2000 * 2 ** attempt;

            await sleep(delay);
        }
    }
};

export default generateGeminiContent;