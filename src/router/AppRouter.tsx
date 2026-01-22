import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
// import DashboardPage from "../pages/app/DashboardPage";
import MyTaskPage from "../pages/app/MyTaskPage";
import RequireAuth from "./RequireAuth";
import AppLayout from "../components/layout/AppLayout";

import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/tasks" element={<MyTaskPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
