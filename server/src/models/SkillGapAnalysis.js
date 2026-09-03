import mongoose from "mongoose";

const skillGapAnalysisSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },

        recommendations: {
            type: [
                {
                    skill: {
                        type: String,
                        required: true,
                    },

                    priority: {
                        type: String,
                        enum: ["high", "medium", "low"],
                        required: true,
                    },

                    gapType: {
                        type: String,
                        enum: ["missing", "partial"],
                        required: true,
                    },

                    reason: {
                        type: String,
                        default: "",
                    },

                    recommendation: {
                        type: String,
                        default: "",
                    },
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const SkillGapAnalysis = mongoose.model(
    "SkillGapAnalysis",
    skillGapAnalysisSchema
);

export default SkillGapAnalysis;