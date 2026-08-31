import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        jobUrl: {
            type: String,
            trim: true,
        },

        jobDescription: {
            type: String,
            trim: true,
        },

        deadline: {
            type: Date,
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Assessment",
                "Interview",
                "Offer",
                "Rejected",
                "Withdrawn",
            ],
            default: "Applied",
        },

        notes: {
            type: String,
            trim: true,
        },

        matchScore: {
            type: Number,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;