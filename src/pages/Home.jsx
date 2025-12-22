import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import SecondaryButton from "../components/ui/SecondaryButton";
import PrimaryButton from "../components/ui/PrimaryButton";

function FeatureCard({ icon, title, desc, cta, onClick }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl">
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-700">
            {desc}
          </div>

          <div className="mt-4">
            <SecondaryButton onClick={onClick}>{cta}</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const nav = useNavigate();

  // Ambil nama dari onboarding
  const [nama, setNama] = useState("");

  // State untuk video
  const [videoID, setVideoID] = useState("5RHmGwAoY88"); // Default video ID

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rr_onboarding");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name) {
          setNama(parsed.name);
        }
      }
    } catch (e) {
      // diamkan jika data rusak
    }

    // Load video ID dari localStorage jika ada
    try {
      const savedVideo = localStorage.getItem("monexia_video_id");
      if (savedVideo) {
        setVideoID(savedVideo);
      }
    } catch (e) {
      // diamkan jika error
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative max-w-3xl">
          {nama ? (
            <div className="mb-2 text-sm font-semibold text-green-700">
              Selamat datang, {nama} di Monexia
            </div>
          ) : null}

          <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
            Platform Edukasi Fintech
          </div>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Belajar fintech dengan cara yang aman dan terarah
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Monexia membantu kamu memahami layanan keuangan digital melalui
            pembelajaran bertahap, simulasi anti-penipuan, evaluasi pemahaman,
            perencanaan keuangan sederhana, dan panduan pelaporan resmi.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton onClick={() => nav("/modul")}>
              Mulai dari Modul
            </PrimaryButton>
            <SecondaryButton onClick={() => nav("/simulasi")}>
              Coba Simulasi
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* PUSAT PELAPORAN — DIHIGHLIGHT & TERPISAH */}
      <div className="rounded-3xl border border-green-300 bg-green-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="text-sm font-extrabold text-green-700">
              Pusat Pelaporan Resmi
            </div>
            <div className="mt-1 text-xl font-extrabold text-slate-900">
              Jadi korban penipuan transaksi?
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Ketahui langkah aman dan jalur resmi untuk melaporkan penipuan
              transaksi keuangan. Panduan ini dibuat agar kamu tidak panik dan
              tidak salah langkah.
            </p>
          </div>

          <div>
            <PrimaryButton onClick={() => nav("/lapor")}>
              Buka Pusat Pelaporan
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* MENU PEMBELAJARAN */}
      <Card
        title="Menu Pembelajaran"
        desc="Pilih fitur sesuai kebutuhan. Semua konten bersifat edukatif dan preventif."
      >
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <FeatureCard
            icon="📚"
            title="Modul Pembelajaran"
            desc="Belajar fintech secara bertahap per subbab, lengkap dengan navigasi dan mini kuis di akhir modul."
            cta="Buka Modul"
            onClick={() => nav("/modul")}
          />

          <FeatureCard
            icon="🛡️"
            title="Simulasi Anti-Phishing"
            desc="Latihan Level 1–3 untuk mengenali penipuan digital dari SMS, email, WhatsApp, dan website palsu."
            cta="Mulai Simulasi"
            onClick={() => nav("/simulasi")}
          />

          <FeatureCard
            icon="✅"
            title="Kuis Evaluasi"
            desc="Uji pemahaman melalui 15 pertanyaan. Hasil ditampilkan dalam skor skala 1–100."
            cta="Mulai Kuis"
            onClick={() => nav("/kuis")}
          />

          <FeatureCard
            icon="🧾"
            title="Rencana Keuangan"
            desc="Atur pendapatan dan pengeluaran. Ringkasan anggaran otomatis menyesuaikan angka yang kamu masukkan."
            cta="Buka Rencana Keuangan"
            onClick={() => nav("/planner")}
          />
        </div>
      </Card>

      {/* VIDEO EDUKASI - UPDATED WITH WORKING EMBED */}
      <Card
        title="Video Edukasi"
        desc="Bagian ini disediakan untuk konten video. Kamu bisa menempelkan iframe kapan saja."
      >
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-2xl">
            {videoID ? (
              <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-sm">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoID}?rel=0`}
                    title="Video Pembelajaran Monexia"
                    className="absolute left-0 top-0 h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full rounded-3xl border border-slate-200 bg-slate-50 flex items-center justify-center text-sm text-slate-500">
                Placeholder Video
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
