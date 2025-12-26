import React, { useState, useMemo } from "react";

/**
 * CATATAN PENTING
 * - Component ini FULL & STANDALONE
 * - Default render = halaman pilih level (tidak putih)
 * - Tidak mengubah logika sebelumnya, hanya memastikan render selalu ada
 * - Tidak pakai library tambahan
 */

export default function AntiPhishingSimulationPage() {
  const [screen, setScreen] = useState("levelSelect"); 
  // levelSelect | scenario | result | done
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Dasar (Awareness)",
      goal:
        "Belajar menahan diri. Jangan panik. Jangan asal klik.",
      cases: [
        {
          title: "Akun Akan Diblokir",
          channel: "SMS",
          sender: "BANK ALERT",
          message: `⚠️ NOTIFIKASI KEAMANAN ⚠️

Kami mendeteksi aktivitas tidak wajar pada akun Anda.
Jika tidak segera diverifikasi, akun akan DIBLOKIR hari ini.

👉 http://bank-verifikasi-akun.co`,
          actions: ["Abaikan", "Klik Link"],
          correct: "Abaikan",
          explanation:
            "Bank tidak pernah mengirim link verifikasi lewat SMS. Nada panik adalah ciri phishing.",
        },
        {
          title: "Hadiah Undian Pelanggan",
          channel: "SMS",
          sender: "INFO UNDIAN",
          message: `Selamat! Nomor Anda memenangkan hadiah Rp25.000.000.

Segera klaim sebelum hangus:
http://klaim-hadiah-pelanggan.id`,
          actions: ["Abaikan", "Klik Link"],
          correct: "Abaikan",
          explanation:
            "Jika Anda tidak pernah ikut undian, maka pesan ini hampir pasti penipuan.",
        },
      ],
    },

    2: {
      label: "Level 2 · Menengah (Analisis)",
      goal:
        "Belajar memverifikasi sebelum bertindak.",
      cases: [
        {
          title: "Pesanan Shopee Ditahan",
          channel: "WhatsApp",
          sender: "Shopee Indonesia ✔️",
          message: `Shopee Care 💬

Halo Kak 👋  
Pesanan Anda *DITAHAN* sementara.

📦 ID: 88219301  
Silakan verifikasi:
https://shopee-verifikasi-id.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation:
            "Langkah paling aman adalah membuka aplikasi Shopee langsung.",
        },
        {
          title: "Keamanan Akun Google",
          channel: "Email",
          sender: "Google Security <security@google-verifikasi.co>",
          message: `Kami mendeteksi login mencurigakan.

Amankan akun Anda:
https://gmail-security-check.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation:
            "Google hanya menggunakan akun.google.com untuk keamanan.",
        },
      ],
    },

    3: {
      label: "Level 3 · Lanjutan (Critical Judgment)",
      goal:
        "Pesan terlihat sangat profesional. Fokus mencari kejanggalan.",
      cases: [
        {
          title: "Update Data Nasabah",
          channel: "WhatsApp",
          sender: "CS Bank Nasional",
          message: `Yth. Nasabah,

Kami membutuhkan pembaruan data Anda hari ini.

Silakan akses:
https://update-data-nasabah.site`,
          options: [
            "Permintaan data lewat WhatsApp",
            "Domain link .site",
            "Nada pesan formal",
            "Tidak menyebut nama",
          ],
          correctOptions: [
            "Permintaan data lewat WhatsApp",
            "Domain link .site",
          ],
          explanation: {
            correct:
              "Bank tidak pernah meminta update data via WhatsApp dan domain umum sering dipakai phishing.",
            wrong:
              "Nada formal dan tidak menyebut nama justru sering dipakai penipu.",
          },
        },
        {
          title: "Login Baru Internet Banking",
          channel: "Email",
          sender: "BCA Support <noreply@bca-support.co.id>",
          message: `Kami mendeteksi login baru.

⏰ 26 Desember 2025  
📍 Android – Jakarta

Cek segera:
http://klikbca-security.com

Jika tidak, akses dibatasi 60 menit.`,
          options: [
            "Link masih http",
            "Tekanan waktu 60 menit",
            "Ada lokasi & waktu",
            "Email terlihat profesional",
          ],
          correctOptions: [
            "Link masih http",
            "Tekanan waktu 60 menit",
          ],
          explanation: {
            correct:
              "Layanan bank wajib https dan tidak memberi ultimatum singkat.",
            wrong:
              "Detail lokasi & email rapi justru dipakai agar terlihat sah.",
          },
        },
      ],
    },
  }), []);

  const currentLevel = levels[level];
  const currentCase = currentLevel.cases[caseIndex];

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
      setCaseIndex(0);
    } else {
      setScreen("done");
    }
  };

  return (
    <div className="min-h-[400px] bg-emerald-50 rounded-3xl p-6 md:p-10">
      {screen === "levelSelect" && (
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold">
            Simulasi Anti-Phishing
          </h2>
          <p className="text-slate-600">
            Pilih level. Kamu bebas mulai dari mana saja.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setCaseIndex(0);
                  setScreen("scenario");
                }}
                className="bg-white border rounded-xl p-4 shadow hover:border-emerald-500 text-left"
              >
                <p className="font-bold">
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
        <div className="bg-white rounded-2xl shadow p-6 max-w-3xl space-y-5">
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali
          </button>

          <h3 className="text-xl font-bold">
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
            <div className="flex gap-3">
              {currentCase.actions.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setSelected([a]);
                    setScreen("result");
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
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
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
              >
                Periksa Jawaban
              </button>
            </>
          )}
        </div>
      )}

      {screen === "result" && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-3xl space-y-4">
          <button
            onClick={() => setScreen("scenario")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali
          </button>

          <h3 className="text-xl font-bold">
            Jawaban Kamu:{" "}
            <span
              className={
                isCorrect
                  ? "text-emerald-600"
                  : "text-red-600"
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
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjut
          </button>
        </div>
      )}

      {screen === "done" && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Ingat: phishing menang saat kita panik. 
            Berhenti, pikirkan, verifikasi.
          </p>
        </div>
      )}
    </div>
  );
}
