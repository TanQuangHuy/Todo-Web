// src/components/tasks/TaskList.tsx
import type { Task } from "../../types/task";

type Props = {
  tasks: Task[];
  activeId?: string | null;
  onSelect: (id: string) => void;
};

export default function TaskList({ tasks, activeId, onSelect }: Props) {
  return (
    <div className="listCard">
      <div className="listTitle">My Tasks</div>

      <div className="listItems">
        {tasks.map((t) => (
          <button
            key={t.id}
            className={`listItem ${activeId === t.id ? "active" : ""}`}
            onClick={() => onSelect(t.id)}
          >
            <div className="dot" />
            <div className="liMain">
              <div className="liTitle">{t.title}</div>
              <div className="liMeta">
                <span className={`pill priority ${t.priority}`}>
                  {t.priority}
                </span>
                <span className={`pill status ${t.status.replaceAll(" ", "")}`}>
                  {t.status}
                </span>
              </div>
            </div>

            <img
              className="liImg"
              src={t.imageUrl || "https://via.placeholder.com/60?text=No"}
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
}
