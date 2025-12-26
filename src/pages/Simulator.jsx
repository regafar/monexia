import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulation() {
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState("scenario"); // scenario | feedback | lesson
  const [choice, setChoice] = useState(null);
  const [flags, setFlags] = useState([]);

  const data = useMemo(
    () => ({
      1: {
        badge: "Level 1 • Awareness",
        title: "Pesan Panik yang Terlalu Mendesak",
        intro:
          "Situasi klasik. Pesan datang tiba-tiba, bahasanya singkat, nadanya mengancam. Banyak korban jatuh karena refleks ingin cepat beres.",
        channel: "SMS",
        sender: "BCA-INFO",
        message: `⚠️ PEMBERITAHUAN KEAMANAN ⚠️

Akun BCA Anda terdeteksi aktivitas tidak wajar.
Jika tidak segera diverifikasi, akun akan DIBLOKIR otomatis.

Silakan klik link berikut untuk verifikasi:
http://bca-verifikasi-akun.co/login

BCA`,
        actions: ["Abaikan", "Klik Link"],
        correct: "Abaikan",
        feedback: {
          right:
            "Benar. Bank tidak pernah mengirim link verifikasi melalui SMS. Nada panik adalah senjata utama penipu.",
          wrong:
            "Di dunia nyata, link seperti ini biasanya langsung mengarah ke situs palsu pencuri data.",
        },
        lesson:
          "Jika pesan membuatmu panik dan terburu-buru, itu sinyal kuat untuk berhenti. Institusi resmi tidak bekerja dengan cara menekan.",
      },
      2: {
        badge: "Level 2 • Analisis",
        title: "Meniru Brand Terkenal dengan Rapi",
        intro:
          "Sekarang pesannya lebih halus. Nama brand dikenal, bahasanya ramah, bahkan ada emoji. Justru di sinilah banyak orang lengah.",
        channel: "WhatsApp",
        sender: "Shopee Indonesia",
        message: `Shopee Care 💬

Halo Kak 👋  
Kami mendeteksi adanya *kendala verifikasi* pada akun Shopee Anda.

📦 Pesanan: SPX-3928471  
Status: *DITAHAN SEMENTARA*

Agar pesanan tidak dibatalkan otomatis, silakan lakukan konfirmasi akun melalui link berikut:
👉 https://shopee-verifikasi-akun.my.id

Jika sudah, abaikan pesan ini.
Terima kasih 🙏`,
        actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
        correct: "Cek Sumber Resmi",
        feedback: {
          right:
            "Keputusan tepat. Kamu memilih verifikasi lewat aplikasi atau website resmi, bukan dari link pesan.",
          wrong:
            "Penipu sering meniru gaya komunikasi brand, lengkap dengan emoji dan istilah internal.",
        },
        lesson:
          "Biasakan buka aplikasi resmi secara manual. Jangan pernah percaya link verifikasi yang dikirim lewat chat.",
      },
      3: {
        badge: "Level 3 • Critical Judgment",
        title: "Phishing Profesional yang Nyaris Sempurna",
        intro:
          "Ini level tertinggi. Email terlihat resmi, bahasanya formal, bahkan tanda tangan perusahaan ada. Sekarang, ketelitianmu diuji.",
        channel: "Email",
        sender: "BCA Customer Service <noreply@bca-support.co.id>",
        message: `Yth. Bapak/Ibu Nasabah,

Kami mendeteksi percobaan login baru pada akun Internet Banking BCA Anda pada:
📅 26 Desember 2025  
📍 Perangkat: Android (Jakarta)

Untuk menjaga keamanan akun Anda, mohon segera melakukan konfirmasi data melalui portal keamanan BCA berikut:
https://klikbca-security.com

⚠️ Perhatian:
Apabila konfirmasi tidak dilakukan dalam waktu 60 menit, maka akses Internet Banking Anda akan kami batasi sementara.

Hormat kami,  
Customer Support  
PT Bank Central Asia Tbk`,
        indicators: [
          "Domain link menyerupai tapi bukan domain resmi",
          "Tekanan waktu (60 menit)",
          "Ancaman pembatasan layanan",
          "Alamat email terlihat profesional",
        ],
        correctIndicators: [
          "Domain link menyerupai tapi bukan domain resmi",
          "Tekanan waktu (60 menit)",
        ],
        actions: ["Lanjutkan", "Batalkan"],
        correct: "Batalkan",
        feedback: {
          right:
            "Sangat baik. Kamu tidak terpancing walau pesannya terlihat sangat profesional.",
          wrong:
            "Phishing tingkat lanjut memang dirancang menyerupai email asli. Satu klik bisa fatal.",
        },
        lesson:
          "Email resmi tidak akan meminta konfirmasi data melalui link acak. Saat ragu, hubungi bank lewat nomor resmi.",
      },
    }),
    []
  );

  const current = data[level];

  const toggleFlag = (f) => {
    setFlags((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const flagsValid =
    level === 3 &&
    flags.length === 2 &&
    flags.every((f) => current.correctIndicators.includes(f));

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-6 md:p-10 space-y-10">
      {/* Intro */}
      <div className="max-w-3xl">
        <span className="inline-block bg-emerald-600 text-white text-xs px-4 py-1 rounded-full mb-4">
          {current.badge}
        </span>
        <h2 className="text-3xl font-bold text-slate-900">
          {current.title}
        </h2>
        <p className="text-slate-600 mt-3 leading-relaxed">
          {current.intro}
        </p>
      </div>

      {/* Scenario */}
      {phase === "scenario" && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-3xl">
          <div>
            <p className="text-xs text-slate-500 mb-2">
              Simulasi Pesan • {current.channel}
            </p>
            <div className="rounded-xl border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-3">
                Dari: {current.sender}
              </p>
              <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed font-sans">
                {current.message}
              </pre>
            </div>
          </div>

          {/* Indicators */}
          {level === 3 && (
            <div>
              <p className="font-semibold text-slate-800 mb-3">
                Tandai <span className="text-emerald-600">2 hal</span> yang menurutmu mencurigakan:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {current.indicators.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleFlag(i)}
                    className={`px-4 py-3 rounded-lg text-left text-sm border transition ${
                      flags.includes(i)
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

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {current.actions.map((a) => (
              <button
                key={a}
                disabled={level === 3 && a === "Lanjutkan" && !flagsValid}
                onClick={() => {
                  setChoice(a);
                  setPhase("feedback");
                }}
                className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 text-white disabled:bg-slate-300"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {phase === "feedback" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Refleksi Singkat
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {choice === current.correct
              ? current.feedback.right
              : current.feedback.wrong}
          </p>
          <button
            onClick={() => setPhase("lesson")}
            className="mt-2 px-5 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjutkan
          </button>
        </div>
      )}

      {/* Lesson */}
      {phase === "lesson" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-3xl space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">
            Catatan Penting
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {current.lesson}
          </p>

          {level < 3 ? (
            <button
              onClick={() => {
                setLevel(level + 1);
                setPhase("scenario");
                setChoice(null);
                setFlags([]);
              }}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Lanjut ke Level Berikutnya
            </button>
          ) : (
            <p className="font-semibold text-emerald-700">
              Simulasi selesai. Ingat: penipu menang saat kita bereaksi, bukan saat kita berpikir.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
