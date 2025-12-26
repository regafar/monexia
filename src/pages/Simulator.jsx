import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulation() {
  const [screen, setScreen] = useState("levelSelect");
  // levelSelect | scenario | result | done
  const [level, setLevel] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(
    () => ({
      1: {
        label: "Level 1 · Awareness",
        goal:
          "Membangun refleks awal agar tidak panik dan tidak asal berinteraksi dengan pesan mencurigakan.",
        cases: [
          {
            title: "Akun Terancam Diblokir",
            channel: "SMS",
            sender: "BANK ALERT",
            message: `⚠️ NOTIFIKASI KEAMANAN ⚠️

Kami mendeteksi aktivitas tidak wajar pada akun Anda.
Jika tidak segera diverifikasi, akun akan DIBLOKIR hari ini.

👉 http://bank-verifikasi-akun.co`,
            actions: ["Abaikan", "Klik Link"],
            correct: "Abaikan",
            explanation: `
Keputusan ini BENAR.

Pesan seperti ini dirancang untuk memicu kepanikan. Penipu ingin Anda bereaksi cepat tanpa berpikir.
Bank tidak pernah mengirimkan link verifikasi melalui SMS, apalagi dengan nada mengancam.

Langkah aman di dunia nyata:
• Jangan klik link apa pun
• Abaikan pesan
• Hubungi bank melalui nomor resmi di website atau aplikasi`,
          },
          {
            title: "Undian Berhadiah Menggiurkan",
            channel: "SMS",
            sender: "INFO UNDIAN",
            message: `Selamat! Nomor Anda memenangkan hadiah Rp25.000.000.

Konfirmasi sekarang sebelum hangus:
http://klaim-hadiah-pelanggan.id`,
            actions: ["Abaikan", "Klik Link"],
            correct: "Abaikan",
            explanation: `
Keputusan ini BENAR.

Penipuan berbasis hadiah memanfaatkan rasa senang dan rasa takut kehilangan.
Jika Anda tidak pernah mendaftar undian, maka pesan ini hampir pasti palsu.

Langkah aman:
• Jangan tergiur hadiah instan
• Program resmi selalu diumumkan di kanal resmi`,
          },
        ],
      },

      2: {
        label: "Level 2 · Analisis",
        goal:
          "Melatih kebiasaan berhenti sejenak dan memverifikasi informasi sebelum bertindak.",
        cases: [
          {
            title: "Pesanan Shopee Ditahan",
            channel: "WhatsApp",
            sender: "Shopee Indonesia ✔️",
            message: `Shopee Care 💬

Halo Kak 👋  
Pesanan Anda *DITAHAN* sementara.

📦 ID Pesanan: 88219301  
Silakan verifikasi:
https://shopee-verifikasi-id.my.id`,
            actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
            correct: "Cek Sumber Resmi",
            explanation: `
Keputusan PALING TEPAT.

Pesan ini terlihat meyakinkan karena menggunakan nama brand dan konteks transaksi.
Namun, link verifikasi bukan berasal dari domain resmi.

Langkah aman:
• Buka aplikasi Shopee langsung
• Cek notifikasi di dalam aplikasi
• Abaikan link dari chat`,
          },
          {
            title: "Peringatan Keamanan Akun Google",
            channel: "Email",
            sender: "Google Security <security@google-verifikasi.co>",
            message: `Kami mendeteksi login mencurigakan.

Segera amankan akun Anda:
https://gmail-security-check.my.id`,
            actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
            correct: "Cek Sumber Resmi",
            explanation: `
Keputusan ini BENAR.

Email terlihat singkat dan profesional, namun domain pengirim dan link tidak resmi.
Google hanya menggunakan akun.google.com untuk keamanan akun.

Langkah aman:
• Login manual ke akun Google
• Cek menu Security`,
          },
        ],
      },

      3: {
        label: "Level 3 · Critical Judgment",
        goal:
          "Melatih ketelitian tingkat tinggi untuk mengenali kejanggalan halus pada pesan yang tampak sangat profesional.",
        cases: [
          {
            title: "Permintaan Update Data Nasabah",
            channel: "WhatsApp",
            sender: "CS Bank Nasional",
            message: `Yth. Nasabah,

Kami membutuhkan pembaruan data Anda hari ini.

Silakan akses:
https://update-data-nasabah.site`,
            options: [
              "Permintaan data melalui WhatsApp",
              "Domain link menggunakan .site",
              "Nada pesan formal",
              "Tidak menyebut nama nasabah",
            ],
            correctOptions: [
              "Permintaan data melalui WhatsApp",
              "Domain link menggunakan .site",
            ],
            explanation: {
              correct: `
Analisis Anda TEPAT.

Bank tidak pernah meminta pembaruan data melalui WhatsApp.
Selain itu, domain umum seperti .site sering digunakan untuk website palsu.

Langkah aman:
• Abaikan pesan
• Hubungi bank melalui aplikasi atau call center resmi`,
              wrong: `
Pilihan ini KURANG TEPAT.

Nada formal dan tidak menyebut nama justru sering dipakai penipu
untuk terlihat profesional dan massal.`,
            },
          },
          {
            title: "Email Login Baru Internet Banking",
            channel: "Email",
            sender: "BCA Support <noreply@bca-support.co.id>",
            message: `Kami mendeteksi login baru.

📍 Android – Jakarta  
⏰ 26 Desember 2025

Cek segera:
http://klikbca-security.com

Jika tidak, akses dibatasi 60 menit.`,
            options: [
              "Link masih menggunakan http",
              "Tekanan waktu 60 menit",
              "Ada detail lokasi dan waktu",
              "Email terlihat profesional",
            ],
            correctOptions: [
              "Link masih menggunakan http",
              "Tekanan waktu 60 menit",
            ],
            explanation: {
              correct: `
Analisis Anda TEPAT.

Layanan perbankan wajib menggunakan HTTPS.
Tekanan waktu adalah teknik manipulasi psikologis.

Langkah aman:
• Jangan klik link
• Login manual ke internet banking`,
              wrong: `
Pilihan ini KURANG TEPAT.

Detail lokasi dan email rapi justru sering ditambahkan
untuk membuat email phishing terlihat sah.`,
            },
          },
        ],
      },
    }),
    []
  );

  const currentLevel = level ? levels[level] : null;
  const currentCase = currentLevel?.cases[caseIndex];

  const isCorrect =
    level === 3
      ? selected.length === currentCase.correctOptions.length &&
        selected.every((o) =>
          currentCase.correctOptions.includes(o)
        )
      : selected[0] === currentCase.correct;

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
    <div className="bg-emerald-50 rounded-3xl p-6 md:p-10 space-y-10">
      {/* LEVEL SELECT */}
      {screen === "levelSelect" && (
        <div className="max-w-4xl space-y-6">
          <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
            Simulasi Interaktif
          </span>
          <h2 className="text-3xl font-bold">
            Simulasi Anti-Phishing
          </h2>
          <p className="text-slate-600">
            Pilih level pembelajaran. Setiap level mensimulasikan
            skenario penipuan dengan tingkat kesulitan berbeda.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setCaseIndex(0);
                  setScreen("scenario");
                }}
                className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg">
                  {levels[lvl].label}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {levels[lvl].goal}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SCENARIO */}
      {screen === "scenario" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl space-y-6">
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-sm text-slate-500 underline"
          >
            ← Kembali
          </button>

          <h3 className="text-2xl font-bold">
            {currentCase.title}
          </h3>

          <div className="bg-slate-50 border rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">
              {currentCase.channel} · {currentCase.sender}
            </p>
            <pre className="whitespace-pre-wrap text-sm">
              {currentCase.message}
            </pre>
          </div>

          {level < 3 && (
            <div className="flex flex-wrap gap-3">
              {currentCase.actions.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setSelected([a]);
                    setScreen("result");
                  }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <>
              <p className="font-medium">
                Pilih dua hal yang menurut Anda janggal:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {currentCase.options.map((o) => (
                  <button
                    key={o}
                    onClick={() =>
                      setSelected((p) =>
                        p.includes(o)
                          ? p.filter((x) => x !== o)
                          : [...p, o]
                      )
                    }
                    className={`border rounded-lg p-3 text-left ${
                      selected.includes(o)
                        ? "bg-emerald-100 border-emerald-500"
                        : "bg-white"
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
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
              >
                Periksa Jawaban
              </button>
            </>
          )}
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl space-y-4">
          <button
            onClick={() => setScreen("scenario")}
            className="text-sm text-slate-500 underline"
          >
            ← Kembali
          </button>

          <h3 className="text-xl font-bold">
            Evaluasi Keputusan Anda
          </h3>

          <p
            className={`font-semibold ${
              isCorrect ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "Jawaban Anda Benar" : "Jawaban Anda Kurang Tepat"}
          </p>

          <p className="text-slate-700 whitespace-pre-line">
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

      {/* DONE */}
      {screen === "done" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl">
          <h3 className="text-2xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Anda telah menyelesaikan seluruh simulasi.
            Ingat: penipu memanfaatkan emosi dan ketergesaan.
            Berhenti, berpikir, dan verifikasi sebelum bertindak.
          </p>
        </div>
      )}
    </div>
  );
}
