import React, { useMemo, useState } from "react";

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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 text-black">
      <div className="w-full max-w-xl rounded-2xl border border-green-200 bg-white p-6 shadow-lg">
        <div className="mb-6">
          <div className="text-2xl font-extrabold">
            Selamat datang di Monexia
          </div>
          <div className="text-sm text-black/70 mt-2">
            Isi nama dan tujuan dulu. Setelah itu kamu masuk ke Home.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="text-sm font-semibold mb-2">Nama</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Ridwan"
              className="w-full rounded-xl bg-white border border-green-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
            <div className="text-xs text-black/60 mt-2">
              Minimal 2 karakter.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2">
              Tujuan penggunaan
            </div>
            <select
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className="w-full rounded-xl bg-white border border-green-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >
              {tujuanList.map((t) => (
                <option key={t.value} value={t.value}>
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
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-green-100 text-black/50 cursor-not-allowed")
            }
          >
            Masuk ke Home
          </button>

          <div className="text-xs text-black/60">
            Data disimpan di browser (localStorage). Bisa di-reset kapan saja.
          </div>
        </form>
      </div>
    </div>
  );
}
