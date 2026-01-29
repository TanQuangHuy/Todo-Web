import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";

import fbIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google.png";
import xIcon from "../../assets/icons/X.png";
import loginImg from "../../assets/images/logo.png";

import "./Login.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 🔐 login (email hoặc phone đều được)
      await login(input, password);

      // 🚀 REDIRECT NGAY LẬP TỨC
      navigate("/tasks", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Sai thông tin đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        {/* LEFT */}
        <div className="authLeft">
          <h2>Sign In</h2>

          {error && <div className="authError">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="inputGroup">
              <FaUser className="inputIcon" />
              <input
                placeholder="Email hoặc số điện thoại"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
            </div>

            <div className="inputGroup">
              <FaLock className="inputIcon" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="authFooter">
            <p>Or, Login with</p>

            <div className="socials">
              <img src={fbIcon} alt="Facebook" />
              <img src={googleIcon} alt="Google" />
              <img src={xIcon} alt="X" />
            </div>

            <p className="switch">
              Don't have an account? <a href="/register">Create One</a>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="authRight">
          <img src={loginImg} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}
