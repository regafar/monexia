import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulation() {
  const [screen, setScreen] = useState("levelSelect");
  // levelSelect | scenario | result | done
  const [level, setLevel] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Awareness",
      goal:
        "Membangun refleks aman agar tidak panik dan tidak asal berinteraksi dengan pesan mencurigakan.",
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
Pesan ini sengaja dibuat singkat dan mengancam agar Anda panik.
Bank resmi tidak pernah mengirim link verifikasi via SMS.

Keputusan aman:
• Abaikan pesan
• Jangan klik link
• Hubungi bank melalui aplikasi atau website resmi`,
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
Hadiah mendadak adalah taktik klasik phishing.
Jika Anda tidak pernah mengikuti undian, hampir pasti ini penipuan.

Ingat:
• Hadiah resmi diumumkan di kanal resmi
• Tidak ada klaim hadiah lewat link acak`,
        },
      ],
    },

    2: {
      label: "Level 2 · Analisis",
      goal:
        "Membiasakan diri untuk berhenti, berpikir, dan memverifikasi sebelum bertindak.",
      cases: [
        {
          title: "Pesanan Shopee Ditahan",
          channel: "WhatsApp",
          sender: "Shopee Indonesia ✔️",
          message: `Shopee Care 💬

Pesanan Anda *DITAHAN* sementara.

📦 ID: 88219301  
Silakan verifikasi:
https://shopee-verifikasi-id.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation: `
Pesan terlihat meyakinkan karena mencatut brand dan konteks transaksi.
Namun domain link bukan domain resmi Shopee.

Langkah ideal:
• Buka aplikasi Shopee langsung
• Cek notifikasi resmi
• Abaikan link dari chat`,
        },
        {
          title: "Peringatan Keamanan Akun Google",
          channel: "Email",
          sender: "Google Security <security@google-verifikasi.co>",
          message: `Kami mendeteksi login mencurigakan.

Amankan akun Anda:
https://gmail-security-check.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation: `
Google hanya menggunakan domain resmi (akun.google.com).
Email ini meniru gaya bahasa resmi untuk menjebak korban.

Solusi:
• Login manual ke akun Google
• Periksa menu Security`,
        },
      ],
    },

    3: {
      label: "Level 3 · Critical Judgment",
      goal:
        "Menguji ketelitian tingkat lanjut untuk menemukan kejanggalan halus.",
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
Bank tidak pernah meminta update data lewat WhatsApp.
Domain umum sering digunakan untuk situs palsu.

Keputusan Anda menunjukkan kontrol dan ketelitian.`,
            wrong: `
Nada formal justru sering digunakan untuk menyamarkan penipuan.
Fokuslah pada jalur komunikasi dan domain.`,
          },
        },
        {
          title: "Email Login Baru Internet Banking",
          channel: "Email",
          sender: "BCA Support <noreply@bca-support.co.id>",
          message: `Login baru terdeteksi.

📍 Android – Jakarta  
⏰ 26 Desember 2025

Cek segera:
http://klikbca-security.com

Akses dibatasi 60 menit.`,
          options: [
            "Link masih menggunakan http",
            "Tekanan waktu 60 menit",
            "Detail lokasi & waktu",
            "Email terlihat profesional",
          ],
          correctOptions: [
            "Link masih menggunakan http",
            "Tekanan waktu 60 menit",
          ],
          explanation: {
            correct: `
Layanan perbankan wajib HTTPS.
Tekanan waktu adalah teknik manipulasi psikologis.`,
            wrong: `
Detail teknis sering ditambahkan agar pesan tampak sah.
Fokus pada protokol dan urgensi.`,
          },
        },
      ],
    },
  }), []);

  const currentLevel = level ? levels[level] : null;
  const currentCase = currentLevel?.cases[caseIndex];

  const isCorrect =
    level === 3
      ? selected.length === currentCase.correctOptions.length &&
        selected.every(o => currentCase.correctOptions.includes(o))
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
    <div className="min-h-[500px] bg-emerald-50 rounded-3xl p-6 md:p-10">
      {/* FALLBACK SAFETY */}
      {!screen && <p className="text-slate-600">Loading...</p>}

      {/* LEVEL SELECT */}
      {screen === "levelSelect" && (
        <div className="max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold">Simulasi Anti-Phishing</h2>
          <p className="text-slate-600">
            Pilih level pembelajaran. Anda bebas memulai dari level mana pun.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setCaseIndex(0);
                  setScreen("scenario");
                }}
                className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:shadow-md"
              >
                <h3 className="font-bold">{levels[lvl].label}</h3>
                <p className="text-sm text-slate-600 mt-2">
                  {levels[lvl].goal}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SCENARIO */}
      {screen === "scenario" && currentCase && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl space-y-6">
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali
          </button>

          <h3 className="text-2xl font-bold">{currentCase.title}</h3>

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
              {currentCase.actions.map(a => (
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
              <p className="font-medium">Pilih dua hal yang janggal:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {currentCase.options.map(o => (
                  <button
                    key={o}
                    onClick={() =>
                      setSelected(prev =>
                        prev.includes(o)
                          ? prev.filter(x => x !== o)
                          : [...prev, o]
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
                disabled={selected.length !== currentCase.correctOptions.length}
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
      {screen === "result" && currentCase && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl space-y-6">
          <button
            onClick={() => setScreen("scenario")}
            className="text-sm underline text-slate-500"
          >
            ← Kembali
          </button>

          <h3 className="text-xl font-bold">
            {isCorrect ? "Jawaban Tepat" : "Perlu Diperhatikan"}
          </h3>

          <p className="whitespace-pre-line text-slate-700">
            {level < 3
              ? currentCase.explanation
              : isCorrect
              ? currentCase.explanation.correct
              : currentCase.explanation.wrong}
          </p>

          {/* WARNING BOX – INSPIRED BY IMAGE */}
          <div className="border border-red-200 bg-red-50 rounded-2xl p-5">
            <h4 className="font-bold text-red-700 mb-2">
              Penting untuk Diingat
            </h4>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              <li>Tidak ada pihak resmi yang meminta OTP, PIN, atau password</li>
              <li>Waspadai tekanan waktu dan nada mendesak</li>
              <li>Selalu verifikasi melalui kanal resmi</li>
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

      {/* DONE */}
      {screen === "done" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl">
          <h3 className="text-2xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Anda telah menyelesaikan seluruh simulasi.
            Ingat: penipu menang saat kita panik, bukan saat kita berpikir.
          </p>
        </div>
      )}
    </div>
  );
}
