import { use, useState } from "react";
import "./AccountInfoPage.css";
import { useNavigate } from "react-router-dom";

export default function AccountInfoPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "Sundar",
    lastName: "Gurung",
    email: "sundargurung360@gmail.com",
    phone: "9800000000",
    position: "Frontend Developer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update info:", form);
  };

  return (
    <div className="account-card">
      <div className="account-header">
        <h3>Account Information</h3>
        <button className="back-btn">Go Back</button>
      </div>

      <div className="account-user">
        <img src="https://i.pravatar.cc/100" alt="avatar" />
        <div>
          <h4>{form.firstName} {form.lastName}</h4>
          <p>{form.email}</p>
        </div>
      </div>

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Position</label>
          <input name="position" value={form.position} onChange={handleChange} />
        </div>

        <div className="account-actions">
          <button type="submit" className="btn-primary">
            Update Info
          </button>

          <button type="button" className="btn-outline" onClick={() => navigate("/settings/change-password")}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
