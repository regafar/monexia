import React from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { safetyReportLinks } from "../data/content";

function LangkahPenanganan({ nomor, judul, deskripsi, tips }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-300">
      {/* Nomor Langkah */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 opacity-50" />
      
      <div className="relative flex gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-2xl font-bold text-white shadow-lg">
          {nomor}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900">{judul}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {deskripsi}
          </p>
          
          {tips && (
            <div className="mt-3 rounded-lg bg-green-50 p-3 border border-green-200">
              <div className="flex items-start gap-2">
                <span className="text-sm">💡</span>
                <p className="text-xs font-medium text-green-800">{tips}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PanduanCepat({ icon, judul, deskripsi }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 transition-all hover:border-green-300 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xl">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{judul}</h4>
          <p className="mt-1 text-xs text-slate-600">{deskripsi}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReportCenter() {
  const link = safetyReportLinks[0];

  const langkahPenanganan = [
    {
      nomor: 1,
      judul: "Amankan Akun Segera",
      deskripsi: "Langkah pertama yang harus dilakukan adalah mengamankan semua akun yang terkait dengan transaksi keuangan Anda.",
      tips: "Ganti password dengan kombinasi yang kuat, aktifkan autentikasi dua faktor (2FA), dan pastikan email utama Anda aman."
    },
    {
      nomor: 2,
      judul: "Kumpulkan Bukti Transaksi",
      deskripsi: "Dokumentasikan semua bukti yang berhubungan dengan penipuan untuk mempermudah proses pelaporan.",
      tips: "Screenshot percakapan, bukti transfer, nomor rekening pelaku, link website palsu, dan catat kronologi kejadian secara detail."
    },
    {
      nomor: 3,
      judul: "Hubungi Layanan Resmi",
      deskripsi: "Segera hubungi penyedia layanan keuangan melalui kanal resmi mereka, bukan dari kontak yang diberikan oleh pihak mencurigakan.",
      tips: "Gunakan aplikasi resmi, website resmi, atau datang langsung ke kantor cabang. Hindari nomor dari DM, komentar, atau pesan tidak dikenal."
    },
    {
      nomor: 4,
      judul: "Laporkan ke Portal Resmi",
      deskripsi: "Laporkan kejadian ke institusi berwenang melalui jalur resmi sektor jasa keuangan untuk penanganan yang tepat.",
      tips: "Gunakan portal IASC OJK untuk pelaporan resmi transaksi keuangan yang mencurigakan atau penipuan finansial."
    }
  ];

  const panduanCepat = [
    {
      icon: "🔒",
      judul: "Jangan Bagikan OTP/PIN",
      deskripsi: "Kode OTP dan PIN adalah kunci akun Anda. Jangan pernah memberikannya kepada siapapun, termasuk yang mengaku petugas."
    },
    {
      icon: "⚠️",
      judul: "Waspadai Link Mencurigakan",
      deskripsi: "Hindari mengklik link dari sumber tidak jelas. Selalu verifikasi keaslian website sebelum memasukkan data pribadi."
    },
    {
      icon: "📞",
      judul: "Verifikasi Kontak Resmi",
      deskripsi: "Gunakan hanya nomor telepon dan email resmi dari website/aplikasi resmi penyedia layanan."
    },
    {
      icon: "👥",
      judul: "Edukasi Orang Terdekat",
      deskripsi: "Bagikan informasi keamanan ini kepada keluarga dan teman agar mereka juga terhindar dari penipuan."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Utama */}
      <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white p-8 shadow-sm">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-emerald-200/30 blur-3xl" />
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-1.5 text-xs font-bold text-white">
            <span>🛡️</span>
            <span>PUSAT PELAPORAN RESMI</span>
          </div>
          
          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Panduan Pelaporan Penipuan Transaksi Keuangan
          </h1>
          
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Jika Anda menjadi korban penipuan transaksi keuangan, jangan panik. Halaman ini memberikan panduan langkah praktis dan jalur resmi untuk melaporkan kejadian dengan tepat dan cepat. Tujuan kami adalah membantu Anda bertindak dengan benar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}>
              <span className="flex items-center gap-2">
                <span>🔗</span>
                <span>Buka {link.title}</span>
              </span>
            </PrimaryButton>
            <SecondaryButton onClick={() => navigator.clipboard.writeText(link.href).then(() => alert("Link berhasil disalin ke clipboard"))}>
              <span className="flex items-center gap-2">
                <span>📋</span>
                <span>Salin Link</span>
              </span>
            </SecondaryButton>
          </div>

          <div className="mt-6 rounded-2xl border border-green-300 bg-white/80 backdrop-blur-sm p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔗</span>
              <div>
                <div className="text-xs font-bold text-green-700 uppercase tracking-wide">Portal Resmi OJK</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  https://iasc.ojk.go.id/
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Portal resmi untuk preventif dan penanganan layanan jasa keuangan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Langkah Penanganan */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Langkah-Langkah Penanganan
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ikuti panduan berikut secara berurutan untuk penanganan yang efektif
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {langkahPenanganan.map((langkah) => (
            <LangkahPenanganan
              key={langkah.nomor}
              nomor={langkah.nomor}
              judul={langkah.judul}
              deskripsi={langkah.deskripsi}
              tips={langkah.tips}
            />
          ))}
        </div>
      </div>

      {/* Panduan Pencegahan */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Tips Pencegahan Penipuan
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Lindungi diri Anda dan orang terdekat dengan mengikuti panduan keamanan berikut
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {panduanCepat.map((panduan, idx) => (
            <PanduanCepat
              key={idx}
              icon={panduan.icon}
              judul={panduan.judul}
              deskripsi={panduan.deskripsi}
            />
          ))}
        </div>
      </div>

      {/* Peringatan Penting */}
      <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-2xl">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-900">
              Penting untuk Diingat
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-red-800">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Tidak ada petugas resmi yang akan meminta OTP, PIN, atau password Anda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Jangan pernah melakukan transaksi atau transfer atas instruksi dari orang yang tidak Anda kenal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Selalu verifikasi keaslian website, email, dan nomor telepon sebelum memberikan informasi pribadi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Jika ragu, hubungi langsung penyedia layanan melalui kanal resmi mereka</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
