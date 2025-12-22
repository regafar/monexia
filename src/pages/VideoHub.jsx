import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import SecondaryButton from "../components/ui/SecondaryButton";

export default function VideoHub() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-500">Monexia</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">
              Video Pembelajaran
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Video edukasi ditampilkan dari YouTube.
            </div>
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => nav(-1)}>← Kembali</SecondaryButton>
            <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
          </div>
        </div>
      </div>

      <Card title="Video Edukasi" desc="Bagian ini disediakan untuk konten video.">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="w-full
