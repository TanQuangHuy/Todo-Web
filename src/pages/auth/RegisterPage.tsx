import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
} from "react-icons/fa";

import registerImg from "../../assets/images/logo.png";
import "./Register.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
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

          <form onSubmit={onSubmit}>
            <div className="inputGroup">
              <FaIdCard className="inputIcon" />
              <input
                name="firstName"
                placeholder="Enter First Name"
                value={form.firstName}
                onChange={onChange}
              />
            </div>

            <div className="inputGroup">
              <FaIdCard className="inputIcon" />
              <input
                name="lastName"
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={onChange}
              />
            </div>

            <div className="inputGroup">
              <FaUser className="inputIcon" />
              <input
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={onChange}
              />
            </div>

            <div className="inputGroup">
              <FaEnvelope className="inputIcon" />
              <input
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div className="inputGroup">
              <FaLock className="inputIcon" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={onChange}
              />
            </div>

            <div className="inputGroup">
              <FaLock className="inputIcon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={onChange}
              />
            </div>

            <label className="remember">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={onChange}
              />
              I agree to all terms
            </label>

            <button type="submit">Register</button>
          </form>

          <p className="switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
