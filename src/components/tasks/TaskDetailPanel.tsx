import type { TaskUI } from "../../hooks/useTasks";

type Props = {
  task: TaskUI | null;
  onEdit: () => void;
  onCreate: () => void;
  onDelete?: () => void;
};

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("vi-VN") : "-";

export default function TaskDetailPanel({
  task,
  onEdit,
  onCreate,
  onDelete,
}: Props) {
 
  if (!task) {
    return (
      <div className="detailCard empty">
        <p>Select a task to see details</p>

        <button className="actionBtn primary" onClick={onCreate}>
          + Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className="detailCard">
      {/* HEADER */}
      <div className="detailHeader">
        <img
          className="detailThumb"
          src={task.imageUrl || "https://via.placeholder.com/120"}
          alt=""
        />

        <div className="detailHeaderInfo">
          <h2>{task.title}</h2>

          <div className="detailMetaLine">
            <span>
              Priority:{" "}
              <b className={`text ${task.priority?.priorityName?.toLowerCase()}`}>
                {task.priority?.priorityName}
              </b>
            </span>

            <span>
              Status:{" "}
              <b className={`text ${task.status?.statusName?.toLowerCase()}`}>
                {task.status?.statusName}
              </b>
            </span>

            <span className="created">
              Created on: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="detailBody">
        <p>
          <b>Task Title:</b> {task.title}
        </p>

        <p>
          <b>Objective:</b> {task.objective}
        </p>

        <p>
          <b>Task Description:</b>
        </p>
        <p className="muted">{task.description}</p>

        {task.notes && (
          <>
            <p>
              <b>Additional Notes:</b>
            </p>
            <p className="muted">{task.notes}</p>
          </>
        )}

        {task.deadline && (
          <p>
            <b>Deadline for Submission:</b>{" "}
            {formatDate(task.deadline)}
          </p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="detailActions">
        <button
          className="actionBtn danger"
          onClick={onDelete}
        >
          Delete
        </button>

        <button
          className="actionBtn primary"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
