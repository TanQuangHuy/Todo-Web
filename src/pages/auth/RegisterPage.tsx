import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

import registerImg from "../../assets/images/logo.png";
import "./Register.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phoneNumber: "",
    userName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      await register({
        phoneNumber: form.phoneNumber,
        userName: form.userName,
        email: form.email,
        password: form.password,
        address: form.address,
      });

      navigate("/login"); // ✅ đúng flow backend
    } catch (err: any) {
      setError(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer reverse">
        {/* LEFT – IMAGE */}
        <div className="authRight">
          <img src={registerImg} alt="Register" />
        </div>

        {/* RIGHT – FORM */}
        <div className="authLeft">
          <h2>Sign Up</h2>

          {error && <div className="authError">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="inputGroup">
              <FaPhone className="inputIcon" />
              <input
                name="phoneNumber"
                placeholder="Số điện thoại"
                value={form.phoneNumber}
                onChange={onChange}
                required
              />
            </div>

            <div className="inputGroup">
              <FaUser className="inputIcon" />
              <input
                name="userName"
                placeholder="Username"
                value={form.userName}
                onChange={onChange}
                required
              />
            </div>

            <div className="inputGroup">
              <FaEnvelope className="inputIcon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="inputGroup">
              <FaHome className="inputIcon" />
              <input
                name="address"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={onChange}
                required
              />
            </div>

            <div className="inputGroup">
              <FaLock className="inputIcon" />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <div className="inputGroup">
              <FaLock className="inputIcon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
