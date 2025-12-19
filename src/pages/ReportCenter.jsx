import React from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { safetyReportLinks } from "../data/content";

function Step({ n, title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-green-600 text-sm font-extrabold text-white">
          {n}
        </div>
        <div>
          <div className="text-sm font-extrabold">{title}</div>
          <div className="mt-1 text-xs text-slate-600">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function ReportCenter() {
  const link = safetyReportLinks[0];

  return (
    <div className="space-y-6">
      <Card
        title="Kalau Sudah Jadi Korban Penipuan"
        desc="Halaman ini fokus ke langkah praktis dan jalur resmi. Ini bukan menyalahkan korban. Ini bantu kamu cepat bertindak."
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <PrimaryButton onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}>
            Buka {link.title}
          </PrimaryButton>
          <SecondaryButton onClick={() => navigator.clipboard.writeText(link.href).then(() => alert("Link disalin."))}>
            Salin Link
          </SecondaryButton>
        </div>

        <div className="mt-3 rounded-3xl bg-green-50 p-4 text-xs font-bold text-green-800">
          Link wajib (preventif + penanganan): https://iasc.ojk.go.id/
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Step n="1" title="Amankan akun dulu" desc="Ganti password, aktifkan 2FA, dan amankan email utama. Jangan bagikan OTP/PIN." />
        <Step n="2" title="Kumpulkan bukti" desc="Screenshot chat, bukti transfer, nomor rekening, link, nama akun, dan kronologi singkat." />
        <Step n="3" title="Hubungi kanal resmi layanan" desc="Masuk lewat aplikasi/website resmi penyedia layanan. Hindari nomor dari DM/komentar." />
        <Step n="4" title="Laporkan lewat portal resmi" desc="Gunakan jalur resmi sektor jasa keuangan melalui IASC OJK agar penanganan terarah." />
      </div>

      <Card
        title="Centang Interaktif"
        desc="Centang yang sudah anda lakukan"
      >
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Saya sudah ganti password email utama",
            "Saya sudah cek mutasi/riwayat transaksi",
            "Saya sudah simpan bukti transfer dan chat",
            "Saya sudah cek aplikasi/website resmi penyedia",
            "Saya sudah lapor lewat kanal resmi",
            "Saya sudah edukasi keluarga/teman soal OTP"
          ].map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3 hover:bg-slate-50">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm font-semibold text-slate-700">{t}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
