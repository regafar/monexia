import React, { useState, useMemo } from "react";

export default function AntiPhishingInteractivePage() {
  const [level, setLevel] = useState(1);
  const [stage, setStage] = useState("scenario"); 
  // scenario | consequence | insight | warning
  const [action, setAction] = useState(null);
  const [marked, setMarked] = useState([]);

  const levels = useMemo(() => ({
    1: {
      tag: "LEVEL 1 · AWARENESS",
      title: "Refleks Panik yang Berbahaya",
      narrative:
        "Bayangkan ini pagi hari. Kamu belum sepenuhnya sadar. Ponselmu bergetar. Pesannya terlihat serius.",
      channel: "SMS",
      sender: "BANK ALERT",
      message: `⚠️ NOTIFIKASI KEAMANAN ⚠️

Kami mendeteksi aktivitas mencurigakan pada akun Anda.

Jika tidak segera dilakukan verifikasi, akses akun akan kami NONAKTIFKAN hari ini.

👉 http://bank-aman-verifikasi.co

Terima kasih.`,
      actions: ["Abaikan", "Klik Link"],
      correct: "Abaikan",
      consequences: {
        Abaikan: {
          tone: "safe",
          title: "Kamu Berhenti Sejenak 👏",
          desc:
            "Kamu tidak terpancing rasa panik. Ini refleks yang sangat penting di dunia digital.",
        },
        "Klik Link": {
          tone: "danger",
          title: "Kamu Terjebak Tekanan ⚠️",
          desc:
            "Link tersebut membawa ke situs palsu. Jika ini nyata, data loginmu bisa langsung dicuri.",
        },
      },
      lesson:
        "Pesan dengan nada mengancam dan link acak adalah ciri klasik phishing tingkat dasar.",
    },
    2: {
      tag: "LEVEL 2 · ANALISIS",
      title: "Pesan Rapi yang Terlihat Meyakinkan",
      narrative:
        "Sekarang pesannya lebih halus. Ada nama brand. Ada konteks transaksi. Banyak orang lengah di tahap ini.",
      channel: "WhatsApp",
      sender: "Shopee Indonesia ✔️",
      message: `Shopee Care 💬

Halo Kak,
Kami mendeteksi adanya kendala pada akun Shopee Anda.

📦 Pesanan: 88219301  
Status: *DITUNDA*

Silakan lakukan verifikasi agar pesanan tidak dibatalkan:
https://shopee-verifikasi-id.my.id

Jika sudah, abaikan pesan ini. Terima kasih.`,
      actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
      correct: "Cek Sumber Resmi",
      consequences: {
        Abaikan: {
          tone: "neutral",
          title: "Kamu Aman, Tapi Bisa Lebih Baik",
          desc:
            "Mengabaikan itu aman. Tapi kamu bisa melangkah lebih jauh dengan mengecek kebenarannya.",
        },
        "Cek Sumber Resmi": {
          tone: "safe",
          title: "Keputusan Paling Ideal ✅",
          desc:
            "Kamu memilih membuka aplikasi Shopee langsung. Tidak ada notifikasi apa pun di sana.",
        },
        "Klik Link": {
          tone: "danger",
          title: "Tampilan Meyakinkan, Risiko Besar",
          desc:
            "Situs terlihat mirip Shopee. Form login palsu siap mencuri akunmu.",
        },
      },
      lesson:
        "Penipu modern meniru gaya bahasa, emoji, dan struktur pesan brand resmi.",
    },
    3: {
      tag: "LEVEL 3 · CRITICAL JUDGMENT",
      title: "Phishing Profesional di Bawah Tekanan",
      narrative:
        "Email ini terlihat sangat resmi. Bahkan ada detail lokasi dan waktu. Sekarang kendalikan emosimu.",
      channel: "Email",
      sender: "BCA Customer Service <noreply@bca-support.co.id>",
      message: `Yth. Nasabah,

Kami mendeteksi login baru pada akun Internet Banking Anda.

📅 26 Desember 2025  
📍 Perangkat: Android – Jakarta

Mohon segera lakukan konfirmasi melalui portal keamanan berikut:
https://klikbca-security.com

⚠️ Jika tidak dikonfirmasi dalam 60 menit, akses akan dibatasi sementara.

Hormat kami,  
PT Bank Central Asia Tbk`,
      indicators: [
        "Domain website tidak resmi",
        "Tekanan waktu ekstrem",
        "Ancaman pembatasan layanan",
        "Bahasa sangat formal dan rapi",
      ],
      correctIndicators: [
        "Domain website tidak resmi",
        "Tekanan waktu ekstrem",
      ],
      actions: ["Lanjutkan", "Batalkan"],
      correct: "Batalkan",
      consequences: {
        Batalkan: {
          tone: "safe",
          title: "Kamu Menguasai Situasi 🧠",
          desc:
            "Kamu tidak terburu-buru. Kamu memilih aman meski terlihat sangat meyakinkan.",
        },
        Lanjutkan: {
          tone: "danger",
          title: "Tekanan Waktu Menang",
          desc:
            "Inilah tujuan utama phishing tingkat lanjut: membuatmu panik dan lupa berpikir.",
        },
      },
      lesson:
        "Email resmi tidak pernah meminta verifikasi lewat link acak. Tekanan waktu adalah red flag besar.",
    },
  }), []);

  const current = levels[level];

  const toggleMark = (item) => {
    setMarked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const canProceedLevel3 =
    level === 3 &&
    marked.length === 2 &&
    marked.every((m) => current.correctIndicators.includes(m));

  const handleAction = (a) => {
    setAction(a);
    setStage("consequence");
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-6 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <span className="inline-block bg-emerald-600 text-white text-xs px-4 py-1 rounded-full mb-4">
          {current.tag}
        </span>
        <h2 className="text-3xl font-bold text-slate-900">{current.title}</h2>
        <p className="text-slate-600 mt-3 max-w-2xl">{current.narrative}</p>
      </div>

      {/* Scenario */}
      {stage === "scenario" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 max-w-3xl">
          <div className="border rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-2">
              {current.channel} · {current.sender}
            </p>
            <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
              {current.message}
            </pre>
          </div>

          {level === 3 && (
            <div>
              <p className="font-semibold text-slate-800 mb-2">
                Tandai <span className="text-emerald-600">2 indikator</span> yang mencurigakan:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {current.indicators.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleMark(i)}
                    className={`px-4 py-3 rounded-lg border text-left text-sm transition ${
                      marked.includes(i)
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {current.actions.map((a) => (
              <button
                key={a}
                disabled={level === 3 && a === "Lanjutkan" && !canProceedLevel3}
                onClick={() => handleAction(a)}
                className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 text-white disabled:bg-slate-300"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Consequence */}
      {stage === "consequence" && (
        <div
          className={`rounded-2xl p-6 max-w-3xl space-y-4 ${
            current.consequences[action].tone === "danger"
              ? "bg-red-50 border border-red-200"
              : current.consequences[action].tone === "safe"
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}
        >
          <h3 className="text-xl font-bold text-slate-900">
            {current.consequences[action].title}
          </h3>
          <p className="text-slate-700">
            {current.consequences[action].desc}
          </p>

          {/* Inspired warning box */}
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-700 mb-2">
              ⚠️ Penting untuk Diingat
            </p>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              <li>Tidak ada pihak resmi yang meminta OTP, PIN, atau password</li>
              <li>Link dari pesan pribadi wajib dicurigai</li>
              <li>Tekanan waktu adalah taktik manipulasi</li>
            </ul>
          </div>

          <button
            onClick={() => setStage("insight")}
            className="mt-4 px-5 py-2 rounded-lg bg-slate-900 text-white"
          >
            Pelajari Alasannya
          </button>
        </div>
      )}

      {/* Insight */}
      {stage === "insight" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Insight Penting
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {current.lesson}
          </p>

          {level < 3 ? (
            <button
              onClick={() => {
                setLevel(level + 1);
                setStage("scenario");
                setAction(null);
                setMarked([]);
              }}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Lanjut ke Level Berikutnya
            </button>
          ) : (
            <p className="font-semibold text-emerald-700">
              Simulasi selesai. Di dunia nyata, jeda 10 detik bisa menyelamatkanmu.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
