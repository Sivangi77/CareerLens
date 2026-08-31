import mongoose from "mongoose";

const applicationEventSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
        },

        oldStatus: {
            type: String,
            required: true,
        },

        newStatus: {
            type: String,
            required: true,
        },

        note: {
            type: String,
            trim: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },
    }
);

const ApplicationEvent = mongoose.model(
    "ApplicationEvent",
    applicationEventSchema
);

export default ApplicationEvent;