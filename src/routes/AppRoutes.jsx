import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardClientLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Billing from "../pages/Billing";
import Signup from "../pages/Signup";

// Client side
import DashboardClient from "../pages/DashboardClient";
import Lesen from "../pages/Lesen";
import LesenExercise from "../pages/LesenExercise";
import SprachbausteineExercise from "../pages/SprachbausteineExercise";

import ResultPage from "../components/layout/clients/ResultPage_Usage";

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

        {/* Lesen routes */}
        <Route path="lesen" element={<Lesen />} />
        <Route path="lesen/:level/:subTab/:topicId" element={<LesenExercise />} />
        <Route path="lesen/:level/:subTab/:topicId/result" element={<ResultPage />} />

        {/* Sprachbausteine routes - FIXED: relative paths + added result route */}
        <Route path="sprachbausteine" element={<Lesen />} />
        <Route path="sprachbausteine/:level/:subTab/:topicId" element={<SprachbausteineExercise />} />
        <Route path="sprachbausteine/:level/:subTab/:topicId/result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}