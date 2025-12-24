import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../Logo";

export default function AppLayout() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="cursor-pointer" onClick={() => nav("/")}>
            <Logo title="MoneEdu" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => nav("/")}
              className="rounded-xl border border-green-600 px-4 py-2 text-sm font-extrabold text-green-700 hover:bg-green-50"
            >
              ⬅ Beranda
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-500">
          Platform edukasi fintech untuk literasi keuangan digital.
        </div>
      </footer>
    </div>
  );
}
