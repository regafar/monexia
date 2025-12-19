import React from "react";
import mascot from "../assets/monexia-mascot.png";

export default function Mascot({ message }) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3">
      {message && (
        <div className="max-w-xs rounded-2xl border border-green-200 bg-white p-3 text-sm text-slate-700 shadow-md">
          {message}
        </div>
      )}

      <img
        src={mascot}
        alt="Maskot Monexia"
        className="h-24 w-24 drop-shadow-lg"
      />
    </div>
  );
}
