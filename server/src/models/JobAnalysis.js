import mongoose from "mongoose";

const jobAnalysisSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },

        requiredSkills: {
            type: [String],
            default: [],
        },

        preferredSkills: {
            type: [String],
            default: [],
        },

        experience: {
            type: String,
            default: "",
        },

        education: {
            type: String,
            default: "",
        },

        responsibilities: {
            type: [String],
            default: [],
        },

        keywords: {
            type: [String],
            default: [],
        },

        roleCategory: {
            type: String,
            default: "",
        },

        confidence: {
            type: Number,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const JobAnalysis = mongoose.model("JobAnalysis", jobAnalysisSchema);

export default JobAnalysis;