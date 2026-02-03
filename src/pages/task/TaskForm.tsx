import "./TaskForm.css";

import { useEffect, useState } from "react";
import { taskService } from "../../services/taskService";
import { taskImageService } from "../../services/taskImageService";
import type { TaskPayload } from "../../services/taskService";
import type { Task } from "../../types/task";
import type {
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from "../../types/taskCategory";
import { taskCategoryService } from "../../services/taskCategoryService";
import { useAuth } from "../../context/AuthContext";

type Props = {
  mode: "create" | "edit";
  task?: Task;
  onDone: () => void;
};

export default function TaskForm({ mode, task, onDone }: Props) {
  const { user } = useAuth();
  const isEdit = mode === "edit";

  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [priorities, setPriorities] = useState<TaskPriority[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState<TaskPayload>({
    title: "",
    objective: "",
    description: "",
    notes: "",
    deadline: null,
    userId: user!.userId,
    categoryId: 0,
    statusId: 0,
    priorityId: 0,
    orderIndex: 1,
  });

  /* load meta */
  useEffect(() => {
    (async () => {
      const [s, p, c] = await Promise.all([
        taskCategoryService.getTaskStatuses(),
        taskCategoryService.getTaskPriorities(),
        taskCategoryService.getCategories(),
      ]);

      setStatuses(s);
      setPriorities(p);
      setCategories(c);

      if (!task) {
        setForm((f) => ({
          ...f,
          statusId: s[0]?.statusId,
          priorityId: p[0]?.priorityId,
          categoryId: c[0]?.categoryId,
        }));
      }
    })();
  }, [task]);

  /* fill when edit */
  useEffect(() => {
    if (!task) return;

    setForm((f) => ({
      ...f,
      title: task.title,
      objective: task.objective,
      description: task.description,
      notes: task.notes,
      deadline: task.deadline,
      categoryId: task.categoryId,
      statusId: task.statusId,
      priorityId: task.priorityId,
    }));
  }, [task]);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async () => {
    if (!user || loading) return;

    try {
      setLoading(true);

      let taskId: number;

      if (isEdit && task) {
        await taskService.updateTask(task.taskId, form);
        taskId = task.taskId;
      } else {
        const created = await taskService.createTask({
          ...form,
          userId: user.userId,
        });
        taskId = created.data.taskId; // 🔥 fix đúng axios
      }

      if (image) {
        await taskImageService.upload(taskId, image);
      }

      onDone();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="taskForm">
      <h3>{isEdit ? "Update Task" : "Add Task"}</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={change}
      />

      <input
        name="objective"
        placeholder="Objective"
        value={form.objective}
        onChange={change}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={change}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes ?? ""}
        onChange={change}
      />

      <input
        type="datetime-local"
        value={form.deadline ?? ""}
        onChange={(e) =>
          setForm((f) => ({ ...f, deadline: e.target.value }))
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <div className="row">
        <select
          value={form.priorityId}
          onChange={(e) =>
            setForm((f) => ({ ...f, priorityId: +e.target.value }))
          }
        >
          {priorities.map((p) => (
            <option key={p.priorityId} value={p.priorityId}>
              {p.priorityName}
            </option>
          ))}
        </select>

        <select
          value={form.statusId}
          onChange={(e) =>
            setForm((f) => ({ ...f, statusId: +e.target.value }))
          }
        >
          {statuses.map((s) => (
            <option key={s.statusId} value={s.statusId}>
              {s.statusName}
            </option>
          ))}
        </select>

        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm((f) => ({ ...f, categoryId: +e.target.value }))
          }
        >
          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={submit} disabled={loading}>
        {loading ? "Saving..." : "Done"}
      </button>

    </div>
  );
}
