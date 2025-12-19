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
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-950 to-green-950 text-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-green-500/20 bg-white/40 backdrop-blur p-6 shadow-xl">
        <div className="mb-6">
          <div className="text-2xl font-extrabold leading-tight">
            Selamat datang di RupiahRapi
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
              placeholder="Contoh: Rega"
              className="w-full rounded-xl bg-green/5 border border-green/10 px-4 py-3 outline-none focus:border-green-400"
            />
            <div className="text-xs text-black/50 mt-2">
              Minimal 2 karakter.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2">Tujuan penggunaan</div>
            <select
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className="w-full rounded-xl bg-green/5 border border-green/10 px-4 py-3 outline-none focus:border-green-400"
            >
              {tujuanList.map((t) => (
                <option key={t.value} value={t.value} className="bg-zinc-900">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!bisaLanjut}
            className={
              "w-full rounded-xl px-4 py-3 font-bold transition " +
              (bisaLanjut
                ? "bg-green-500 text-black hover:bg-green-400"
                : "bg-black/10 text-black/50 cursor-not-allowed")
            }
          >
            Masuk ke Home
          </button>

          <div className="text-xs text-black/50">
            Data disimpan di browser (localStorage). Bisa di-reset kapan saja.
          </div>
        </form>
      </div>
    </div>
  );
}
