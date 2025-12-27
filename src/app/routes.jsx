import React from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";

import Home from "../pages/Home";
import Modules from "../pages/Modules";
import ModuleDetail from "../pages/ModuleDetail";
import QuizCenter from "../pages/QuizCenter";
import Simulator from "../pages/Simulator";
import Planner from "../pages/Planner";
import ReportCenter from "../pages/ReportCenter";

import Onboarding from "../pages/Onboarding";

/* =======================
   ONBOARDING CHECK
======================= */
function hasOnboarding() {
  try {
    const raw = localStorage.getItem("rr_onboarding");
    if (!raw) return false;

    const data = JSON.parse(raw);
    return Boolean(
      data &&
        typeof data.name === "string" &&
        data.name.trim().length >= 2 &&
        data.goal
    );
  } catch (e) {
    return false;
  }
}

/* =======================
   ROUTE GUARDS
======================= */
function RequireOnboarding() {
  const location = useLocation();

  if (!hasOnboarding()) {
    return <Navigate to="/mulai" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

function RedirectIfOnboarded() {
  if (hasOnboarding()) {
    return <Navigate to="/" replace />;
  }

  return (
    <Onboarding
      onDone={() => {
        window.location.href = "/";
      }}
    />
  );
}

/* =======================
   ANIMATED OUTLET
   (MODERN DEFAULT TRANSITION)
======================= */
function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1] // modern dashboard easing
        }}
        style={{ minHeight: "100%" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

/* =======================
   APP ROUTES
======================= */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Halaman awal sebelum masuk aplikasi */}
      <Route path="/mulai" element={<RedirectIfOnboarded />} />

      {/* Semua halaman aplikasi diproteksi onboarding */}
      <Route element={<RequireOnboarding />}>
        <Route element={<AppLayout />}>
          {/* TRANSISI HALAMAN */}
          <Route element={<AnimatedOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/modul" element={<Modules />} />
            <Route path="/modul/:slug" element={<ModuleDetail />} />
            <Route path="/kuis" element={<QuizCenter />} />
            <Route path="/simulasi" element={<Simulator />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/lapor" element={<ReportCenter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
