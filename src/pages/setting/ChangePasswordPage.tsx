import { useState } from "react";
import "./ChangePasswordPage.css";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Change password:", form);
  };

  return (
    <div className="password-card">
      <div className="password-header">
        <h3>Change Password</h3>
        <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
      </div>

      <div className="password-user">
        <img src="https://i.pravatar.cc/100" alt="avatar" />
        <div>
          <h4>Sundar Gurung</h4>
          <p>sundargurung360@gmail.com</p>
        </div>
      </div>

      <form className="password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="password-actions">
          <button type="submit" className="btn-primary">
            Update Password
          </button>

          <button type="button" className="btn-cancel" onClick={() => navigate("/settings/account")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
