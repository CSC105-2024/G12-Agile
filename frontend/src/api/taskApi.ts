import axiosInstance from "../utils/axiosInstance";

const taskApi = {
  async getByProjectId(projectId: number) {
    return axiosInstance.get(`/tasks/projects/${projectId}`);
  },

  async getById(id: number) {
    return axiosInstance.get(`/tasks/${id}`);
  },

  async create(projectId: number, sprintIndex: number, data: {
    name: string;
    description?: string;
    point: number;
  }) {
    return axiosInstance.post(`/tasks`, {
      ...data,
      projectId,
      sprintIndex
    });
  },

  async update(id: number, data: any) {
    return axiosInstance.patch(`/tasks/${id}`, data);
  },

  async delete(id: number) {
    return axiosInstance.delete(`/tasks/${id}`);
  },

  async claim(id: number, email: string) {
    return axiosInstance.post(`/tasks/${id}/claim`, { email });
  }  
};

export { taskApi };
