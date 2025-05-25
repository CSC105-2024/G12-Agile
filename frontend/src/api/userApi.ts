import axiosInstance from "../utils/axiosInstance";
export const userApi = {
  login: (data) => axiosInstance.post("/users/login", data, { withCredentials: true }),
  register: (data) => axiosInstance.post("/users/register", data, { withCredentials: true }),
  logout: () => axiosInstance.post("/users/logout", {}, { withCredentials: true }),
  getCurrentUser: () => axiosInstance.get("/users/me", { withCredentials: true }),
  update: (id, data) => axiosInstance.patch(`/users/${id}`, data, { withCredentials: true }),
};
