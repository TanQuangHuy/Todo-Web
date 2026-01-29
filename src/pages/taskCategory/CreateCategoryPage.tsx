import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskCategoryService } from "../../services/taskCategoryService";
import "./CreateForm.css";

export default function CreateCategoryPage() {
  const { id } = useParams(); // có id => edit
  const isEdit = !!id;

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;

    const fetchDetail = async () => {
      try {
        const res = await taskCategoryService.getCategoryById(Number(id));
        setCategoryName(res.categoryName);
      } catch (err) {
        console.error(err);
        alert("Failed to load category");
      }
    };

    fetchDetail();
  }, [id, isEdit]);
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      await taskCategoryService.createCategory({ categoryName });
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
          <h3>Create Categories</h3>
          <span className="go-back" onClick={() => navigate(-1)}>
            Go Back
          </span>
        </div>

        {/* FORM */}
        <div className="form-body">
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
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
