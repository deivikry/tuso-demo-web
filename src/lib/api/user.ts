import { api } from "./client";

export const fetchUserProfile = async () => {
    const response = await api.get("/api/user/profile");
    return response.data;
};
