import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskCategoryService } from "../../services/taskCategoryService";
import "./CreateForm.css";

export default function CreatePriorityPage() {
  const { id } = useParams(); // có id => edit
  const isEdit = !!id;

  const [priorityName, setPriorityName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {
      if (!isEdit) return;
  
      const fetchDetail = async () => {
        try {
          const res = await taskCategoryService.getPriorityById(Number(id));
          setPriorityName(res.priorityName);
        } catch (err) {
          console.error(err);
          alert("Failed to load priority");
        }
      };
  
      fetchDetail();
    }, [id, isEdit]);
    
  const handleSubmit = async () => {
    if (!priorityName.trim()) {
      alert("Priority title is required");
      return;
    }

    try {
      await taskCategoryService.createPriority({ priorityName });
      alert("Created successfully");
      navigate("/task-categories");
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        {/* HEADER */}
        <div className="form-header">
          <h3>Add Task Priority</h3>
          <span className="go-back" onClick={() => navigate(-1)}>
            Go Back
          </span>
        </div>

        {/* FORM */}
        <div className="form-body">
          <label>Task Priority Title</label>
          <input
            type="text"
            value={priorityName}
            onChange={(e) => setPriorityName(e.target.value)}
            placeholder="Enter priority title"
          />

          <div className="form-actions">
            <button className="btn-primary" onClick={handleSubmit}>
              Create
            </button>
            <button
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
