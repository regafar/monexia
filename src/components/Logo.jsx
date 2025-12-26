import React from "react";

export default function Logo({
  title = "MoneEdu",
  subtitle = "Teman Belajar Keuangan Digitalmu",
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon */}
      <div
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm"
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #22c55e 45%, #bbf7d0 100%)",
        }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          {/* M shape */}
          <path
            d="M6.7 18.8V8.2c0-.9 1.1-1.3 1.7-.7l3.2 3.2c.4.4 1 .4 1.4 0l3.2-3.2c.6-.6 1.7-.2 1.7.7v10.6"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          {/* rising line */}
          <path
            d="M7 16.8l4.4-4.4 2.3 2.3 5.2-5.2"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          {/* arrow head */}
          <path
            d="M18.9 9.5v3.1H15.8"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>

        {/* small highlight dot */}
        <div className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full border border-white/70 bg-white/25" />
      </div>

      {/* Wordmark */}
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <div className="text-[16px] font-extrabold text-slate-900">
            {title}
          </div>

          <div className="hidden sm:inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-extrabold text-green-700">
            EDU
          </div>
        </div>

        <div className="text-[11.5px] font-semibold text-slate-500">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
