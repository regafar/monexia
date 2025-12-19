import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import SecondaryButton from "../components/ui/SecondaryButton";
import { modules } from "../data/content";

export default function Modules() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      {/* HANYA WARNA: background putih + hijau (tanpa ubah konten/struktur modul) */}
      <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-white to-green-50 p-5">
        <Card title="Modul Pembelajaran" desc="Pilih modul untuk mulai belajar secara bertahap.">
          <div className="mt-5 grid gap-4">
            {modules.map((m) => (
              <div
                key={m.slug}
                className="rounded-3xl border border-green-200 bg-white shadow-sm"
              >
                {/* aksen hijau tipis, tidak mengubah isi */}
                <div className="h-2 rounded-t-3xl bg-gradient-to-r from-green-500 to-emerald-400" />

                <div className="p-4">
                  {/* JUDUL MODUL TIDAK DIUBAH */}
                  <Card title={m.title} desc={m.subtitle}>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold text-slate-500">
                        Klik untuk membuka modul
                      </div>

                      <SecondaryButton onClick={() => nav(`/modul/${m.slug}`)}>
                        Buka
                      </SecondaryButton>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
