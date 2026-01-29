import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./AppLayout.css";
import "./Sidebar.css";
import "./Topbar.css";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
