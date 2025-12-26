import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationPage() {
  const [screen, setScreen] = useState("levelSelect");
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "Level 1 · Awareness",
      subtitle: "Bangun refleks aman",
      goal:
        "Melatih kebiasaan tidak panik dan tidak asal klik ketika menerima pesan mencurigakan.",
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
Pilihan aman adalah mengabaikan pesan ini.

Pesan dibuat mendesak agar kamu panik.
Di dunia nyata, bank tidak pernah mengirim link verifikasi lewat SMS.
`,
          reminder: [
            "Bank tidak mengirim link verifikasi via SMS",
            "Nada mengancam = red flag",
            "Verifikasi hanya lewat aplikasi resmi",
          ],
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
Hadiah mendadak memancing emosi senang dan lengah.

Jika kamu tidak pernah ikut undian,
maka pesan ini hampir pasti penipuan.
`,
          reminder: [
            "Hadiah resmi diumumkan di kanal resmi",
            "Waspadai hadiah tanpa konteks",
            "Jangan klik link dari nomor tidak dikenal",
          ],
        },
      ],
    },

    2: {
      label: "Level 2 · Analisis",
      subtitle: "Belajar verifikasi",
      goal:
        "Melatih kemampuan berhenti, berpikir, dan mengecek sumber sebelum bertindak.",
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
Pesan terlihat rapi dan meyakinkan.
Namun domain link bukan domain resmi Shopee.

Langkah paling aman adalah membuka aplikasi Shopee langsung.
`,
          reminder: [
            "Brand besar tetap bisa dipalsukan",
            "Cek notifikasi di aplikasi resmi",
            "Domain link harus benar",
          ],
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
Email meniru gaya Google,
namun domain pengirim dan link tidak resmi.

Google hanya menggunakan akun.google.com.
`,
          reminder: [
            "Periksa domain pengirim email",
            "Login manual ke akun resmi",
            "Jangan klik link keamanan dari email acak",
          ],
        },
      ],
    },

    3: {
      label: "Level 3 · Critical Judgment",
      subtitle: "Uji ketelitian",
      goal:
        "Pesan terlihat sangat profesional. Fokus mencari kejanggalan kecil.",
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
Kamu berhasil menemukan indikator utama.

Bank tidak meminta update data via WhatsApp,
dan domain umum sering digunakan phishing.
`,
            wrong: `
Nada formal sering dipakai untuk menyamarkan penipuan.
Fokuslah pada jalur komunikasi dan domain.
`,
          },
          reminder: [
            "Bank tidak update data via chat",
            "Domain resmi bank selalu jelas",
            "Jangan isi data dari link eksternal",
          ],
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
HTTPS wajib untuk layanan perbankan.
Tekanan waktu adalah teknik manipulasi emosi.
`,
            wrong: `
Detail teknis sering dipakai untuk memberi kesan sah.
Namun justru itu jebakan.
`,
          },
          reminder: [
            "Website bank wajib HTTPS",
            "Ultimatum waktu = red flag",
            "Akses hanya lewat aplikasi resmi",
          ],
        },
      ],
    },
  }), []);

  const currentLevel = levels[level];
  const currentCase = currentLevel.cases[caseIndex];

  const isCorrect =
    level === 3
      ? selected.length === currentCase.correctOptions.length &&
        selected.every(o =>
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
    <div className="min-h-[800px] bg-emerald-50 rounded-3xl p-8 md:p-12">
      {/* HERO / LEVEL SELECT */}
      {screen === "levelSelect" && (
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl p-10">
            <p className="text-sm font-semibold text-emerald-700">
              SELAMAT BELAJAR
            </p>
            <h2 className="text-4xl font-bold mt-2">
              Simulasi Anti-Phishing
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl">
              Latihan interaktif untuk melatih refleks aman,
              kemampuan analisis, dan ketelitian menghadapi pesan penipuan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(lvl => (
              <div
                key={lvl}
                className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-emerald-600">
                    {levels[lvl].subtitle}
                  </p>
                  <h3 className="text-xl font-bold mt-1">
                    {levels[lvl].label}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3">
                    {levels[lvl].goal}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setLevel(lvl);
                    setCaseIndex(0);
                    setScreen("scenario");
                  }}
                  className="mt-6 px-5 py-2 rounded-full bg-emerald-600 text-white font-medium"
                >
                  Mulai Simulasi →
                </button>
              </div>
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
            ← Kembali
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
                Pilih <b>2 indikator paling mencurigakan</b>:
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
                disabled={
                  selected.length !==
                  currentCase.correctOptions.length
                }
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

          {/* PENTING DIINGAT */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-bold text-red-700 mb-2">
              Penting untuk Diingat
            </h4>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              {currentCase.reminder.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
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
            Kamu telah menyelesaikan seluruh simulasi.
            Ingat: penipu menang saat kita panik, bukan saat kita berpikir.
          </p>
        </div>
      )}
    </div>
  );
}
