import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  CheckSquare,
  FolderKanban,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import "./Sidebar.css";

const navItem = ({ isActive }: { isActive: boolean }) => ({
  padding: "12px 14px",
  borderRadius: 12,
  display: "flex",
  gap: 12,
  alignItems: "center",
  textDecoration: "none",
  color: isActive ? "#ff6b6b" : "#fff",
  background: isActive ? "#fff" : "transparent",
  fontWeight: 700 as const,
});

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      {/* PROFILE */}
      <div className="sidebar-profile">
        {user && <Avatar src={user.avatar ?? "/default-avatar.png"} size={56} />}
        <div>
          <div className="sidebar-name">{user?.userName}</div>
          <div className="sidebar-email">{user?.email}</div>
        </div>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" style={navItem}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/app/dashboard" style={navItem}>
          <AlertTriangle size={18} />
          Vital Task
        </NavLink>

        <NavLink to="/app/my-task" style={navItem}>
          <CheckSquare size={18} />
          My Task
        </NavLink>

        <NavLink to="/task-categories" style={navItem}>
          <FolderKanban size={18} />
          Task Categories
        </NavLink>

        <NavLink to="/settings/account" style={navItem}>
          <Settings size={18} />
          Settings
        </NavLink>

        <NavLink to="/app/dashboard" style={navItem}>
          <HelpCircle size={18} />
          Help
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
