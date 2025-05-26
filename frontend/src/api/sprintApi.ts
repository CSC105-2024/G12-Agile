import axiosInstance from "../utils/axiosInstance";

export const sprintApi = {
  create: (data) => axiosInstance.post("/sprints", data, { withCredentials: true }),
  getByProjectId: (projectId) => axiosInstance.get(`/sprints/projects/${projectId}`, { withCredentials: true }),
  update: (id, data) => axiosInstance.patch(`/sprints/${id}`, data, { withCredentials: true }),
  delete: (id) => axiosInstance.delete(`/sprints/${id}`, { withCredentials: true }),
};
