import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationFinal() {
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState("scenario"); 
  // scenario | result | done
  const [selected, setSelected] = useState([]);

  const levels = useMemo(
    () => ({
      1: {
        label: "LEVEL 1 · DASAR (AWARENESS)",
        goal:
          "Melatih refleks awal agar tidak panik dan tidak asal klik saat menerima pesan mencurigakan.",
        cases: [
          {
            title: "Akun Akan Diblokir Hari Ini",
            channel: "SMS",
            sender: "BANK ALERT",
            message: `⚠️ NOTIFIKASI KEAMANAN ⚠️

Kami mendeteksi aktivitas tidak wajar pada akun Anda.
Jika tidak segera diverifikasi, akun akan DIBLOKIR hari ini.

👉 http://bank-verifikasi-akun.co

BANK`,
            actions: ["Abaikan", "Klik Link"],
            correct: "Abaikan",
            explanation:
              "Pesan ini menggunakan tekanan dan link acak. Bank tidak pernah melakukan verifikasi melalui SMS.",
          },
          {
            title: "Hadiah Undian Pelanggan",
            channel: "SMS",
            sender: "INFO UNDIAN",
            message: `Selamat! Nomor Anda memenangkan hadiah Rp25.000.000.

Segera klaim hadiah sebelum hangus:
http://klaim-hadiah-pelanggan.id`,
            actions: ["Abaikan", "Klik Link"],
            correct: "Abaikan",
            explanation:
              "Jika Anda tidak pernah mengikuti undian, maka pesan ini hampir pasti penipuan.",
          },
        ],
      },

      2: {
        label: "LEVEL 2 · MENENGAH (ANALISIS)",
        goal:
          "Melatih kebiasaan memverifikasi informasi melalui sumber resmi sebelum bertindak.",
        cases: [
          {
            title: "Pesanan Shopee Ditahan",
            channel: "WhatsApp",
            sender: "Shopee Indonesia ✔️",
            message: `Shopee Care 💬

Halo Kak 👋  
Kami mendeteksi kendala verifikasi pada akun Anda.

📦 Pesanan: 88219301  
Status: *DITAHAN*

Silakan lakukan verifikasi:
https://shopee-verifikasi-id.my.id`,
            actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
            correct: "Cek Sumber Resmi",
            explanation:
              "Langkah paling aman adalah membuka aplikasi Shopee langsung, bukan dari link pesan.",
          },
          {
            title: "Peringatan Keamanan Akun Google",
            channel: "Email",
            sender: "Google Security <security@google-verifikasi.co>",
            message: `Kami mendeteksi aktivitas login tidak biasa.

Segera amankan akun:
https://gmail-security-check.my.id`,
            actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
            correct: "Cek Sumber Resmi",
            explanation:
              "Google tidak menggunakan domain verifikasi seperti ini. Selalu cek melalui akun.google.com.",
          },
        ],
      },

      3: {
        label: "LEVEL 3 · LANJUTAN (CRITICAL JUDGMENT)",
        goal:
          "Melatih ketelitian tinggi: mengenali kejanggalan halus pada pesan yang terlihat sangat profesional.",
        cases: [
          {
            title: "Permintaan Update Data Nasabah",
            channel: "WhatsApp",
            sender: "CS Bank Nasional",
            message: `Yth. Nasabah,

Sehubungan dengan pembaruan sistem, kami membutuhkan konfirmasi data Anda hari ini.

Mohon segera mengakses tautan berikut:
https://update-data-nasabah.site

Terima kasih.`,
            options: [
              "Permintaan pembaruan data melalui WhatsApp",
              "Link menggunakan domain umum (.site)",
              "Nada pesan formal dan sopan",
              "Pesan dikirim tanpa menyebut nama nasabah",
            ],
            correctOptions: [
              "Permintaan pembaruan data melalui WhatsApp",
              "Link menggunakan domain umum (.site)",
            ],
            explanation: {
              correct:
                "Bank tidak pernah meminta pembaruan data lewat WhatsApp. Selain itu, domain umum sering dipakai untuk phishing.",
              wrong:
                "Nada formal dan tidak menyebut nama justru sering digunakan agar pesan terlihat resmi.",
            },
          },
          {
            title: "Email Login Baru Internet Banking",
            channel: "Email",
            sender: "BCA Customer Service <noreply@bca-support.co.id>",
            message: `Yth. Nasabah,

Kami mendeteksi login baru pada akun Internet Banking Anda.

📍 Perangkat: Android – Jakarta  
⏰ Waktu: 26 Desember 2025

Silakan lakukan pengecekan melalui tautan berikut:
http://klikbca-security.com

Jika tidak dikonfirmasi dalam 60 menit, akses akan dibatasi.`,
            options: [
              "Penggunaan protokol http (bukan https)",
              "Tekanan waktu 60 menit",
              "Alamat email pengirim terlihat profesional",
              "Pesan mencantumkan detail lokasi dan waktu",
            ],
            correctOptions: [
              "Penggunaan protokol http (bukan https)",
              "Tekanan waktu 60 menit",
            ],
            explanation: {
              correct:
                "Layanan perbankan tidak menggunakan http dan tidak menekan nasabah dengan batas waktu singkat.",
              wrong:
                "Detail lokasi dan email profesional justru sering ditambahkan agar korban merasa pesan ini sah.",
            },
          },
        ],
      },
    }),
    []
  );

  const currentLevel = levels[level];
  const currentCase = currentLevel.cases[caseIndex];

  const toggleSelect = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const isCorrect =
    level === 3
      ? selected.length === currentCase.correctOptions.length &&
        selected.every((o) => currentCase.correctOptions.includes(o))
      : selected[0] === currentCase.correct;

  const next = () => {
    setSelected([]);
    setStage("scenario");

    if (caseIndex < currentLevel.cases.length - 1) {
      setCaseIndex(caseIndex + 1);
    } else if (level < 3) {
      setLevel(level + 1);
      setCaseIndex(0);
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

          {level < 3 && (
            <div className="flex gap-3">
              {currentCase.actions.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setSelected([a]);
                    setStage("result");
                  }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {currentCase.options.map((o) => (
                <button
                  key={o}
                  onClick={() => toggleSelect(o)}
                  className={`px-4 py-3 rounded-lg text-left border ${
                    selected.includes(o)
                      ? "bg-emerald-50 border-emerald-600"
                      : "border-slate-200"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <button
              disabled={selected.length !== currentCase.correctOptions.length}
              onClick={() => setStage("result")}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
            >
              Periksa Jawaban
            </button>
          )}
        </div>
      )}

      {stage === "result" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-xl font-bold">
            Jawaban Kamu:{" "}
            <span className={isCorrect ? "text-emerald-600" : "text-red-600"}>
              {isCorrect ? "BENAR" : "SALAH"}
            </span>
          </h3>

          <p className="text-slate-700">
            {level < 3
              ? currentCase.explanation
              : isCorrect
              ? currentCase.explanation.correct
              : currentCase.explanation.wrong}
          </p>

          <button
            onClick={next}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
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
            Kamu telah melewati semua level. Ingat: pesan yang terlihat paling
            profesional sering kali justru yang paling berbahaya.
          </p>
        </div>
      )}
    </div>
  );
}
