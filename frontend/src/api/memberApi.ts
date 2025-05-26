import axiosInstance from "../utils/axiosInstance";

export const memberApi = {
  add: (data) => axiosInstance.post("/members", data, { withCredentials: true }),
  remove: (data) => axiosInstance.delete("/members", { data, withCredentials: true }),
  getAll: (projectId) => axiosInstance.get(`/members/${projectId}`, { withCredentials: true }),
};

