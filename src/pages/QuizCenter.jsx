import React, { useMemo, useState } from "react";
import { CheckCircle2, XCircle, Award, BookOpen, ArrowLeft, Home, AlertCircle, TrendingUp } from "lucide-react";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

  const progressPercent = checked ? score100 : Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 shadow-xl">
          <div className="p-8">
            <div className="flex items-center gap-3 text-green-100">
              <Award className="h-6 w-6" />
              <span className="text-sm font-bold uppercase tracking-wider">MoneEdu • Evaluasi Pembelajaran</span>
            </div>
            <h1 className="mt-3 text-4xl font-bold text-white">
              Kuis Literasi Fintech
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-green-50">
              Uji pemahaman kamu tentang fintech, keamanan digital, dan literasi keuangan melalui 15 pertanyaan komprehensif.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30">
                <Home className="h-4 w-4" />
                Beranda
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar Hasil */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-4">
              {/* Progress Card */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="text-lg font-bold">
                      {checked ? "Hasil Evaluasi" : "Progres Pengerjaan"}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  {/* Circular Progress */}
                  <div className="flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-40 w-40 -rotate-90 transform">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke={checked ? (score100 >= 70 ? "#10b981" : "#ef4444") : "#10b981"}
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercent / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-slate-900">
                          {checked ? score100 : progressPercent}
                        </div>
                        <div className="text-sm font-semibold text-slate-500">
                          {checked ? "Nilai" : "Progress"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
                      <span className="text-sm font-semibold text-slate-600">Terjawab</span>
                      <span className="text-lg font-bold text-green-700">
                        {answeredCount}/{questions.length}
                      </span>
                    </div>

                    {checked && (
                      <>
                        <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                          <span className="text-sm font-semibold text-slate-600">Jawaban Benar</span>
                          <span className="text-lg font-bold text-emerald-700">
                            {correctCount}/{questions.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 p-4">
                          <span className="text-sm font-semibold text-slate-600">Nilai Akhir</span>
                          <span className="text-2xl font-bold text-green-700">
                            {score100}/100
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Feedback */}
                  {checked ? (
                    <div className="mt-6 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
                      <div className="flex items-start gap-3">
                        <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <div>
                          <div className="font-bold text-green-900">Umpan Balik</div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            {getFeedback()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <div>
                          <div className="font-bold text-blue-900">Tips Pengerjaan</div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            Kalau ragu, ingat prinsip aman: verifikasi sumber, jangan bagikan OTP, dan hindari klik link mencurigakan.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={checkQuiz}
                      disabled={answeredCount < questions.length || checked}
                      className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-green-600 disabled:hover:to-emerald-600"
                    >
                      <CheckCircle2 className="mr-2 inline h-5 w-5" />
                      Cek Jawaban
                    </button>
                    <button className="w-full rounded-xl border-2 border-green-600 bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
                      <BookOpen className="mr-2 inline h-5 w-5" />
                      Buka Modul
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-8">
            <div className="space-y-5">
              {questions.map((item, qi) => (
                <div
                  key={qi}
                  className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="border-b-2 border-slate-100 bg-gradient-to-r from-slate-50 to-green-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1 text-xs font-bold text-white">
                          Soal {qi + 1}
                        </div>
                        <h3 className="mt-2 text-lg font-bold leading-relaxed text-slate-900">
                          {item.q}
                        </h3>
                      </div>

                      {checked ? (
                        <div
                          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-bold ${
                            answers[qi] === item.answer
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {answers[qi] === item.answer ? (
                            <>
                              <CheckCircle2 className="h-5 w-5" />
                              Benar
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5" />
                              Salah
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`rounded-xl px-4 py-2 text-xs font-bold ${
                            typeof answers[qi] === "number"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {typeof answers[qi] === "number" ? "✓ Terjawab" : "Belum dijawab"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 p-5">
                    {item.options.map((opt, oi) => {
                      let baseClass = "relative w-full rounded-xl border-2 p-4 text-left transition-all ";
                      let contentClass = "flex items-start gap-3";

                      if (!checked) {
                        if (answers[qi] === oi) {
                          baseClass += "border-green-500 bg-green-50 shadow-md ring-2 ring-green-200";
                        } else {
                          baseClass += "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50/50 hover:shadow-sm";
                        }
                      } else {
                        if (oi === item.answer) {
                          baseClass += "border-green-500 bg-green-50 ring-2 ring-green-300";
                        } else if (answers[qi] === oi) {
                          baseClass += "border-red-500 bg-red-50 ring-2 ring-red-300";
                        } else {
                          baseClass += "border-slate-200 bg-slate-50";
                        }
                      }

                      return (
                        <button
                          key={oi}
                          onClick={() => pickAnswer(qi, oi)}
                          className={baseClass}
                          disabled={checked}
                        >
                          <div className={contentClass}>
                            <div
                              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold ${
                                !checked && answers[qi] === oi
                                  ? "border-green-600 bg-green-600 text-white"
                                  : checked && oi === item.answer
                                  ? "border-green-600 bg-green-600 text-white"
                                  : checked && answers[qi] === oi
                                  ? "border-red-600 bg-red-600 text-white"
                                  : "border-slate-300 text-slate-400"
                              }`}
                            >
                              {String.fromCharCode(65 + oi)}
                            </div>
                            <div className="flex-1 pt-0.5 font-medium text-slate-800">
                              {opt}
                            </div>
                            {!checked && answers[qi] === oi && (
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                            )}
                            {checked && oi === item.answer && (
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                            )}
                            {checked && answers[qi] === oi && oi !== item.answer && (
                              <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Bottom Actions */}
              <div className="flex flex-wrap gap-3 rounded-2xl bg-white p-6 shadow-sm">
                <button
                  onClick={checkQuiz}
                  disabled={answeredCount < questions.length || checked}
                  className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 className="mr-2 inline h-5 w-5" />
                  Cek Semua Jawaban
                </button>
                <button className="rounded-xl border-2 border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Home className="mr-2 inline h-5 w-5" />
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
