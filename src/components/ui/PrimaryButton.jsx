import React from "react";

export default function PrimaryButton({ children, onClick, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-extrabold transition",
        disabled
          ? "bg-slate-200 text-slate-500"
          : "bg-green-600 text-white hover:bg-green-700 active:scale-[0.99]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
