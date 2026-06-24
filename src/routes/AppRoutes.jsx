import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardClientLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Billing from "../pages/Billing";
import Signup from "../pages/Signup";

//Client side
import DashboardClient from "../pages/DashboardClient";
import Lesen from "../pages/Lesen";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/billing" element={<Billing />} />
      </Route>

      <Route path="/dashboard-client" element={<DashboardLayout />}>
        <Route index element={<DashboardClient />} />
        <Route path="lesen" element={<Lesen />} />
      </Route>

    </Routes>
  );
}