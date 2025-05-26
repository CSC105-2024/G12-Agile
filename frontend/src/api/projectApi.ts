import axiosInstance from "../utils/axiosInstance";

export const projectApi = {
  getAll: () => axiosInstance.get("/projects", { withCredentials: true }),
  getById: (id) => axiosInstance.get(`/projects/${id}`, { withCredentials: true }),
  create: (data) => axiosInstance.post("/projects", data, { withCredentials: true }),
  update: (id, data) => axiosInstance.patch(`/projects/${id}`, data, { withCredentials: true }),
  delete: (id) => axiosInstance.delete(`/projects/${id}`, { withCredentials: true }),
};
