export type Priority = "Extreme" | "Moderate" | "Low";
export type TaskStatus = "Not Started" | "In Progress" | "Completed";

export type Task = {
  id: string;
  title: string;

  /** yyyy-MM-dd */
  dateISO: string;

  priority: Priority;
  status: TaskStatus;

  description: string;
  imageUrl?: string;

  /** yyyy-MM-dd */
  createdAtISO: string;

  assignees?: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];

  notes?: string[];
  deadline: string;
};
