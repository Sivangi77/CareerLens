import Application from "../../models/Application.js";
import ApplicationEvent from "../../models/ApplicationEvent.js";

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

export const updateApplication = async (applicationId, userId, updateData) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  });

  if (!application) {
    return null;
  }

  const oldStatus = application.status;

  Object.assign(application, updateData);

  await application.save();

  if (updateData.status && updateData.status !== oldStatus) {
    await ApplicationEvent.create({
      applicationId: application._id,
      oldStatus,
      newStatus: application.status,
      note: updateData.notes || "",
    });
  }

  return application;
};

export const deleteApplication = async (applicationId, userId) => {
  return await Application.findOneAndDelete({
    _id: applicationId,
    userId,
  });
};

export const getApplicationEvents = async (applicationId, userId) => {
    const application = await Application.findOne({
        _id: applicationId,
        userId,
    });

    if (!application) {
        return null;
    }

    return await ApplicationEvent.find({
        applicationId,
    }).sort({ timestamp: -1 });
};