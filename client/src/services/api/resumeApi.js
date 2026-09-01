import apiClient from "./client";

export const uploadResume = async (file) => {
    const formData = new FormData();

    formData.append("resume", file);

    const response = await apiClient.post("/resume", formData);

    return response.data;
};

export const getResume = async () => {
    const response = await apiClient.get("/resume");

    return response.data;
};