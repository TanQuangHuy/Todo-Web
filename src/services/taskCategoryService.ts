
import axiosClient from "../api/axiosClient";
import type {
  TaskStatus,
  TaskPriority,
  TaskCategory
} from "../types/taskCategory";

export const taskCategoryService = {

  createStatus(data: { statusName: string }) {
    return axiosClient.post("/api/statuses", data);
  },

  createCategory(data: { categoryName: string }) {
    return axiosClient.post("/api/categories", data);
  },

  createPriority(data: { priorityName: string }) {
    return axiosClient.post("/api/priorities", data);
  },

  getTaskStatuses(): Promise<TaskStatus[]> {
    return axiosClient.get("/api/statuses").then(res => res.data);
  },

  getTaskPriorities(): Promise<TaskPriority[]> {
    return axiosClient.get("/api/priorities").then(res => res.data);
  },

  getCategories(): Promise<TaskCategory[]> {
    return axiosClient.get("/api/categories").then(res => res.data);
  },

  deleteStatus(id: number) {
    return axiosClient.delete(`/api/statuses/${id}`);
  },

  deletePriority(id: number) {
    return axiosClient.delete(`/api/priorities/${id}`);
  },

  deleteCategories(id: number) {
    return axiosClient.delete(`/api/categories/${id}`);
  },
  
  updateStatus: async (
    id: number,
    payload: { statusName: string }
  ) => {
    return axiosClient.put(`/api/statuses/${id}`, payload);
  },

  updatePriority: async (
    id: number,
    payload: { priorityName: string }
  ) => {
    return axiosClient.put(`/api/priorities/${id}`, payload);
  },

  updateCategory: async (
    id: number,
    payload: { categoryName: string }
  ) => {
    return axiosClient.put(`/api/categories/${id}`, payload);
  },

  getStatusById (id: number): Promise<TaskStatus> {
    return axiosClient.get(`/api/statuses/${id}`).then(res => res.data);
  },

  getPriorityById (id: number): Promise<TaskPriority> {
    return axiosClient.get(`/api/priorities/${id}`).then(res => res.data);
  },

  getCategoryById (id: number): Promise<TaskCategory> { 
    return axiosClient.get(`/api/categories/${id}`).then(res => res.data);
  }
};