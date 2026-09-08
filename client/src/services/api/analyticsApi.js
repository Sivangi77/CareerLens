import apiClient from "./client.js";

export const getAnalyticsOverview = async () => {
    const response = await apiClient.get("/analytics/overview");

    return response.data;
};