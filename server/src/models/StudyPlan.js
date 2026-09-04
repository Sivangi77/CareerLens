import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },

        overview: {
            type: String,
            default: "",
        },

        steps: {
            type: [
                {
                    order: {
                        type: Number,
                        required: true,
                    },
                    skill: {
                        type: String,
                        required: true,
                    },
                    focus: {
                        type: String,
                        default: "",
                    },
                    tasks: {
                        type: [String],
                        default: [],
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);

export default StudyPlan;