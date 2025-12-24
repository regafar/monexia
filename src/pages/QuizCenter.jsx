import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { addXPOnce, getProgress } from "../data/progressStore";

const questions = [
  {
    q: "Seseorang yang sebelumnya tidak memiliki rekening bank kini dapat menyimpan dan mengirim uang melalui aplikasi. Kondisi ini menunjukkan peran fintech dalam hal…",
    options: [
      "Meningkatkan konsumsi digital",
      "Mendorong inklusi keuangan",
      "Menghilangkan peran lembaga keuangan",
      "Membatasi akses layanan keuangan"
    ],
    answer: 1
  },
  {
    q: "Fintech sering disebut sebagai jembatan antara teknologi dan keuangan karena…",
    options: [
      "Menggunakan internet sebagai media hiburan",
      "Menggabungkan inovasi teknologi dengan layanan finansial",
      "Menggantikan seluruh sistem perbankan",
      "Beroperasi tanpa aturan"
    ],
    answer: 1
  },
  {
    q: "Penggunaan fintech tanpa pemahaman yang baik dapat menimbulkan risiko karena…",
    options: [
      "Semua fintech memiliki biaya tinggi",
      "Teknologi selalu gagal",
      "Pengguna dapat salah mengambil keputusan finansial",
      "Fintech tidak bisa diakses masyarakat"
    ],
    answer: 2
  },
  {
    q: "Literasi keuangan digital membantu pengguna terutama dalam hal…",
    options: [
      "Mengikuti tren aplikasi populer",
      "Memahami manfaat, risiko, dan tanggung jawab sebagai pengguna",
      "Menghindari seluruh layanan keuangan digital",
      "Menggunakan fintech tanpa membaca ketentuan"
    ],
    answer: 1
  },
  {
    q: "Fitur pembayaran menggunakan QR di berbagai merchant merupakan contoh penerapan fintech pada bidang…",
    options: ["Pendukung pasar", "Manajemen investasi", "Sistem pembayaran", "Crowdfunding"],
    answer: 2
  },
  {
    q: "Aplikasi yang menampilkan perbandingan produk pinjaman dari berbagai penyedia berperan sebagai…",
    options: ["Lembaga pembiayaan", "Market aggregator", "Penyedia modal", "Manajer investasi"],
    answer: 1
  },
  {
    q: "Platform yang mempertemukan pemberi dana dan peminjam secara langsung termasuk kategori…",
    options: ["Sistem pembayaran", "Pendukung pasar", "Peminjaman dan pembiayaan", "Jasa finansial lainnya"],
    answer: 2
  },
  {
    q: "Aplikasi yang membantu pengguna mengelola portofolio investasi secara digital termasuk dalam fintech…",
    options: ["Manajemen investasi dan risiko", "Sistem pembayaran", "Pendukung pasar", "Crowdfunding"],
    answer: 0
  },
  {
    q: "Layanan asuransi digital dan remitansi online dikelompokkan ke dalam…",
    options: ["Pendukung pasar", "Jasa finansial lainnya", "Manajemen investasi", "Sistem pembayaran"],
    answer: 1
  },
  {
    q: "Jika seseorang meminta kode verifikasi dengan alasan pembaruan akun, tindakan paling tepat adalah…",
    options: [
      "Memberikan kode agar proses cepat",
      "Mengabaikan dan mengecek lewat aplikasi resmi",
      "Mengirim ulang data pribadi",
      "Menyimpan kode di pesan"
    ],
    answer: 1
  },
  {
    q: "Mengapa pengguna disarankan tidak mengklik tautan dari pesan yang tidak dikenal?",
    options: [
      "Karena internet lambat",
      "Karena tautan bisa mengandung malware atau phishing",
      "Karena semua pesan tidak penting",
      "Karena aplikasi akan rusak"
    ],
    answer: 1
  },
  {
    q: "Salah satu indikator pesan penipuan adalah…",
    options: [
      "Menggunakan bahasa formal dan tenang",
      "Memberi waktu berpikir yang cukup",
      "Mendesak pengguna agar segera bertindak",
      "Mengarah ke aplikasi resmi"
    ],
    answer: 2
  },
  {
    q: "Perlindungan data pribadi dalam fintech penting karena…",
    options: ["Data tidak memiliki nilai", "Data dapat disalahgunakan untuk kejahatan finansial", "Semua data aman otomatis", "Pengguna tidak perlu peduli"],
    answer: 1
  },
  {
    q: "Keberadaan regulasi fintech bertujuan utama untuk…",
    options: ["Membatasi penggunaan teknologi", "Melindungi konsumen dan menjaga stabilitas sistem", "Menguntungkan perusahaan tertentu", "Menghilangkan risiko sepenuhnya"],
    answer: 1
  },
  {
    q: "Ketika terjadi penipuan transaksi digital, langkah yang paling tepat dilakukan pengguna adalah…",
    options: ["Menghubungi pelaku penipuan", "Menyebarkan data di media sosial", "Mengumpulkan bukti dan melapor melalui jalur resmi", "Menghapus akun tanpa laporan"],
    answer: 2
  }
];

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export default function QuizCenter() {
  const nav = useNavigate();
  const progress = getProgress();

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  function pickAnswer(qi, oi) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  }

  function checkQuiz() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1;
    });

    setCorrectCount(correct);
    setChecked(true);

    // XP hanya sekali (sudah di-handle di progressStore lewat addXPOnce key)
    addXPOnce("quiz_final_score", 30, "Menyelesaikan kuis utama");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Skor skala 1–100
  const score100 = useMemo(() => {
    const raw = Math.round((correctCount / questions.length) * 100);
    return clamp(raw, 0, 100);
  }, [correctCount]);

  function getFeedback() {
    if (score100 >= 85) return "Sangat baik. Kamu sudah memahami materi fintech dan risikonya dengan kuat.";
    if (score100 >= 70) return "Baik. Kamu sudah paham, tinggal perkuat bagian keamanan digital dan verifikasi sumber.";
    if (score100 >= 55) return "Cukup. Coba baca ulang modul jenis fintech dan regulasi agar makin yakin.";
    return "Perlu belajar ulang. Fokus pada keamanan digital, phishing, OTP, dan jalur pelaporan resmi.";
  }

  const ringStyle = useMemo(() => {
    const pct = checked ? score100 : Math.round((answeredCount / questions.length) * 100);
    const deg = Math.round((pct / 100) * 360);
    return {
      background: `conic-gradient(#16a34a ${deg}deg, #e5e7eb 0deg)`
    };
  }, [checked, score100, answeredCount]);

  return (
    <div className="space-y-6">
      {/* Header seperti referensi */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-500">MoneEdu • Kuis</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">
              Kuis Evaluasi Literasi Fintech
            </div>
            <div className="mt-2 max-w-2xl text-sm text-slate-600">
              Jawab 15 pertanyaan untuk menguji pemahaman kamu dari seluruh modul pembelajaran.
              Nilai akhir menggunakan skala 1–100.
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-600">
                Terjawab: {answeredCount}/{questions.length}
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-extrabold text-green-800">
                XP: {progress.xp}/300
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={() => nav(-1)}>← Kembali</SecondaryButton>
            <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
          </div>
        </div>
      </div>

      {/* Ringkasan progress / hasil */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-extrabold text-slate-900">
              {checked ? "Hasil Kuis" : "Progres Kuis"}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              {checked
                ? "Lihat nilai akhir dan jumlah jawaban benar."
                : "Selesaikan semua soal, lalu klik Cek Jawaban."}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full p-[6px]" style={ringStyle}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-extrabold text-slate-900">
                  {checked ? `${score100}` : `${Math.round((answeredCount / questions.length) * 100)}%`}
                </div>
              </div>

              <div className="flex-1">
                {checked ? (
                  <>
                    <div className="text-xs font-semibold text-slate-500">Jawaban benar</div>
                    <div className="mt-1 text-lg font-extrabold text-slate-900">
                      {correctCount}/{questions.length}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-slate-500">Nilai akhir</div>
                    <div className="mt-1 text-2xl font-extrabold text-green-700">
                      {score100}/100
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-semibold text-slate-500">Checklist</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      Pastikan semua soal terjawab
                    </div>
                    <div className="mt-2 text-xs text-slate-600">
                      Kamu baru bisa cek jawaban setelah 15 soal terisi.
                    </div>
                  </>
                )}
              </div>
            </div>

            {checked ? (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-slate-700">
                <div className="font-extrabold text-green-800">Feedback</div>
                <div className="mt-1">{getFeedback()}</div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Tips: kalau ragu, ingat prinsip aman: verifikasi sumber, jangan bagikan OTP, dan hindari klik link mencurigakan.
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <PrimaryButton
                onClick={checkQuiz}
                disabled={answeredCount < questions.length || checked}
              >
                Cek Jawaban
              </PrimaryButton>
              <SecondaryButton onClick={() => nav("/modul")}>Buka Modul</SecondaryButton>
            </div>
          </div>
        </div>

        {/* Daftar pertanyaan */}
        <div className="lg:col-span-8">
          <Card
            title="Pertanyaan"
            desc="Pilih satu jawaban untuk setiap nomor. Setelah dicek, jawaban tidak bisa diubah."
          >
            <div className="space-y-4">
              {questions.map((item, qi) => (
                <div key={qi} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-500">Soal {qi + 1}</div>
                      <div className="mt-1 text-sm font-extrabold text-slate-900">
                        {item.q}
                      </div>
                    </div>

                    {checked ? (
                      <div
                        className={
                          "rounded-2xl px-3 py-1 text-xs font-extrabold " +
                          (answers[qi] === item.answer
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white")
                        }
                      >
                        {answers[qi] === item.answer ? "Benar" : "Salah"}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-600">
                        {typeof answers[qi] === "number" ? "Terjawab" : "Belum"}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2">
                    {item.options.map((opt, oi) => {
                      let cls = "rounded-2xl border p-3 text-left text-sm transition";

                      if (!checked) {
                        cls += answers[qi] === oi
                          ? " border-green-300 bg-green-50"
                          : " border-slate-200 hover:bg-slate-50";
                      } else {
                        if (oi === item.answer) cls += " border-green-300 bg-green-50";
                        else if (answers[qi] === oi) cls += " border-red-300 bg-red-50";
                        else cls += " border-slate-200 bg-white";
                      }

                      return (
                        <button
                          key={oi}
                          onClick={() => pickAnswer(qi, oi)}
                          className={cls}
                          disabled={checked}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-slate-800">{opt}</div>
                            {!checked && answers[qi] === oi ? (
                              <div className="text-xs font-extrabold text-green-700">Dipilih</div>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2">
                <PrimaryButton
                  onClick={checkQuiz}
                  disabled={answeredCount < questions.length || checked}
                >
                  Cek Jawaban
                </PrimaryButton>

                <SecondaryButton onClick={() => nav("/")}>
                  Kembali ke Home
                </SecondaryButton>
              </div>

              <div className="text-xs text-slate-500">
                XP saat ini: {progress.xp}/300
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
