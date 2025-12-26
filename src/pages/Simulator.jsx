import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulation() {
  const [screen, setScreen] = useState("levelSelect");
  // levelSelect | scenario | result | done
  const [level, setLevel] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Dasar (Awareness)",
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
            "Pesan ini menekan secara emosional dan menyertakan link acak. Bank tidak pernah melakukan verifikasi melalui SMS.",
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
            "Jika Anda tidak pernah mengikuti undian apa pun, maka pesan ini hampir pasti penipuan.",
        },
      ],
    },

    2: {
      label: "Level 2 · Menengah (Analisis)",
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
      label: "Level 3 · Lanjutan (Critical Judgment)",
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
              "Bank tidak pernah meminta pembaruan data lewat WhatsApp. Domain umum sering dipakai untuk phishing.",
            wrong:
              "Nada formal dan tidak menyebut nama sering dipakai agar pesan terlihat resmi.",
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
              "Detail lokasi dan email profesional justru ditambahkan agar pesan terlihat sah.",
          },
        },
      ],
    },
  }), []);

  const currentLevel = level ? levels[level] : null;
  const currentCase =
    currentLevel && currentLevel.cases[caseIndex];

  const toggleSelect = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const isCorrect =
    level === 3
      ? selected.length === currentCase.correctOptions.length &&
        selected.every((o) =>
          currentCase.correctOptions.includes(o)
        )
      : selected[0] === currentCase.correct;

  const goBack = () => {
    if (screen === "scenario") {
      setScreen("levelSelect");
      setLevel(null);
      setCaseIndex(0);
      setSelected([]);
    } else if (screen === "result") {
      setScreen("scenario");
      setSelected([]);
    }
  };

  const next = () => {
    setSelected([]);
    if (caseIndex < currentLevel.cases.length - 1) {
      setCaseIndex(caseIndex + 1);
      setScreen("scenario");
    } else if (level < 3) {
      setScreen("levelSelect");
      setLevel(null);
      setCaseIndex(0);
    } else {
      setScreen("done");
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-6 md:p-10 space-y-10">
      {screen === "levelSelect" && (
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Simulasi Anti-Phishing
          </h2>
          <p className="text-slate-600">
            Pilih level pembelajaran. Kamu bebas memulai dari level mana pun.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setScreen("scenario");
                }}
                className="p-4 rounded-xl bg-white border shadow hover:border-emerald-500 text-left"
              >
                <p className="font-bold text-slate-900">
                  {levels[lvl].label}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {levels[lvl].goal}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "scenario" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl space-y-6">
          <button
            onClick={goBack}
            className="text-sm text-slate-500 underline"
          >
            ← Kembali
          </button>

          <h3 className="text-2xl font-bold text-slate-900">
            {currentCase.title}
          </h3>

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
                    setScreen("result");
                  }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <>
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
              <button
                disabled={
                  selected.length !==
                  currentCase.correctOptions.length
                }
                onClick={() => setScreen("result")}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
              >
                Periksa Jawaban
              </button>
            </>
          )}
        </div>
      )}

      {screen === "result" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <button
            onClick={goBack}
            className="text-sm text-slate-500 underline"
          >
            ← Kembali
          </button>

          <h3 className="text-xl font-bold">
            Jawaban Kamu:{" "}
            <span
              className={
                isCorrect ? "text-emerald-600" : "text-red-600"
              }
            >
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

      {screen === "done" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 max-w-3xl">
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-sm text-slate-500 underline mb-3"
          >
            ← Kembali ke Pilih Level
          </button>

          <h3 className="text-xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Kamu telah menyelesaikan simulasi ini. Ingat: penipu
            memanfaatkan emosi, bukan logika. Berhenti, pikirkan,
            dan verifikasi.
          </p>
        </div>
      )}
    </div>
  );
}
