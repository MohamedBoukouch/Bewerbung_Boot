import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardClientLayout";
import DashboardClient from "../pages/DashboardClient";

import Datenextraktion from "../pages/Datenextraktion";
import EmailsSenden from "../pages/EmailsSenden";
import MyApplications from "../pages/MyApplications";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Billing from "../pages/Billing";
import Signup from "../pages/Signup";
import AuthCallback from "../pages/AuthCallback";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/billing" element={<Billing />} />
      </Route>

      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard-client" element={<DashboardLayout />}>
          <Route index element={<DashboardClient />} />
          <Route path="datenextraktion" element={<Datenextraktion />} />
          <Route path="emails-senden" element={<EmailsSenden />} />
          <Route path="my-applications" element={<MyApplications />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}