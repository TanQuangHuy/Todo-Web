import axiosClient from "../api/axiosClient";
import type { Task } from "../types/task";

export type TaskPayload = {
  title: string;
  objective: string;
  description: string;
  notes?: string | null;
  deadline?: string | null;
  completedAt?: string | null;

  userId: number;
  categoryId: number;
  statusId: number;
  priorityId: number;
  orderIndex: number;
};

export const taskService = {
  async getTasksByUser(userId: number): Promise<Task[]> {
    const res = await axiosClient.get(`/api/tasks/user/${userId}`);
    return res.data;
  },

  async getById(id: number): Promise<Task> {
    const res = await axiosClient.get(`/api/tasks/${id}`);
    return res.data;
  },

  async createTask(payload: TaskPayload) {
    return axiosClient.post(`/api/tasks`, payload).then(res => res.data);
  },

  async updateTask(id: number, payload: TaskPayload) {
    return axiosClient.put(`/api/tasks/${id}`, payload);
  },

  async completeTask(id: number) {
    return axiosClient.put(`/api/tasks/${id}/complete`);
  },

  async deleteTask(id: number) {
    return axiosClient.delete(`/api/tasks/${id}`);
  },
};
