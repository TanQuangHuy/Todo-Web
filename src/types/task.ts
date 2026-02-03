export type Priority = "Extreme" | "Moderate" | "Low";
export type TaskStatus = "Not Started" | "In Progress" | "Completed";

export interface Task {
  taskId: number;
  title: string;
  objective: string;
  description: string;
  notes: string | null;
  deadline: string | null;
  completedAt: string | null;
  orderIndex: number;

  userId: number;
  categoryId: number;
  statusId: number;
  priorityId: number;

  createdAt: string;
  updatedAt: string;
}

