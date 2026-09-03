import apiClient from "./client.js";

export const createApplication = async (applicationData) => {
    const response = await apiClient.post(
        "/applications",
        applicationData
    );

    return response.data;
};

export const getApplications = async () => {
    const response = await apiClient.get("/applications");

    return response.data;
};

export const getApplicationEvents = async (applicationId) => {
    const response = await apiClient.get(
        `/applications/${applicationId}/events`
    );

    return response.data;
};

export const getApplicationById = async (applicationId) => {
    const response = await apiClient.get(
        `/applications/${applicationId}`
    );

    return response.data;
};

export const updateApplication = async (
    applicationId,
    applicationData
) => {
    const response = await apiClient.patch(
        `/applications/${applicationId}`,
        applicationData
    );

    return response.data;
};

export const deleteApplication = async (applicationId) => {
    const response = await apiClient.delete(
        `/applications/${applicationId}`
    );

    return response.data;
};

export const analyzeJobDescription = async (applicationId) => {
    const response = await apiClient.post(
        `/applications/${applicationId}/analyze-jd`
    );

    return response.data;
};

export const getJobAnalysis = async (applicationId) => {
    const response = await apiClient.get(
        `/applications/${applicationId}/job-analysis`
    );

    return response.data;
};

export const analyzeApplicationMatch = async (applicationId) => {
    const response = await apiClient.post(
        `/applications/${applicationId}/analyze-match`
    );

    return response.data;
};

export const getMatchAnalysis = async (applicationId) => {
    const response = await apiClient.get(
        `/applications/${applicationId}/match-analysis`
    );

    return response.data;
};

export const getSkillGapRecommendations = async (applicationId) => {
    const response = await apiClient.get(
        `/applications/${applicationId}/skill-gaps`
    );

    return response.data;
};

export const generateSkillGapRecommendations = async (applicationId) => {
    const response = await apiClient.post(
        `/applications/${applicationId}/skill-gaps`
    );

    return response.data;
};