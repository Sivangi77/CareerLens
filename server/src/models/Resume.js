import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        fileName: {
            type: String,
            required: true,
            trim: true,
        },

        fileUrl: {
            type: String,
            required: true,
            trim: true,
        },

        parsedProfile: {
            summary: {
                type: String,
                default: "",
            },

            skills: {
                type: [String],
                default: [],
            },

            experience: {
                type: [mongoose.Schema.Types.Mixed],
                default: [],
            },

            education: {
                type: [mongoose.Schema.Types.Mixed],
                default: [],
            },

            projects: {
                type: [mongoose.Schema.Types.Mixed],
                default: [],
            },

            certifications: {
                type: [String],
                default: [],
            },
        },
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;