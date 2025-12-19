import React from "react";

export default function Pill({ label }) {
  return (
    <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-extrabold text-green-700">
      {label}
    </div>
  );
}
