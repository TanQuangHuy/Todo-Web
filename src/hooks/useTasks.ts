import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types/task";
import type {
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from "../types/taskCategory";
import { taskService } from "../services/taskService";
import { taskImageService } from "../services/taskImageService";
import { taskCategoryService } from "../services/taskCategoryService";

export interface TaskUI extends Task {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: TaskCategory;
  imageUrl?: string;
}

export function useTasks(userId: number) {
  const [tasks, setTasks] = useState<TaskUI[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);

    const baseTasks = await taskService.getTasksByUser(userId);

    const fullTasks = await Promise.all(
      baseTasks.map(async (t) => {
        const [status, priority, category, images] = await Promise.all([
          taskCategoryService.getStatusById(t.statusId),
          taskCategoryService.getPriorityById(t.priorityId),
          taskCategoryService.getCategoryById(t.categoryId),
          taskImageService.getByTaskId(t.taskId),
        ]);

        return {
          ...t,
          status,
          priority,
          category,
          imageUrl: images?.[0]?.imageUrl,
        };
      })
    );

    setTasks(fullTasks);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    reload: fetchTasks,
  };
}
