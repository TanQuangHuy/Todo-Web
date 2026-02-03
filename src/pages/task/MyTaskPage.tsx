import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../../components/tasks/TaskList";
import TaskDetailPanel from "../../components/tasks/TaskDetailPanel";
import TaskForm from "./TaskForm";
import type { Task } from "../../types/task";
import "./MyTaskPage.css";
import { useAuth } from "../../context/AuthContext";
import { taskService } from "../../services/taskService";

export default function MyTaskPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please login</div>;
  }

  const { tasks, loading, reload } = useTasks(user.userId);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  const activeTask =
    tasks.find((t) => t.taskId === activeId) ?? null;

  if (loading) return <div>Loading...</div>;

  const handleDelete = async () => {
    if (!activeTask || deleting) return;

    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;

    try {
      setDeleting(true);
      await taskService.deleteTask(activeTask.taskId);

      setActiveId(null);
      setSelectedTask(null);
      setShowForm(false);
      reload();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="taskLayout">
      <TaskList
        tasks={tasks}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id);
          setShowForm(false);
          setSelectedTask(null);
        }}
      />

      {showForm ? (
        <TaskForm
          mode={selectedTask ? "edit" : "create"}
          task={selectedTask ?? undefined}
          onDone={() => {
            setShowForm(false);
            setSelectedTask(null);
            reload();
          }}
        />
      ) : (
        <TaskDetailPanel
          task={activeTask}
          onEdit={() => {
            if (!activeTask) return;
            setSelectedTask(activeTask);
            setShowForm(true);
          }}
          onCreate={() => {
            setSelectedTask(null);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
