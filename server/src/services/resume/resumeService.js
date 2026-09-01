import Resume from "../../models/Resume.js";
import cloudinary from "../../config/cloudinary.js";
import extractPdfText from "../../utils/pdfParser.js";
import https from "https";

const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const chunks = [];

            response.on("data", (chunk) => {
                chunks.push(chunk);
            });

            response.on("end", () => {
                resolve(Buffer.concat(chunks));
            });

            response.on("error", reject);
        }).on("error", reject);
    });
};

export const createResume = async (userId, file) => {
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "careerlens/resumes",
                resource_type: "raw",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(file.buffer);
    });

    return await Resume.create({
        userId,
        fileName: file.originalname,
        fileUrl: result.secure_url,
    });
};

export const getResume = async (userId) => {
    return await Resume.findOne({ userId }).sort({ createdAt: -1 });
};

export const extractResumeText = async (userId) => {
    const resume = await Resume.findOne({ userId }).sort({
        createdAt: -1,
    });

    if (!resume) {
        return null;
    }

    const pdfBuffer = await downloadFile(resume.fileUrl);

    const text = await extractPdfText(pdfBuffer);

    return text;
};