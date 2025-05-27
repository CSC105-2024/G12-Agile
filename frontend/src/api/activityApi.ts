import axiosInstance from "../utils/axiosInstance";

export const activityApi = {
  getAll: () => axiosInstance.get("/activities/all"),
  getMine: () => axiosInstance.get("/activities"),
};
