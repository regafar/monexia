import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationV2() {
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0); // 0 atau 1
  const [stage, setStage] = useState("scenario"); 
  // scenario | consequence | explanation
  const [action, setAction] = useState(null);

  const levels = useMemo(() => ({
    1: {
      label: "LEVEL 1 · DASAR (AWARENESS)",
      goal:
        "Melatih refleks awal: tidak panik dan tidak asal klik ketika menerima pesan mencurigakan.",
      cases: [
        {
          title: "Akun Terancam Diblokir",
          channel: "SMS",
          sender: "BANK ALERT",
          message: `⚠️ NOTIFIKASI KEAMANAN ⚠️

Akun Anda terdeteksi aktivitas tidak wajar.
Jika tidak segera diverifikasi, akun akan DIBLOKIR hari ini.

👉 http://bank-verifikasi-akun.co

BANK`,
          correct: "Abaikan",
          consequences: {
            Abaikan: {
              verdict: "BENAR",
              narrative:
                "Kamu berhenti sejenak dan tidak bereaksi spontan. Ini keputusan yang sangat tepat. Pesan ini sengaja dibuat singkat dan menekan agar korban langsung klik tanpa berpikir.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Begitu link diklik, kamu diarahkan ke halaman palsu yang meniru tampilan bank. Jika ini nyata, username dan password-mu langsung dicuri.",
            },
          },
          solution:
            "Bank tidak pernah mengirim link verifikasi via SMS. Jika ragu, abaikan pesan dan hubungi call center resmi dari website bank.",
        },
        {
          title: "Hadiah Undian Tidak Masuk Akal",
          channel: "SMS",
          sender: "INFO-UNDIAN",
          message: `Selamat! Nomor Anda memenangkan hadiah Rp25.000.000
dari program loyalitas pelanggan.

Konfirmasi sekarang sebelum hangus:
http://klaim-hadiah-nasabah.id`,
          correct: "Abaikan",
          consequences: {
            Abaikan: {
              verdict: "BENAR",
              narrative:
                "Kamu tidak tergoda iming-iming hadiah. Pesan seperti ini menargetkan emosi senang dan serakah.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Link mengarah ke form palsu yang meminta data pribadi. Banyak korban kehilangan uang setelah tergiur hadiah fiktif.",
            },
          },
          solution:
            "Jika kamu tidak pernah ikut undian apa pun, abaikan. Program resmi selalu diumumkan di website atau aplikasi resmi.",
        },
      ],
    },

    2: {
      label: "LEVEL 2 · MENENGAH (ANALISIS)",
      goal:
        "Membiasakan diri untuk memverifikasi informasi sebelum mengambil tindakan.",
      cases: [
        {
          title: "Pesanan Ditahan Sementara",
          channel: "WhatsApp",
          sender: "Shopee Indonesia ✔️",
          message: `Shopee Care 💬

Halo Kak 👋  
Kami mendeteksi kendala verifikasi pada akun Anda.

📦 Pesanan: 88219301  
Status: *DITAHAN*

Silakan verifikasi agar pesanan tidak dibatalkan:
https://shopee-verifikasi-id.my.id

Terima kasih.`,
          correct: "Cek Sumber Resmi",
          consequences: {
            Abaikan: {
              verdict: "CUKUP AMAN",
              narrative:
                "Mengabaikan membuatmu aman, tapi kamu melewatkan kesempatan untuk memastikan apakah ini benar atau tidak.",
            },
            "Cek Sumber Resmi": {
              verdict: "BENAR",
              narrative:
                "Kamu membuka aplikasi Shopee langsung dan tidak menemukan notifikasi apa pun. Ini langkah paling ideal.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Link membawa ke website palsu dengan tampilan mirip Shopee. Login di sini berarti menyerahkan akunmu.",
            },
          },
          solution:
            "Selalu buka aplikasi atau website resmi secara manual, bukan dari link chat.",
        },
        {
          title: "Permintaan Verifikasi Akun Email",
          channel: "Email",
          sender: "Google Support <security@google-verifikasi.co>",
          message: `Kami mendeteksi aktivitas login tidak biasa pada akun Gmail Anda.

Segera amankan akun dengan melakukan verifikasi:
https://gmail-security-check.my.id

Jika tidak diverifikasi, akun akan dibatasi.`,
          correct: "Cek Sumber Resmi",
          consequences: {
            Abaikan: {
              verdict: "CUKUP AMAN",
              narrative:
                "Kamu terhindar dari bahaya, tetapi belum memastikan kondisi akunmu.",
            },
            "Cek Sumber Resmi": {
              verdict: "BENAR",
              narrative:
                "Kamu login ke akun Google lewat website resmi dan mengecek keamanan akun secara langsung.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Email ini menggunakan domain palsu. Klik link berarti menyerahkan akses email.",
            },
          },
          solution:
            "Periksa alamat email pengirim dan domain link. Google tidak pernah memakai domain acak.",
        },
      ],
    },

    3: {
      label: "LEVEL 3 · LANJUTAN (CRITICAL JUDGMENT)",
      goal:
        "Melatih ketelitian dan kontrol emosi saat menghadapi pesan yang sangat realistis.",
      cases: [
        {
          title: "Login Baru Internet Banking",
          channel: "Email",
          sender: "BCA Customer Service <noreply@bca-support.co.id>",
          message: `Yth. Nasabah,

Kami mendeteksi login baru pada akun Internet Banking Anda.

📍 Perangkat: Android – Jakarta  
⏰ Waktu: 26 Desember 2025

Segera lakukan konfirmasi melalui portal berikut:
https://klikbca-security.com

Jika tidak dikonfirmasi dalam 60 menit, akses akan dibatasi.

Hormat kami,  
PT Bank Central Asia Tbk`,
          correct: "Batalkan",
          consequences: {
            Batalkan: {
              verdict: "BENAR",
              narrative:
                "Kamu tidak panik meski pesannya terlihat sangat resmi. Ini keputusan yang menyelamatkan.",
            },
            Lanjutkan: {
              verdict: "SALAH",
              narrative:
                "Tekanan waktu berhasil memanipulasi keputusanmu. Inilah pola phishing tingkat lanjut.",
            },
          },
          solution:
            "Bank tidak pernah meminta verifikasi lewat link. Hubungi call center resmi.",
        },
        {
          title: "Permintaan Update Data Nasabah",
          channel: "WhatsApp",
          sender: "CS Bank Nasional",
          message: `Yth. Nasabah,

Sehubungan dengan pembaruan sistem, kami membutuhkan konfirmasi data Anda hari ini.

Mohon isi formulir berikut:
https://update-data-nasabah.site

Terima kasih atas kerja samanya.`,
          correct: "Batalkan",
          consequences: {
            Batalkan: {
              verdict: "BENAR",
              narrative:
                "Kamu sadar bahwa pembaruan data tidak pernah dilakukan via WhatsApp.",
            },
            Lanjutkan: {
              verdict: "SALAH",
              narrative:
                "Form ini digunakan untuk mengumpulkan data sensitif nasabah.",
            },
          },
          solution:
            "Pembaruan data hanya dilakukan di kantor cabang atau aplikasi resmi.",
        },
      ],
    },
  }), []);

  const currentLevel = levels[level];
  const currentCase = currentLevel.cases[caseIndex];

  const handleAction = (a) => {
    setAction(a);
    setStage("consequence");
  };

  const nextCaseOrLevel = () => {
    if (caseIndex < 1) {
      setCaseIndex(caseIndex + 1);
      setStage("scenario");
      setAction(null);
    } else if (level < 3) {
      setLevel(level + 1);
      setCaseIndex(0);
      setStage("scenario");
      setAction(null);
    } else {
      setStage("done");
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-6 md:p-10 space-y-10">
      <div>
        <span className="inline-block bg-emerald-600 text-white text-xs px-4 py-1 rounded-full mb-3">
          {currentLevel.label}
        </span>
        <h2 className="text-3xl font-bold text-slate-900">
          {currentCase.title}
        </h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          {currentLevel.goal}
        </p>
      </div>

      {stage === "scenario" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl space-y-6">
          <div className="bg-slate-50 border rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">
              {currentCase.channel} · {currentCase.sender}
            </p>
            <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
              {currentCase.message}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.keys(currentCase.consequences).map((a) => (
              <button
                key={a}
                onClick={() => handleAction(a)}
                className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 text-white"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === "consequence" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Keputusan Kamu:{" "}
            <span
              className={`${
                currentCase.consequences[action].verdict === "BENAR"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {currentCase.consequences[action].verdict}
            </span>
          </h3>
          <p className="text-slate-700">
            {currentCase.consequences[action].narrative}
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="font-semibold mb-1">Solusi Aman:</p>
            <p className="text-sm text-slate-700">
              {currentCase.solution}
            </p>
          </div>

          <button
            onClick={nextCaseOrLevel}
            className="mt-2 px-5 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjut
          </button>
        </div>
      )}

      {stage === "done" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 max-w-3xl">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Kamu sudah melewati semua level. Ingat: berhenti, berpikir,
            verifikasi. Penipu menang saat kita panik.
          </p>
        </div>
      )}
    </div>
  );
}
