// src/hooks/useTasks.ts
import { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const res = await taskService.getAll();
    setTasks(res);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const byId = useMemo(() => {
    const map = new Map<string, Task>();
    tasks.forEach((t) => map.set(t.id, t));
    return map;
  }, [tasks]);

  const updateStatus = async (id: string, status: TaskStatus) => {
    const updated = await taskService.updateStatus(id, status);
    if (!updated) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const remove = async (id: string) => {
    const ok = await taskService.remove(id);
    if (!ok) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const create = async (payload: Omit<Task, "id" | "createdAt">) => {
    const created = await taskService.create(payload);
    setTasks((prev) => [created, ...prev]);
    return created;
  };

  return { tasks, loading, refresh, byId, updateStatus, remove, create };
};
