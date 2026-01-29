export interface TaskStatus {
  statusId: number;
  statusName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPriority {
  priorityId: number;
  priorityName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCategory {
  categoryId: number;
  categoryName: string;
}