import mongoose from "mongoose";

const matchAnalysisSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },

        score: {
            type: Number,
            required: true,
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        partialSkills: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        breakdown: {
            requiredSkills: {
                type: Number,
                default: 0,
            },

            preferredSkills: {
                type: Number,
                default: 0,
            },
        },

        evidence: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const MatchAnalysis = mongoose.model(
    "MatchAnalysis",
    matchAnalysisSchema
);

export default MatchAnalysis;