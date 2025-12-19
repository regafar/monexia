import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getProgress, resetProgress } from "../../data/progressStore";
import LogoMark from "../ui/LogoMark";
import Pill from "../ui/Pill";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive ? "bg-green-600 text-white" : "text-slate-700 hover:bg-green-50",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function TopNav() {
  const nav = useNavigate();
  const p = getProgress();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <button
          onClick={() => nav("/")}
          className="flex items-center gap-3 rounded-2xl p-2 hover:bg-green-50"
          aria-label="Ke beranda"
        >
          <LogoMark />
          <div className="text-left">
            <div className="text-sm font-extrabold leading-4">Finovo Edu</div>
            <div className="text-xs text-slate-500">Belajar fintech, aman, terarah</div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          <NavItem to="/modul">Modul</NavItem>
          <NavItem to="/video">Video</NavItem>
          <NavItem to="/kuis">Kuis</NavItem>
          <NavItem to="/simulasi">Simulasi</NavItem>
          <NavItem to="/planner">Planner</NavItem>
          <NavItem to="/lapor">Lapor</NavItem>
        </nav>

        <div className="flex items-center gap-2">
          <Pill label={`Level ${p.level}`} />
          <Pill label={`${p.xp} XP`} />
          <button
            onClick={() => {
              resetProgress();
              window.location.reload();
            }}
            className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 md:inline-flex"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </header>
  );
}
