import Resume from "../../models/Resume.js";
import cloudinary from "../../config/cloudinary.js";
import extractPdfText from "../../utils/pdfParser.js";
import parseResumeWithGemini from "./geminiResumeParser.js";
import https from "https";

const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const chunks = [];

        response.on("data", (chunk) => {
          chunks.push(chunk);
        });

        response.on("end", () => {
          resolve(Buffer.concat(chunks));
        });

        response.on("error", reject);
      })
      .on("error", reject);
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
      },
    );

    uploadStream.end(file.buffer);
  });

  const resume = await Resume.findOneAndUpdate(
    { userId },
    {
      userId,
      fileName: file.originalname,
      fileUrl: result.secure_url,
      parsedProfile: {
        summary: "",
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
      },
    },
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    },
  );

  const pdfBuffer = await downloadFile(resume.fileUrl);

  const resumeText = await extractPdfText(pdfBuffer);

  const parsedProfile = await parseResumeWithGemini(resumeText);

  resume.parsedProfile = parsedProfile;

  await resume.save();

  return resume;
};

export const getResume = async (userId) => {
  return await Resume.findOne({ userId }).sort({ createdAt: -1 });
};

