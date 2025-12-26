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
          message: `⚠️ PERINGATAN TERAKHIR ⚠️

Sistem kami mendeteksi aktivitas tidak wajar pada rekening Anda.
Jika TIDAK dikonfirmasi hari ini, akun akan diblokir otomatis
dan seluruh transaksi akan dihentikan.

👉 Konfirmasi sekarang:
http://bank-verifikasi-akun.co`,
          actions: ["Abaikan", "Klik Link"],
          correct: "Abaikan",
          explanation: `
Pesan ini dirancang untuk menciptakan rasa panik dan takut kehilangan akses ke uang Anda.

Penipu sengaja menggunakan kata seperti "PERINGATAN TERAKHIR", "hari ini", dan "diblokir"
agar korban bereaksi cepat tanpa berpikir jernih.

Dalam praktik nyata:
- Bank tidak pernah meminta verifikasi melalui link SMS
- Pemblokiran rekening tidak dilakukan sepihak hanya dari satu pesan
- Nasabah selalu diarahkan ke aplikasi atau kantor cabang resmi

Mengklik link semacam ini berisiko pencurian data login dan OTP,
yang dapat berujung pada pengurasan saldo.
`,
          reminder: [
            "Bank tidak mengirim link verifikasi via SMS",
            "Pesan mendesak bertujuan memicu panik",
            "Akses rekening hanya lewat aplikasi resmi",
          ],
        },
        {
          title: "Hadiah Undian Pelanggan",
          channel: "SMS",
          sender: "INFO UNDIAN",
          message: `🎉 SELAMAT ANDA PEMENANG 🎉

Nomor Anda terdaftar sebagai pemenang undian pelanggan
dengan hadiah utama Rp25.000.000 (dua puluh lima juta rupiah).

Hadiah harus diklaim hari ini.
Isi data Anda melalui link berikut:
http://klaim-hadiah-pelanggan.id`,
          actions: ["Abaikan", "Klik Link"],
          correct: "Abaikan",
          explanation: `
Modus hadiah adalah salah satu teknik penipuan paling umum.

Penipu memanfaatkan emosi senang dan rasa tidak ingin kehilangan kesempatan.
Korban sering lupa bertanya:
"Undian apa?" dan "Kapan saya ikut?"

Ciri kuat penipuan pada pesan ini:
- Tidak menyebutkan penyelenggara yang jelas
- Tidak ada informasi program undian yang pernah diikuti
- Mendesak klaim dalam waktu singkat

Jika data pribadi atau biaya administrasi diminta,
korban berisiko mengalami kerugian finansial dan penyalahgunaan identitas.
`,
          reminder: [
            "Undian resmi selalu transparan",
            "Hadiah tanpa konteks hampir pasti penipuan",
            "Jangan klik link hadiah dari nomor asing",
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

Halo Kak,
kami informasikan bahwa pesanan Anda saat ini
DITAHAN karena terdeteksi aktivitas tidak biasa.

📦 ID Pesanan: 88219301  
Agar pesanan tidak dibatalkan otomatis,
silakan lakukan verifikasi akun melalui link berikut:
https://shopee-verifikasi-id.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation: `
Pesan ini terlihat sangat meyakinkan karena:
- Menggunakan nama brand besar
- Gaya bahasa sopan dan profesional
- Menyebutkan ID pesanan

Namun, ada satu kejanggalan krusial:
link yang digunakan bukan domain resmi Shopee.

Penipu tahu bahwa korban sering panik soal pesanan online,
sehingga cenderung langsung klik tanpa membuka aplikasi.

Langkah paling aman adalah:
membuka aplikasi Shopee secara manual
dan mengecek notifikasi di dalam aplikasi, bukan dari chat.
`,
          reminder: [
            "Nama brand bisa dipalsukan",
            "Link resmi Shopee hanya shopee.co.id",
            "Cek pesanan langsung di aplikasi",
          ],
        },
        {
          title: "Keamanan Akun Google",
          channel: "Email",
          sender: "Google Security <security@google-verifikasi.co>",
          message: `Kami mendeteksi login mencurigakan ke akun Google Anda.

Perangkat baru mencoba mengakses akun Anda dari lokasi berbeda.
Jika aktivitas ini bukan Anda, akun berisiko diambil alih.

Amankan akun Anda segera:
https://gmail-security-check.my.id`,
          actions: ["Abaikan", "Cek Sumber Resmi", "Klik Link"],
          correct: "Cek Sumber Resmi",
          explanation: `
Email keamanan sering dijadikan senjata phishing
karena korban takut kehilangan akses email.

Sekilas email ini terlihat sah,
namun terdapat tanda berbahaya:
- Domain pengirim bukan google.com
- Link tidak mengarah ke akun.google.com

Jika korban memasukkan email dan password,
penipu bisa langsung mengambil alih akun,
mengakses data pribadi, dan melakukan reset akun lain.
`,
          reminder: [
            "Google hanya pakai domain resmi",
            "Jangan klik link keamanan dari email",
            "Login manual ke akun.google.com",
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

Sesuai ketentuan OJK terbaru,
seluruh nasabah WAJIB melakukan validasi ulang data.

Apabila tidak dilakukan hari ini,
layanan transfer dan kartu ATM akan dinonaktifkan.

Silakan isi formulir validasi berikut:
https://bank-validasi-nasabah.com/form`,
          options: [
            "Permintaan data lewat WhatsApp",
            "Ancaman penonaktifan layanan",
            "Mengatasnamakan OJK",
            "Nada pesan formal",
          ],
          correctOptions: [
            "Permintaan data lewat WhatsApp",
            "Ancaman penonaktifan layanan",
          ],
          explanation: {
            correct: `
Kamu berhasil mengenali indikator berbahaya utama.

Bank tidak pernah meminta data sensitif melalui WhatsApp.
Selain itu, ancaman penonaktifan layanan adalah teknik tekanan psikologis.

Penipu sering mencatut nama lembaga resmi seperti OJK
untuk meningkatkan kepercayaan korban.
`,
            wrong: `
Nada formal dan penyebutan lembaga resmi
sering digunakan untuk menipu korban.

Fokuslah pada jalur komunikasi dan bentuk ancaman,
bukan sekadar gaya bahasa.
`,
          },
          reminder: [
            "Bank tidak minta data lewat chat",
            "Ancaman layanan dinonaktifkan = red flag",
            "Validasi hanya lewat kanal resmi",
          ],
        },
        {
          title: "Login Baru Internet Banking",
          channel: "Email",
          sender: "BCA Support <noreply@bca-support.co.id>",
          message: `Pemberitahuan Keamanan BCA

Kami mendeteksi login baru pada akun Internet Banking Anda.

⏰ 26 Desember 2025  
📍 Android – Jakarta

Jika ini bukan Anda, segera lakukan verifikasi keamanan:
http://klikbca-security.com

Akses akan dibatasi otomatis dalam 60 menit.`,
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
Layanan perbankan wajib menggunakan HTTPS,
bukan HTTP yang tidak terenkripsi.

Batas waktu 60 menit adalah teknik klasik phishing
untuk membuat korban bertindak terburu-buru.

Detail lokasi dan waktu sengaja ditambahkan
agar pesan terlihat sah.
`,
            wrong: `
Detail teknis sering mengecoh korban.

Namun keamanan website dan tekanan waktu
adalah indikator yang jauh lebih penting.
`,
          },
          reminder: [
            "Website bank selalu HTTPS",
            "Tekanan waktu = manipulasi emosi",
            "Akses rekening hanya lewat aplikasi",
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
