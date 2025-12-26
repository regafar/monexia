import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationPage() {
  const [screen, setScreen] = useState("levelSelect");
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Dasar (Awareness)",
      goal: "Belajar menahan diri. Jangan panik. Jangan asal klik.",
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
Keputusan AMAN adalah mengabaikan pesan ini.

Pesan ini sengaja dibuat menekan dan mendesak agar kamu panik.
Di dunia nyata, bank tidak pernah mengirim link verifikasi lewat SMS.

Jika kamu klik link tersebut, kamu kemungkinan besar akan diarahkan ke situs palsu
yang meminta data sensitif seperti PIN, OTP, atau password.
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
Hadiah mendadak adalah salah satu bentuk phishing paling klasik.

Refleksi dunia nyata:
Jika kamu tidak pernah mengikuti undian apa pun,
maka hadiah ini hampir pasti penipuan.
`,
        },
      ],
    },

    2: {
      label: "Level 2 · Menengah (Analisis)",
      goal: "Belajar memverifikasi sebelum bertindak.",
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
Pilihan paling tepat adalah memeriksa langsung melalui aplikasi Shopee resmi.

Link pada pesan ini menggunakan domain tidak resmi.
Membuka aplikasi langsung adalah langkah verifikasi paling aman.
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
Google hanya menggunakan domain akun.google.com.

Email dengan domain selain itu patut dicurigai,
meskipun tampilannya terlihat profesional.
`,
        },
      ],
    },

    3: {
      label: "Level 3 · Lanjutan (Critical Judgment)",
      goal: "Pesan terlihat profesional. Fokus mencari kejanggalan.",
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

Bank tidak pernah meminta update data lewat WhatsApp,
dan domain umum seperti .site sering dipakai untuk phishing.
`,
            wrong: `
Nada formal justru sering digunakan penipu
untuk menyamarkan aksinya.
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
Layanan bank wajib HTTPS.
Tekanan waktu adalah taktik manipulasi psikologis.
`,
            wrong: `
Detail teknis sering digunakan
untuk menciptakan kesan sah.
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
        selected.every(o => currentCase.correctOptions.includes(o))
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
    <div className="min-h-[700px] bg-emerald-50 rounded-3xl p-8 md:p-12">
      {/* LEVEL SELECT */}
      {screen === "levelSelect" && (
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Simulasi Anti-Phishing
          </h2>
          <p className="text-lg text-slate-600">
            Pilih level pembelajaran. Kamu bebas mulai dari level mana saja.
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
                className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:border-emerald-500 transition"
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
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
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
            <div className="flex gap-4">
              {currentCase.actions.map(a => (
                <button
                  key={a}
                  onClick={() => {
                    setSelected([a]);
                    setScreen("result");
                  }}
                  className="px-6 py-2 rounded-lg bg-emerald-600 text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {level === 3 && (
            <>
              <p className="font-medium">
                Pilih 2 indikator paling mencurigakan:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
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
                    className={`border rounded-lg p-4 text-left ${
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
                className="px-6 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
              >
                Periksa Jawaban
              </button>
            </>
          )}
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
          <h3 className="text-2xl font-bold">
            {isCorrect ? "✅ Jawaban Benar" : "❌ Jawaban Kurang Tepat"}
          </h3>

          <p className="whitespace-pre-line text-slate-700">
            {level < 3
              ? currentCase.explanation
              : isCorrect
              ? currentCase.explanation.correct
              : currentCase.explanation.wrong}
          </p>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-bold text-red-700 mb-2">
              Penting untuk Diingat
            </h4>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              <li>Tidak ada pihak resmi meminta OTP atau PIN</li>
              <li>Waspadai tekanan waktu</li>
              <li>Verifikasi hanya lewat kanal resmi</li>
            </ul>
          </div>

          <button
            onClick={next}
            className="px-6 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Lanjut
          </button>
        </div>
      )}

      {/* DONE */}
      {screen === "done" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-emerald-700">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700 mt-2">
            Kamu sudah menyelesaikan seluruh simulasi.
            Ingat: penipu menang saat kita panik, bukan saat kita berpikir.
          </p>
        </div>
      )}
    </div>
  );
}
