// pages/task-category/TaskStatusForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskCategoryService } from "../../services/taskCategoryService";
import "./CreateForm.css";

export default function TaskStatusForm() {
  const { id } = useParams(); // có id => edit
  const isEdit = !!id;

  const [statusName, setStatusName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOAD DATA WHEN EDIT ================= */
  useEffect(() => {
    if (!isEdit) return;

    const fetchDetail = async () => {
      try {
        const res = await taskCategoryService.getStatusById(Number(id));
        setStatusName(res.statusName);
      } catch (err) {
        console.error(err);
        alert("Failed to load status");
      }
    };

    fetchDetail();
  }, [id, isEdit]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!statusName.trim()) {
      alert("Status name is required");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await taskCategoryService.updateStatus(Number(id), {
          statusName,
        });
        alert("Updated successfully");
      } else {
        await taskCategoryService.createStatus({
          statusName,
        });
        alert("Created successfully");
      }

      navigate("/task-categories");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        {/* HEADER */}
        <div className="form-header">
          <h3>{isEdit ? "Edit Task Status" : "Add Task Status"}</h3>
          <span className="go-back" onClick={() => navigate(-1)}>
            Go Back
          </span>
        </div>

        {/* BODY */}
        <div className="form-body">
          <label>Status Name</label>
          <input
            type="text"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            placeholder="Enter status name"
          />

          <div className="form-actions">
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {isEdit ? "Update" : "Create"}
            </button>

            <button
              className="btn-cancel"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
