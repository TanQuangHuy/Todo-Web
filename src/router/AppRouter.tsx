import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
// import DashboardPage from "../pages/app/DashboardPage";
import MyTaskPage from "../pages/app/MyTaskPage";
import RequireAuth from "./RequireAuth";
import AppLayout from "../components/layout/AppLayout";

import AccountInfoPage from "../pages/setting/AccountInfoPage";
import ChangePasswordPage from "../pages/setting/ChangePasswordPage";

import TaskCategoryPage from "../pages/taskCategory/TaskCategoryPage";

import CreateCategoryPage from "../pages/taskCategory/CreateCategoryPage";
import CreatePriorityPage from "../pages/taskCategory/CreatePriorityPage";
import CreateStatusPage from "../pages/taskCategory/CreateStatusPage";

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
        <Route path="/task-categories/create-category" element={<CreateCategoryPage />} />
        <Route path="/task-categories/edit-category/:id" element={<CreateCategoryPage />} />
        
        <Route path="/task-categories/create-priority" element={<CreatePriorityPage />} />
        <Route path="/task-categories/edit-priority/:id" element={<CreatePriorityPage />} />

        <Route path="/task-categories/create-status" element={<CreateStatusPage />} />
        <Route path="/task-categories/edit-status/:id" element={<CreateStatusPage />} />

        <Route path="/task-categories" element={<TaskCategoryPage />} />
        <Route path="/tasks" element={<MyTaskPage />} />
        <Route path="/settings/account" element={<AccountInfoPage />} />
        <Route path="/settings/change-password" element={<ChangePasswordPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
