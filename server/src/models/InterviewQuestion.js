import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },

        questions: {
            type: [
                {
                    question: {
                        type: String,
                        required: true,
                    },
                    category: {
                        type: String,
                        enum: [
                            "technical",
                            "behavioral",
                            "role-specific",
                        ],
                        required: true,
                    },
                    reason: {
                        type: String,
                        default: "",
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const InterviewQuestion = mongoose.model(
    "InterviewQuestion",
    interviewQuestionSchema
);

export default InterviewQuestion;