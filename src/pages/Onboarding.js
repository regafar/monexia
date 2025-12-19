import React, { useMemo, useState } from "react";
import Logo from "../components/ui/Logo";

export default function Onboarding({ onDone }) {
  const tujuanList = useMemo(
    () => [
      { value: "", label: "Pilih tujuan" },
      { value: "belajar-fintech", label: "Belajar konsep FinTech" },
      { value: "jenis-fintech", label: "Memahami jenis-jenis FinTech" },
      { value: "aman-digital", label: "Keamanan digital (anti-penipuan)" },
      { value: "kuis-simulasi", label: "Latihan lewat kuis dan simulasi" },
      { value: "planner", label: "Membuat perencanaan keuangan pribadi" },
      { value: "lainnya", label: "Lainnya" }
    ],
    []
  );

  const [nama, setNama] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [error, setError] = useState("");

  const bisaLanjut = nama.trim().length >= 2 && tujuan;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!nama.trim() || nama.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }

    if (!tujuan) {
      setError("Silakan pilih tujuan penggunaan.");
      return;
    }

    const payload = {
      name: nama.trim(),
      goal: tujuan,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("rr_onboarding", JSON.stringify(payload));

    if (typeof onDone === "function") {
      onDone(payload);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-emerald-100 text-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-emerald-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo className="h-12 w-auto" />
          </div>

          <div className="text-3xl font-extrabold text-emerald-700">
            Selamat datang di RupiahRapi
          </div>

          <div className="text-sm text-slate-600 mt-3">
            Kenali kebutuhan kamu agar kami bisa menampilkan pengalaman belajar
            yang lebih relevan.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="text-sm font-semibold mb-2 text-slate-700">
              Nama
            </div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama kamu"
              className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            <div className="text-xs text-slate-500 mt-2">
              Minimal 2 karakter.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2 text-slate-700">
              Tujuan penggunaan
            </div>
            <select
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            >
              {tujuanList.map((t) => (
                <option key={t.value} value={t.value} className="bg-white">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!bisaLanjut}
            className={
              "w-full rounded-xl px-4 py-3 font-bold transition " +
              (bisaLanjut
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-200 text-slate-400 cursor-not-allowed")
            }
          >
            Lanjut ke Beranda
          </button>

          <div className="text-xs text-slate-500 text-center">
            Data hanya disimpan di perangkat kamu dan tidak dikirim ke server.
          </div>
        </form>
      </div>
    </div>
  );
}
