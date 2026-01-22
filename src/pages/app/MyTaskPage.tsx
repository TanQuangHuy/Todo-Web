// src/pages/app/MyTaskPage.tsx
import { useMemo, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../../components/tasks/TaskList";
import TaskDetailPanel from "../../components/tasks/TaskDetailPanel";
import "./MyTaskPage.css";

export default function MyTaskPage() {
  const { tasks, loading, byId, updateStatus, remove } = useTasks();
  const [activeId, setActiveId] = useState<string | null>(tasks[0]?.id ?? null);

  const selected = useMemo(() => {
    if (!activeId) return null;
    return byId.get(activeId) ?? null;
  }, [activeId, byId]);

  const leftTasks = useMemo(
    () => tasks.filter((t) => t.status !== "Completed"),
    [tasks]
  );

  if (loading) return <div className="pagePad">Loading...</div>;

  return (
    <div className="pageGrid">
      <TaskList tasks={leftTasks} activeId={activeId} onSelect={setActiveId} />

      <TaskDetailPanel
        task={selected}
        onBack={() => setActiveId(null)}
        onChangeStatus={(s) => selected && updateStatus(selected.id, s)}
        onDelete={() => selected && remove(selected.id)}
        onEdit={() => alert("Edit modal sẽ làm ở bước tiếp theo")}
      />
    </div>
  );
}
