import { Link } from "react-router-dom";
import type { Task } from "../../types/task";
import Badge, { toneByPriority, toneByStatus } from "../common/Badge";

export default function TaskCard({ task, compact }: { task: Task; compact?: boolean }) {
  return (
    <Link
      to={`/app/task/${task.id}`}
      style={{
        display: "flex",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        border: "1px solid #e8edf5",
        background: "white",
        textDecoration: "none",
        color: "#111",
        alignItems: compact ? "center" : "flex-start",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 900, marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {task.title}
        </div>

        {!compact ? (
          <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 10, lineHeight: 1.35 }}>
            {task.description.slice(0, 110)}{task.description.length > 110 ? "..." : ""}
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge tone={toneByPriority(task.priority)}>{task.priority}</Badge>
          <Badge tone={toneByStatus(task.status)}>{task.status}</Badge>
          <span style={{ fontSize: 12, opacity: 0.6, fontWeight: 700 }}>
            Created: {task.createdAtISO}
          </span>
        </div>
      </div>

      {task.imageUrl ? (
        <img
          src={task.imageUrl}
          alt=""
          style={{
            width: compact ? 64 : 86,
            height: compact ? 64 : 86,
            borderRadius: 12,
            objectFit: "cover",
            border: "1px solid #eee",
          }}
        />
      ) : null}
    </Link>
  );
}
