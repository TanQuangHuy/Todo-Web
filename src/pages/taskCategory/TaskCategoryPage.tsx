import { useEffect, useState } from "react";
import { taskCategoryService } from "../../services/taskCategoryService";
import type {
  TaskPriority,
  TaskStatus,
  TaskCategory,
} from "../../types/taskCategory";
import "./TaskCategoryPage.css";
import { useNavigate } from "react-router-dom";

export default function TaskCategoryPage() {
  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [priorities, setPriorities] = useState<TaskPriority[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const navigate = useNavigate();

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const [statusRes, priorityRes, categoryRes] = await Promise.all([
        taskCategoryService.getTaskStatuses(),
        taskCategoryService.getTaskPriorities(),
        taskCategoryService.getCategories(),
      ]);

      setStatuses(statusRes);
      setPriorities(priorityRes);
      setCategories(categoryRes);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= CONFIRM DELETE ================= */
  const confirmDelete = async (
    message: string,
    action: () => Promise<void>
  ) => {
    const ok = window.confirm(message);
    if (!ok) return;

    await action();
  };

  /* ================= DELETE HANDLERS ================= */
  const handleDeleteStatus = async (statusId: number): Promise<void> => {
    await taskCategoryService.deleteStatus(statusId);
    await loadData();
  };

  const handleDeletePriority = async (priorityId: number): Promise<void> => {
    await taskCategoryService.deletePriority(priorityId);
    await loadData();
  };

  const handleDeleteCategory = async (categoryId: number): Promise<void> => {
    await taskCategoryService.deleteCategories(categoryId);
    await loadData();
  };

  return (
    <div className="page-container">
      {/* STATUS */}
      <Section
        title="Task Status"
        addText="Add Task Status"
        onAdd={() => navigate("/task-categories/create-status")}
      >
        {statuses.map((s, i) => (
          <tr key={s.statusId}>
            <td className="col-sn">{i + 1}</td>
            <td className="col-name">{s.statusName}</td>
            <ActionCell
            onEdit={() =>
              navigate(`/task-categories/edit-status/${s.statusId}`)
            }
              onDelete={() =>
                confirmDelete(
                  "Delete this status?",
                  () => handleDeleteStatus(s.statusId)
                )
              }
            />
          </tr>
        ))}
      </Section>

      {/* PRIORITY */}
      <Section
        title="Task Priority"
        addText="Add New Priority"
        onAdd={() => navigate("/task-categories/create-priority")}
      >
        {priorities.map((p, i) => (
          <tr key={p.priorityId}>
            <td className="col-sn">{i + 1}</td>
            <td className="col-name">{p.priorityName}</td>
            <ActionCell
              onEdit={() =>
                navigate(`/task-categories/edit-priority/${p.priorityId}`)
              }
              onDelete={() =>
                confirmDelete(
                  "Delete this priority?",
                  () => handleDeletePriority(p.priorityId)
                )
              }
            />
          </tr>
        ))}
      </Section>

      {/* CATEGORY */}
      <Section
        title="Task Category"
        addText="Add Category"
        onAdd={() => navigate("/task-categories/create-category")}
      >
        {categories.map((c, i) => (
          <tr key={c.categoryId}>
            <td className="col-sn">{i + 1}</td>
            <td className="col-name">{c.categoryName}</td>
            <ActionCell 
              onEdit={() =>
                navigate(`/task-categories/edit-category/${c.categoryId}`)
            }
              onDelete={() =>
                confirmDelete(
                  "Delete this category?",
                  () => handleDeleteCategory(c.categoryId)
                )
              }
            />
          </tr>
        ))}
      </Section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({
  title,
  addText,
  onAdd,
  children,
}: {
  title: string;
  addText: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="section-block">
      <div className="section-title">
        <span>{title}</span>
        <span className="add-link" onClick={onAdd}>
          + {addText}
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="col-sn">SN</th>
              <th className="col-name">{title}</th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function ActionCell({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <td className="col-action action-cell">
      <button className="edit-btn" onClick={onEdit}>
        Edit
      </button>
      <button className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </td>
  );
}

