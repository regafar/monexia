import React, { useState, useMemo } from "react";

export default function AntiPhishingSimulationFinal() {
  const [level, setLevel] = useState(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState("scenario");
  // scenario | observe | consequence | explanation | done
  const [action, setAction] = useState(null);
  const [observations, setObservations] = useState([]);

  const levels = useMemo(() => ({
    1: {
      label: "LEVEL 1 · DASAR (AWARENESS)",
      goal:
        "Di level ini, kamu dilatih untuk membangun refleks awal: berhenti sejenak dan tidak asal klik.",
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
          correct: "Abaikan",
          actions: ["Abaikan", "Klik Link"],
          consequences: {
            Abaikan: {
              verdict: "BENAR",
              narrative:
                "Kamu memilih tidak bereaksi spontan. Pesan ini sengaja dibuat menekan agar korban panik dan langsung klik.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Link mengarah ke halaman palsu yang meniru website bank. Jika ini nyata, data loginmu akan dicuri.",
            },
          },
          solution:
            "Bank tidak pernah mengirim link verifikasi lewat SMS. Abaikan pesan seperti ini dan hubungi call center resmi.",
        },
        {
          title: "Hadiah Undian Pelanggan",
          channel: "SMS",
          sender: "INFO UNDIAN",
          message: `Selamat! Nomor Anda terpilih sebagai pemenang hadiah Rp25.000.000.

Segera lakukan konfirmasi agar hadiah tidak hangus:
http://klaim-hadiah-pelanggan.id`,
          correct: "Abaikan",
          actions: ["Abaikan", "Klik Link"],
          consequences: {
            Abaikan: {
              verdict: "BENAR",
              narrative:
                "Kamu tidak tergiur iming-iming hadiah besar. Ini contoh phishing yang bermain di emosi senang.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Form palsu di balik link ini bertujuan mengumpulkan data pribadi dan nomor rekening.",
            },
          },
          solution:
            "Jika kamu tidak pernah ikut undian apa pun, abaikan. Program resmi selalu diumumkan di kanal resmi.",
        },
      ],
    },

    2: {
      label: "LEVEL 2 · MENENGAH (ANALISIS)",
      goal:
        "Di level ini, kamu belajar bahwa tidak semua pesan terlihat mencurigakan. Verifikasi adalah kunci.",
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

Silakan lakukan verifikasi agar pesanan tidak dibatalkan:
https://shopee-verifikasi-id.my.id

Terima kasih.`,
          correct: "Cek Sumber Resmi",
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          consequences: {
            Abaikan: {
              verdict: "CUKUP AMAN",
              narrative:
                "Mengabaikan membuatmu aman, tetapi kamu belum memastikan apakah pesananmu benar-benar bermasalah.",
            },
            "Cek Sumber Resmi": {
              verdict: "BENAR",
              narrative:
                "Kamu membuka aplikasi Shopee secara langsung dan tidak menemukan notifikasi apa pun. Ini langkah paling ideal.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Link membawa ke website palsu dengan tampilan sangat mirip Shopee. Login di sini berarti menyerahkan akunmu.",
            },
          },
          solution:
            "Selalu cek aplikasi resmi dengan membukanya sendiri, bukan dari link pesan.",
        },
        {
          title: "Peringatan Keamanan Akun Google",
          channel: "Email",
          sender: "Google Security <security@google-verifikasi.co>",
          message: `Kami mendeteksi aktivitas login tidak biasa pada akun Gmail Anda.

Segera amankan akun dengan melakukan verifikasi:
https://gmail-security-check.my.id

Jika tidak diverifikasi, akses akun akan dibatasi.`,
          correct: "Cek Sumber Resmi",
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          consequences: {
            Abaikan: {
              verdict: "CUKUP AMAN",
              narrative:
                "Kamu terhindar dari phishing, tetapi belum memastikan kondisi akunmu.",
            },
            "Cek Sumber Resmi": {
              verdict: "BENAR",
              narrative:
                "Kamu login ke akun Google melalui website resmi dan mengecek menu Security secara langsung.",
            },
            "Klik Link": {
              verdict: "SALAH",
              narrative:
                "Domain email dan link tidak resmi. Ini teknik phishing yang sangat umum.",
            },
          },
          solution:
            "Periksa domain pengirim dan jangan percaya link dengan alamat mencurigakan.",
        },
      ],
    },

    3: {
      label: "LEVEL 3 · LANJUTAN (CRITICAL JUDGMENT)",
      goal:
        "Level tersulit. Pesan terlihat sangat profesional. Kamu harus mengamati detail sebelum bertindak.",
      cases: [
        {
          title: "Permintaan Update Data Nasabah",
          channel: "WhatsApp",
          sender: "CS Bank Nasional",
          message: `Yth. Nasabah,

Sehubungan dengan pembaruan sistem, kami membutuhkan konfirmasi data Anda hari ini.

Mohon isi formulir berikut:
https://update-data-nasabah.site

Terima kasih atas kerja samanya.`,
          observations: [
            "Link formulir menggunakan domain umum",
            "Tidak menyebut nama nasabah",
            "Permintaan data via WhatsApp",
            "Nada pesan sangat formal",
          ],
          correctObservations: [
            "Link formulir menggunakan domain umum",
            "Permintaan data via WhatsApp",
          ],
          correct: "Abaikan",
          actions: ["Abaikan", "Isi Formulir"],
          consequences: {
            Abaikan: {
              verdict: "BENAR",
              narrative:
                "Kamu menyadari bahwa pembaruan data tidak pernah dilakukan melalui WhatsApp atau link formulir.",
            },
            "Isi Formulir": {
              verdict: "SALAH",
              narrative:
                "Form ini dirancang untuk mengumpulkan data sensitif seperti NIK dan nomor rekening.",
            },
          },
          solution:
            "Pembaruan data nasabah hanya dilakukan melalui aplikasi resmi atau kantor cabang.",
        },
      ],
    },
  }), []);

  const currentLevel = levels[level];
  const currentCase = currentLevel.cases[caseIndex];

  const toggleObservation = (item) => {
    setObservations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const observationValid =
    level === 3 &&
    observations.length === 2 &&
    observations.every((o) =>
      currentCase.correctObservations.includes(o)
    );

  const handleAction = (a) => {
    setAction(a);
    setStage("consequence");
  };

  const goBack = () => {
    if (stage === "observe") setStage("scenario");
    if (stage === "consequence") setStage(level === 3 ? "observe" : "scenario");
    if (stage === "explanation") setStage("consequence");
  };

  const next = () => {
    if (caseIndex < currentLevel.cases.length - 1) {
      setCaseIndex(caseIndex + 1);
      setStage("scenario");
      setAction(null);
      setObservations([]);
    } else if (level < 3) {
      setLevel(level + 1);
      setCaseIndex(0);
      setStage("scenario");
      setAction(null);
      setObservations([]);
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

          <div className="flex flex-wrap gap-3">
            {currentCase.actions.map((a) => (
              <button
                key={a}
                onClick={() =>
                  level === 3 ? setStage("observe") : handleAction(a)
                }
                className="px-5 py-2.5 rounded-lg font-medium bg-emerald-600 text-white"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === "observe" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-xl font-bold">
            Amati Pesan Ini Lebih Teliti
          </h3>
          <p className="text-slate-600">
            Tandai <strong>2 hal</strong> yang menurutmu terasa janggal atau tidak wajar.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {currentCase.observations.map((o) => (
              <button
                key={o}
                onClick={() => toggleObservation(o)}
                className={`px-4 py-3 rounded-lg text-left border ${
                  observations.includes(o)
                    ? "bg-emerald-50 border-emerald-600"
                    : "border-slate-200"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-3">
            <button
              onClick={goBack}
              className="px-4 py-2 rounded-lg border"
            >
              Kembali
            </button>
            <button
              disabled={!observationValid}
              onClick={() => setStage("scenario")}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}

      {stage === "consequence" && (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl space-y-4">
          <h3 className="text-xl font-bold">
            Keputusan Kamu:{" "}
            <span
              className={
                currentCase.consequences[action].verdict === "BENAR"
                  ? "text-emerald-600"
                  : "text-red-600"
              }
            >
              {currentCase.consequences[action].verdict}
            </span>
          </h3>
          <p className="text-slate-700">
            {currentCase.consequences[action].narrative}
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="font-semibold mb-1">Solusi Aman</p>
            <p className="text-sm text-slate-700">
              {currentCase.solution}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={goBack}
              className="px-4 py-2 rounded-lg border"
            >
              Kembali
            </button>
            <button
              onClick={next}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Lanjut
            </button>
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 max-w-3xl">
          <h3 className="text-xl font-bold text-emerald-700 mb-2">
            🎉 Simulasi Selesai
          </h3>
          <p className="text-slate-700">
            Kamu telah melewati semua simulasi. Ingat: penipu memanfaatkan emosi,
            bukan logika. Berhenti, pikirkan, dan verifikasi.
          </p>
        </div>
      )}
    </div>
  );
}
