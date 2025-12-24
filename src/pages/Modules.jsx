import React from "react";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../components/ui/SecondaryButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import { modules } from "../data/content";

export default function Modules() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-600 text-xl">
              📚
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                Learning Path
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Modul Pembelajaran
              </h1>
            </div>
          </div>
          
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Pelajari fintech secara bertahap melalui modul-modul terstruktur. Setiap modul dirancang untuk membantu kamu memahami konsep dari dasar hingga penerapan praktis.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-600">
              {modules.length} Modul Tersedia
            </div>
            <div className="rounded-2xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-extrabold text-green-700">
              Gratis • Self-Paced
            </div>
          </div>
        </div>
      </div>

      {/* MODULES GRID */}
      <div className="grid gap-5 md:grid-cols-2">
        {modules.map((m, idx) => (
          <div
            key={m.slug}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-green-300"
          >
            {/* Accent Bar with Number */}
            <div className="relative h-2 bg-gradient-to-r from-green-500 to-emerald-400">
              <div className="absolute -bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-600 text-xs font-extrabold text-white shadow-sm">
                {idx + 1}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-green-700">
                    Modul {idx + 1}
                  </div>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900 leading-tight">
                    {m.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                {m.subtitle}
              </p>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                  📖 Interaktif
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                  ⏱️ ~15 menit
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 flex gap-2">
                <PrimaryButton 
                  onClick={() => nav(`/modul/${m.slug}`)}
                  className="flex-1"
                >
                  Mulai Belajar →
                </PrimaryButton>
              </div>
            </div>

            {/* Hover Effect Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50/0 to-green-50/0 transition-all group-hover:from-green-50/50 group-hover:to-emerald-50/30" />
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="text-sm font-extrabold text-slate-900">
              Sudah selesai semua modul?
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Uji pemahaman kamu dengan mengikuti kuis evaluasi atau coba simulasi anti-penipuan.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={() => nav("/kuis")}>
              Ikuti Kuis
            </SecondaryButton>
            <SecondaryButton onClick={() => nav("/simulasi")}>
              Coba Simulasi
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
