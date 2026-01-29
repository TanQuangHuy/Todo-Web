// src/services/taskService.ts
import type { Task, TaskStatus } from "../types/task";
import { fakeTasks } from "../data/fakeDb";
import { sleep } from "../utils/sleep";

let db = [...fakeTasks];

export const taskService = {
  async getAll(): Promise<Task[]> {
    await sleep(250);
    return [...db];
  },

  async getById(id: string): Promise<Task | null> {
    await sleep(150);
    return db.find((t) => t.id === id) ?? null;
  },

  async updateStatus(id: string, status: TaskStatus): Promise<Task | null> {
    await sleep(200);
    db = db.map((t) => (t.id === id ? { ...t, status } : t));
    return db.find((t) => t.id === id) ?? null;
  },

  async remove(id: string): Promise<boolean> {
    await sleep(200);
    const before = db.length;
    db = db.filter((t) => t.id !== id);
    return db.length !== before;
  },

  async create(payload: Omit<Task, "id" | "createdAt">): Promise<Task> {
    await sleep(250);
    const created: Task = {
      ...payload,
      id: "t" + Math.random().toString(16).slice(2),
      createdAtISO: new Date().toISOString().slice(0, 10),
    };
    db = [created, ...db];
    return created;
  },
};
