import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import SecondaryButton from "../components/ui/SecondaryButton";
import PrimaryButton from "../components/ui/PrimaryButton";

// 👉 TAMBAHAN IMPORT GAMBAR INFOGRAFIS
import InfografisImg from "../../assets/infografis.png";

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

  const [nama, setNama] = useState("");
  const [videoID, setVideoID] = useState("epebQIryA1c");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rr_onboarding");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name) {
          setNama(parsed.name);
        }
      }
    } catch (e) {}

    try {
      const savedVideo = localStorage.getItem("MoneEdu_video_id");
      if (savedVideo) {
        setVideoID(savedVideo);
      }
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      {nama ? (
        <div className="rounded-3xl border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-2xl">
              👋
            </div>
            <div>
              <div className="text-sm font-semibold text-green-700">
                Selamat datang!
              </div>
              <div className="text-xl font-extrabold text-slate-900">
                {nama}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
            Platform Edukasi Fintech
          </div>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Belajar Fintech dengan Cara yang Aman dan Terarah
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            MonEdu membantu kamu memahami layanan keuangan digital melalui
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

      {/* PUSAT PELAPORAN */}
      <div className="rounded-3xl border border-green-300 bg-green-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="text-sm font-extrabold text-green-700">
              Pusat Pelaporan Resmi
            </div>
            <div className="mt-1 text-xl font-extrabold text-slate-900">
              Jadi Korban Penipuan Transaksi?
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Ketahui langkah aman dan jalur resmi untuk melaporkan penipuan
              transaksi keuangan.
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
            desc="Belajar fintech secara bertahap."
            cta="Buka Modul"
            onClick={() => nav("/modul")}
          />

          <FeatureCard
            icon="🛡️"
            title="Simulasi Anti-Phishing"
            desc="Latihan mengenali penipuan digital."
            cta="Mulai Simulasi"
            onClick={() => nav("/simulasi")}
          />

          <FeatureCard
            icon="✅"
            title="Kuis Evaluasi"
            desc="Uji pemahaman kamu."
            cta="Mulai Kuis"
            onClick={() => nav("/kuis")}
          />

          <FeatureCard
            icon="🧾"
            title="Rencana Keuangan"
            desc="Atur pendapatan dan pengeluaran."
            cta="Buka Rencana Keuangan"
            onClick={() => nav("/planner")}
          />
        </div>
      </Card>

      {/* 👉 INFOGRAFIS (KOMPONEN BARU, DI ATAS VIDEO) */}
      <Card
        title="Infografis"
        desc="Ringkasan visual edukasi fintech untuk memudahkan pemahaman."
      >
        <div className="mt-4 flex justify-center">
          <img
            src={InfografisImg}
            alt="Infografis Edukasi Fintech"
            className="w-full max-w-3xl rounded-2xl border border-slate-200 shadow-sm"
          />
        </div>
      </Card>

      {/* VIDEO EDUKASI */}
      <Card
        title="Video Edukasi"
        desc="Berikut adalah vidio mengenai edukasi fintech."
      >
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-2xl">
            {videoID ? (
              <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-sm">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoID}?rel=0`}
                    title="Video Pembelajaran MoneEdu"
                    className="absolute left-0 top-0 h-full w-full"
                    frameBorder="0"
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
