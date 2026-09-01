import Resume from "../../models/Resume.js";
import cloudinary from "../../config/cloudinary.js";

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