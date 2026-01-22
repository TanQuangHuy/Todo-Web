// src/components/tasks/TaskDetailPanel.tsx
import type { Task, TaskStatus } from "../../types/task";

type Props = {
  task: Task | null;
  onBack?: () => void;
  onChangeStatus?: (status: TaskStatus) => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const StatusPill = ({
  status,
  onChange,
}: {
  status: TaskStatus;
  onChange?: (s: TaskStatus) => void;
}) => {
  return (
    <div className="statusRow">
      <span className={`pill status ${status.replaceAll(" ", "")}`}>
        {status}
      </span>

      {onChange && (
        <select
          className="statusSelect"
          value={status}
          onChange={(e) => onChange(e.target.value as TaskStatus)}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      )}
    </div>
  );
};

export default function TaskDetailPanel({
  task,
  onBack,
  onChangeStatus,
  onDelete,
  onEdit,
}: Props) {
  if (!task) {
    return (
      <div className="detailCard empty">
        <div className="muted">Chọn 1 task ở danh sách để xem chi tiết.</div>
      </div>
    );
  }

  return (
    <div className="detailCard">
      <div className="detailHeader">
        <div className="detailTitleWrap">
          <h3 className="detailTitle">{task.title}</h3>
          <button className="linkBtn" onClick={onBack}>
            Go Back
          </button>
        </div>

        <div className="metaRow">
          <div>
            <div className="metaLabel">Priority:</div>
            <div className={`pill priority ${task.priority}`}>
              {task.priority}
            </div>
          </div>

          <div>
            <div className="metaLabel">Status:</div>
            <StatusPill status={task.status} onChange={onChangeStatus} />
          </div>

          <div>
            <div className="metaLabel">Created:</div>
            <div className="metaValue">{task.createdAtISO}</div>
          </div>

          <div>
            <div className="metaLabel">Deadline:</div>
            <div className="metaValue">{task.deadline}</div>
          </div>
        </div>
      </div>

      <div className="detailBody">
        <div className="detailTop">
          <img
            className="detailImage"
            src={task.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={task.title}
          />
          <p className="detailDesc">{task.description}</p>
        </div>

        <div className="notesBlock">
          <h4>Additional Notes:</h4>
          <ul>
            <li>Ensure the documents are authentic and up-to-date.</li>
            <li>Maintain confidentiality of sensitive information.</li>
            <li>If there are specific guidelines, adhere diligently.</li>
          </ul>
          <div className="deadlineLine">
            <b>Deadline for Submission:</b> {task.deadline}
          </div>
        </div>
      </div>

      <div className="detailActions">
        <button className="iconBtn danger" onClick={onDelete} title="Delete">
          🗑️
        </button>
        <button className="iconBtn" onClick={onEdit} title="Edit">
          ✏️
        </button>
      </div>
    </div>
  );
}
