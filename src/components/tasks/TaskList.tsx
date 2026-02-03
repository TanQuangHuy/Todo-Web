import type { TaskUI } from "../../hooks/useTasks";

type Props = {
  tasks: TaskUI[];
  activeId: number | null;
  onSelect: (id: number) => void;
};

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("vi-VN") : "-";

export default function TaskList({ tasks, activeId, onSelect }: Props) {
  return (
    <div className="listCard">
      <h3 className="listTitle">My Tasks</h3>

      {tasks.map((t) => (
        <div
          key={t.taskId}
          className={`taskItem ${activeId === t.taskId ? "active" : ""}`}
          onClick={() => onSelect(t.taskId)}
        >
          {/* LEFT CONTENT */}
          <div className="taskContent">
            <div className="taskHeader">
              <span className="taskDot" />
              <b className="taskTitle">{t.title}</b>
            </div>

            {t.description && (
              <p className="taskDesc">
                {t.description.slice(0, 50)}...
              </p>
            )}

            {/* META LINE */}
            <div className="taskMetaLine">


              <span className="created">
                Created on: {formatDate(t.createdAt)}
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            className="taskThumb"
            src={t.imageUrl || "https://via.placeholder.com/80"}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
