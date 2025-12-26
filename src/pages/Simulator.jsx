import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationPage() {
  const [level, setLevel] = useState(1);
  const [step, setStep] = useState("scenario"); // scenario | feedback | lesson
  const [selectedAction, setSelectedAction] = useState(null);
  const [markedIndicators, setMarkedIndicators] = useState([]);

  const scenarios = useMemo(
    () => ({
      1: {
        title: "Level 1 — Dasar (Awareness)",
        intro:
          "Bayangkan kamu baru saja bangun tidur. Ponselmu berbunyi. Ada pesan masuk. Terlihat penting. Tapi… apakah benar?",
        message: {
          source: "SMS",
          from: "BANK-INFO",
          content:
            "Peringatan! Akun Anda terdeteksi aktivitas tidak wajar. Klik link berikut untuk verifikasi agar akun tidak diblokir: http://bank-verifikasi-akun.co",
        },
        actions: ["Abaikan", "Klik Link"],
        correctAction: "Abaikan",
        feedback: {
          correct:
            "Pilihan yang aman. Pesan ini jelas memancing rasa panik agar kamu langsung klik tanpa berpikir.",
          wrong:
            "Di dunia nyata, satu klik bisa berujung pencurian data. Refleks aman dimulai dari tidak reaktif.",
        },
        lesson:
          "Phishing dasar biasanya terlihat dari nada panik, link aneh, dan pengirim yang tidak jelas. Jika ragu, berhenti dulu.",
      },
      2: {
        title: "Level 2 — Menengah (Analisis)",
        intro:
          "Sekarang skenarionya lebih rapi. Bahasanya sopan. Logonya meyakinkan. Tapi justru di sini banyak orang lengah.",
        message: {
          source: "WhatsApp",
          from: "Shopee Care",
          content:
            "Halo Kak 👋 Kami dari Shopee. Ada transaksi yang tertunda karena verifikasi akun diperlukan. Silakan cek detailnya melalui tautan berikut agar pesanan tidak dibatalkan: https://shopee-id-verifikasi.my.id",
        },
        actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
        correctAction: "Cek Sumber Resmi",
        feedback: {
          correct:
            "Langkah cerdas. Kamu tidak langsung percaya dan memilih verifikasi lewat jalur resmi.",
          wrong:
            "Pesan seperti ini sering meniru gaya komunikasi brand terkenal. Tanpa cek sumber, risikonya besar.",
        },
        lesson:
          "Biasakan cek aplikasi resmi, website asli, atau kontak layanan pelanggan yang kamu cari sendiri — bukan dari pesan.",
      },
      3: {
        title: "Level 3 — Lanjutan (Critical Judgment)",
        intro:
          "Ini level tersulit. Pesannya terasa sangat nyata. Bahkan waktunya masuk akal. Sekarang, kendalikan emosi dan amati detail.",
        message: {
          source: "Email",
          from: "noreply@bca-support.co.id",
          content:
            "Yth. Nasabah BCA,\n\nKami mendeteksi percobaan login baru pada akun Anda. Demi keamanan, mohon lakukan konfirmasi data maksimal 1 jam ke depan melalui portal berikut:\n\nhttps://klikbca-security.com\n\nJika tidak dikonfirmasi, akses internet banking akan dibatasi sementara.\n\nHormat kami,\nPT Bank Central Asia Tbk",
        },
        indicators: [
          "Domain link tidak resmi",
          "Batas waktu mendesak",
          "Nada ancaman pembatasan",
          "Alamat email menyerupai resmi",
        ],
        correctIndicators: [
          "Domain link tidak resmi",
          "Batas waktu mendesak",
        ],
        actions: ["Lanjutkan", "Batalkan"],
        correctAction: "Batalkan",
        feedback: {
          correct:
            "Keputusan tepat. Kamu berhasil menahan diri meski pesannya terlihat profesional.",
          wrong:
            "Phishing tingkat lanjut memang dirancang sangat meyakinkan. Kesalahan kecil bisa berdampak besar.",
        },
        lesson:
          "Penipu memanfaatkan tekanan waktu dan kepercayaan pada institusi besar. Justru di kondisi ini, verifikasi manual adalah kunci.",
      },
    }),
    []
  );

  const current = scenarios[level];

  const handleAction = (action) => {
    setSelectedAction(action);
    setStep("feedback");
  };

  const toggleIndicator = (indicator) => {
    setMarkedIndicators((prev) =>
      prev.includes(indicator)
        ? prev.filter((i) => i !== indicator)
        : [...prev, indicator]
    );
  };

  const isIndicatorsCorrect =
    level === 3 &&
    markedIndicators.length === 2 &&
    markedIndicators.every((i) => current.correctIndicators.includes(i));

  return (
    <div className="bg-emerald-50 rounded-3xl p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <span className="inline-block bg-emerald-600 text-white text-sm px-4 py-1 rounded-full mb-4">
          Simulasi Anti-Phishing
        </span>
        <h2 className="text-3xl font-bold text-slate-900">
          {current.title}
        </h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          {current.intro}
        </p>
      </div>

      {/* Scenario */}
      {step === "scenario" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">
              Simulasi Pesan ({current.message.source})
            </p>
            <div className="border rounded-xl p-4 bg-slate-50">
              <p className="text-xs text-slate-500 mb-2">
                Dari: {current.message.from}
              </p>
              <pre className="whitespace-pre-wrap text-slate-800 text-sm">
                {current.message.content}
              </pre>
            </div>
          </div>

          {/* Indicators for Level 3 */}
          {level === 3 && (
            <div>
              <p className="font-medium text-slate-800 mb-2">
                Tandai <span className="font-bold">2 indikator mencurigakan</span> yang kamu temukan:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {current.indicators.map((indicator) => (
                  <button
                    key={indicator}
                    onClick={() => toggleIndicator(indicator)}
                    className={`border rounded-lg px-4 py-2 text-sm text-left ${
                      markedIndicators.includes(indicator)
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200"
                    }`}
                  >
                    {indicator}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {current.actions.map((action) => (
              <button
                key={action}
                disabled={
                  level === 3 && action === "Lanjutkan" && !isIndicatorsCorrect
                }
                onClick={() => handleAction(action)}
                className="px-5 py-2 rounded-lg font-medium bg-emerald-600 text-white disabled:bg-slate-300"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {step === "feedback" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Refleksi
          </h3>
          <p className="text-slate-700">
            {selectedAction === current.correctAction
              ? current.feedback.correct
              : current.feedback.wrong}
          </p>
          <button
            onClick={() => setStep("lesson")}
            className="mt-4 px-5 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjutkan
          </button>
        </div>
      )}

      {/* Lesson */}
      {step === "lesson" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Pelajaran Penting
          </h3>
          <p className="text-slate-700">{current.lesson}</p>
          {level < 3 ? (
            <button
              onClick={() => {
                setLevel(level + 1);
                setStep("scenario");
                setSelectedAction(null);
                setMarkedIndicators([]);
              }}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Lanjut ke Level Berikutnya
            </button>
          ) : (
            <p className="font-medium text-emerald-700">
              Simulasi selesai. Ingat: berhenti, pikirkan, dan verifikasi sebelum bertindak.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
