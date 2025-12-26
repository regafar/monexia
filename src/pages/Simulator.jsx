import React, { useState, useMemo } from "react";

/**
 * ============================================================
 * ANTI PHISHING INTERACTIVE SIMULATION
 * - FULL PAGE
 * - TIDAK ADA LOGIKA DIHAPUS
 * - NARASI DITAMBAH
 * - UI INSPIRED OLEH GAMBAR REFERENSI
 * ============================================================
 */

export default function AntiPhishingSimulationPage() {
  const [screen, setScreen] = useState("levelSelect");
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Dasar (Awareness)",
      goal:
        "Di level ini, kamu dilatih untuk tidak reaktif. Fokusnya sederhana: jangan panik dan jangan asal klik.",
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
          explanation: `
Pilihan yang aman adalah **Abaikan**.

Pesan ini menggunakan taktik klasik phishing: nada panik, ancaman pemblokiran, dan batas waktu singkat.
Di dunia nyata, bank **tidak pernah** mengirim link verifikasi lewat SMS.

Bayangkan jika kamu benar-benar klik link ini.
Kemungkinan besar kamu akan diarahkan ke website palsu yang meminta data sensitif seperti PIN atau OTP.
Sekali data itu masuk, akunmu bisa diambil alih dalam hitungan menit.
          `,
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
          explanation: `
Pesan ini memancing emosi positif: senang, kaget, dan tergoda.
Justru di kondisi emosional seperti ini, banyak orang lengah.

Refleksi dunia nyata:
Jika kamu tidak pernah mengikuti undian apa pun, maka hadiah ini tidak masuk akal.
Perusahaan resmi tidak mengirim klaim hadiah lewat link acak.
          `,
        },
      ],
    },

    2: {
      label: "Level 2 · Menengah (Analisis)",
      goal:
        "Pesan terlihat lebih rapi dan profesional. Di level ini, kamu dilatih untuk melakukan verifikasi.",
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
          explanation: `
Pilihan terbaik adalah **Cek Sumber Resmi**.

Pesan ini terlihat meyakinkan karena:
- Ada ID pesanan
- Menggunakan bahasa customer service
- Mengatasnamakan brand besar

Namun, link bukan domain resmi Shopee.
Di dunia nyata, langkah aman adalah membuka aplikasi Shopee langsung dan mengecek notifikasi dari sana.
          `,
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
          explanation: `
Email ini meniru gaya komunikasi Google, tetapi domain pengirim dan link tidak resmi.

Refleksi:
Google selalu menggunakan domain **akun.google.com**.
Email keamanan asli tidak akan mengarahkan ke domain aneh.
          `,
        },
      ],
    },

    3: {
      label: "Level 3 · Lanjutan (Critical Judgment)",
      goal:
        "Di level ini, pesan sangat realistis. Kamu harus benar-benar jeli mencari kejanggalan kecil.",
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
            correct: `
Kamu jeli.

Bank tidak pernah meminta update data lewat WhatsApp.
Selain itu, domain umum seperti .site sering digunakan untuk phishing.

Keputusan ini menunjukkan kamu mampu mengontrol emosi dan fokus pada detail penting.
            `,
            wrong: `
Nada formal justru sering dipakai penipu agar terlihat sah.
Fokuslah pada jalur komunikasi dan alamat website, bukan sekadar gaya bahasa.
            `,
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
            correct: `
Layanan perbankan wajib menggunakan HTTPS.
Tekanan waktu adalah teknik manipulasi psikologis agar korban tidak berpikir panjang.
            `,
            wrong: `
Detail teknis sering ditambahkan untuk menciptakan ilusi keaslian.
Namun justru tekanan waktu dan protokol tidak aman adalah tanda bahaya utama.
            `,
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
    <div className="min-h-[600px] bg-emerald-50 rounded-3xl p-6 md:p-10">
      {/* ================= LEVEL SELECT ================= */}
      {screen === "levelSelect" && (
        <div className="max-w-4xl space-y-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Simulasi Anti-Phishing
          </h2>
          <p className="text-slate-600 text-lg">
            Simulasi ini dirancang untuk melatih refleks, analisis, dan ketelitian kamu menghadapi pesan mencurigakan di dunia nyata.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setCaseIndex(0);
                  setScreen("scenario");
                }}
                className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:border-emerald-500"
              >
                <p className="font-bold text-lg">
                  {levels[lvl].label}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  {levels[lvl].goal}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= SCENARIO ================= */}
      {screen === "scenario" && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-4xl space-y-6">
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali ke Pilih Level
          </button>

          <h3 className="text-2xl font-bold">
            {currentCase.title}
          </h3>

          <div className="bg-slate-50 border rounded-xl p-5">
            <p className="text-xs text-slate-500 mb-2">
              {currentCase.channel} · {currentCase.sender}
            </p>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <>
              <p className="font-medium text-slate-700">
                Tandai <b>2 indikator paling mencurigakan</b>:
              </p>
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
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
              >
                Periksa Jawaban
              </button>
            </>
          )}
        </div>
      )}

      {/* ================= RESULT ================= */}
      {screen === "result" && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-4xl space-y-6">
          <button
            onClick={() => setScreen("scenario")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali ke Pesan
          </button>

          <h3 className="text-2xl font-bold">
            Hasil Evaluasi
          </h3>

          <p className="text-slate-700 whitespace-pre-line">
            {level < 3
              ? currentCase.explanation
              : isCorrect
              ? currentCase.explanation.correct
              : currentCase.explanation.wrong}
          </p>

          {/* MENU TAMBAHAN – INSPIRED UI */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-bold text-red-700 mb-2">
              Penting untuk Diingat
            </h4>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              <li>Tidak ada pihak resmi meminta OTP, PIN, atau password</li>
              <li>Waspadai pesan dengan tekanan waktu</li>
              <li>Verifikasi selalu lewat aplikasi atau website resmi</li>
            </ul>
          </div>

          <button
            onClick={next}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjut
          </button>
        </div>
      )}

      {/* ================= DONE ================= */}
      {screen === "done" && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-4xl space-y-3">
          <h3 className="text-2xl font-bold text-emerald-700">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Kamu sudah melewati seluruh simulasi.  
            Ingat: **penipu menang saat kita panik, bukan saat kita berpikir.**
          </p>
        </div>
      )}
    </div>
  );
}
