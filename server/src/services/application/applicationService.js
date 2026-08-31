import Application from "../../models/Application.js";

export const createApplication = async (applicationData) => {
    return await Application.create(applicationData);
};

export const getApplications = async (userId) => {
    return await Application.find({ userId }).sort({ createdAt: -1 });
};

export const getApplicationById = async (applicationId, userId) => {
    return await Application.findOne({
        _id: applicationId,
        userId,
    });
};

export const updateApplication = async (
    applicationId,
    userId,
    updateData
) => {
    return await Application.findOneAndUpdate(
        {
            _id: applicationId,
            userId,
        },
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteApplication = async (applicationId, userId) => {
    return await Application.findOneAndDelete({
        _id: applicationId,
        userId,
    });
};