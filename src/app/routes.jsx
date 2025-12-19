import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

import Home from "../pages/Home";
import Modules from "../pages/Modules";
import ModuleDetail from "../pages/ModuleDetail";
import QuizCenter from "../pages/QuizCenter";
import Simulator from "../pages/Simulator";
import Planner from "../pages/Planner";
import ReportCenter from "../pages/ReportCenter";
import VideoHub from "../pages/VideoHub";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/modul" element={<Modules />} />
        <Route path="/modul/:slug" element={<ModuleDetail />} />
        <Route path="/video" element={<VideoHub />} />
        <Route path="/kuis" element={<QuizCenter />} />
        <Route path="/simulasi" element={<Simulator />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/lapor" element={<ReportCenter />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
