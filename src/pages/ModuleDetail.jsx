import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { modules } from "../data/content";
import { addXPOnce, awardBadgeOnce, completeModuleOnce, getProgress } from "../data/progressStore";

const miniQuizBank = {
  "apa-itu-fintech": [
    {
      q: "Fintech paling tepat berarti…",
      options: [
        "Aplikasi hiburan yang punya fitur transfer",
        "Layanan keuangan yang dipermudah teknologi",
        "Semua hal tentang kripto",
        "Satu perusahaan dompet digital"
      ],
      answer: 1,
      explain: "Fintech adalah layanan keuangan yang dibuat atau dipermudah dengan teknologi."
    },
    {
      q: "Risiko fintech yang paling sering terjadi adalah…",
      options: ["Antrian panjang", "Phishing dan pencurian OTP", "Keterlambatan pos", "Uang tunai rusak"],
      answer: 1,
      explain: "Phishing dan pencurian OTP adalah modus yang sering terjadi di layanan digital."
    },
    {
      q: "Literasi keuangan digital membantu pengguna untuk…",
      options: [
        "Membagikan OTP ke CS",
        "Mengabaikan syarat dan biaya",
        "Memahami manfaat, biaya, risiko, dan cara pakai aman",
        "Selalu ikut tren produk"
      ],
      answer: 2,
      explain: "Literasi digital membuat pengguna paham cara kerja, biaya, risiko, dan keamanan."
    }
  ],

  "jenis-jenis-fintech": [
    {
      q: "Payment, settlement, dan clearing masuk kategori…",
      options: ["Market aggregator", "Sistem pembayaran", "Manajemen investasi dan risiko", "Jasa finansial lainnya"],
      answer: 1,
      explain: "Payment, settlement, dan clearing adalah bagian dari sistem pembayaran."
    },
    {
      q: "Market aggregator paling tepat digunakan untuk…",
      options: [
        "Membandingkan produk atau fitur dari banyak penyedia",
        "Meminta OTP untuk verifikasi",
        "Menghapus semua risiko penipuan",
        "Mengubah saldo tanpa transaksi"
      ],
      answer: 0,
      explain: "Aggregator membantu riset dan perbandingan. Keputusan akhir tetap cek sumber resmi."
    },
    {
      q: "Crowdfunding dan P2P lending termasuk kategori…",
      options: ["Sistem pembayaran", "Pendukung pasar", "Peminjaman dan pembiayaan", "Jasa finansial lainnya"],
      answer: 2,
      explain: "Keduanya berfokus pada pendanaan dan pembiayaan."
    }
  ],

  "keamanan-digital": [
    {
      q: "OTP itu seharusnya…",
      options: [
        "Dibagikan ke siapa pun yang mengaku CS",
        "Dikirim ke teman dekat",
        "Dirahasiakan dan tidak dibagikan",
        "Diposting jika diminta admin"
      ],
      answer: 2,
      explain: "OTP adalah kode rahasia. Memberikannya bisa membuat akun diambil alih."
    },
    {
      q: "Ciri pesan penipuan yang umum adalah…",
      options: [
        "Bahasanya tenang dan tidak mendesak",
        "Meminta kamu cepat klik link dan panik",
        "Selalu memakai email resmi",
        "Tidak pernah minta data"
      ],
      answer: 1,
      explain: "Modus sering memakai tekanan waktu, ancaman, atau iming-iming."
    },
    {
      q: "Langkah aman saat dapat link verifikasi mencurigakan adalah…",
      options: ["Klik dulu baru cek", "Kirim OTP agar cepat selesai", "Abaikan, cek lewat aplikasi atau kanal resmi", "Forward ke grup"],
      answer: 2,
      explain: "Verifikasi harus lewat kanal resmi, bukan dari link pesan."
    }
  ],

  "regulasi-dan-perlindungan": [
    {
      q: "Tujuan regulasi fintech adalah…",
      options: ["Menghambat inovasi", "Melindungi konsumen dan memberi kepastian", "Mewajibkan semua orang memakai e-wallet", "Menghapus semua risiko digital"],
      answer: 1,
      explain: "Regulasi bertujuan menjaga layanan tetap aman dan adil bagi konsumen."
    },
    {
      q: "Salah satu prinsip perlindungan konsumen adalah…",
      options: ["OTP boleh diminta CS", "Transparansi biaya, syarat, dan risiko", "Syarat disembunyikan agar cepat", "Komplain tidak perlu"],
      answer: 1,
      explain: "Transparansi membuat pengguna paham konsekuensi sebelum menggunakan layanan."
    },
    {
      q: "Jika jadi korban penipuan transaksi, langkah penting adalah…",
      options: ["Hapus semua bukti", "Kumpulkan bukti dan lapor lewat jalur resmi", "Bayar lagi agar uang kembali", "Berikan password ke pihak tak dikenal"],
      answer: 1,
      explain: "Amankan akun, kumpulkan bukti, dan gunakan jalur resmi untuk pelaporan."
    }
  ]
};

export default function ModuleDetail() {
  const { slug } = useParams();
  const nav = useNavigate();

  const moduleIndex = useMemo(() => modules.findIndex((x) => x.slug === slug), [slug]);
  const module = useMemo(() => modules.find((x) => x.slug === slug), [slug]);

  const [subIndex, setSubIndex] = useState(0);
  const [showAllDone, setShowAllDone] = useState(false);

  const [mqAnswers, setMqAnswers] = useState({});
  const [mqChecked, setMqChecked] = useState(false);

  useEffect(() => {
    setSubIndex(0);
    setShowAllDone(false);
    setMqAnswers({});
    setMqChecked(false);
  }, [slug]);

  const subs = module && module.subchapters ? module.subchapters : [];
  const currentSub = subs.length ? subs[subIndex] : null;

  const hasPrevModule = moduleIndex > 0;
  const hasNextModule = moduleIndex >= 0 && moduleIndex < modules.length - 1;
  const prevModule = hasPrevModule ? modules[moduleIndex - 1] : null;
  const nextModule = hasNextModule ? modules[moduleIndex + 1] : null;

  const isLastSub = subs.length ? subIndex === subs.length - 1 : true;
  const miniQuiz = module ? miniQuizBank[module.slug] || [] : [];
  const canShowMiniQuiz = !!module && isLastSub && miniQuiz.length === 3;

  const canPrevSub = subs.length ? subIndex > 0 : false;
  const canNextSub = subs.length ? subIndex < subs.length - 1 : false;

  function goPrevModule() {
    if (!prevModule) return;
    nav(`/modul/${prevModule.slug}`);
  }

  function goNextModule() {
    if (!nextModule) return;
    nav(`/modul/${nextModule.slug}`);
  }

  function prevSub() {
    setSubIndex((v) => Math.max(0, v - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextSub() {
    setSubIndex((v) => Math.min(subs.length - 1, v + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pickAnswer(qIndex, optIndex) {
    setMqAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  }

  function closeAllDone() {
    setShowAllDone(false);
    nav("/");
  }

  function finalizeModuleOnce(score) {
    if (!module) return;

    completeModuleOnce(module.slug);
    addXPOnce(`module_complete:${module.slug}`, 40, "Selesai modul");

    if (score === 3) addXPOnce(`module_quiz_bonus:${module.slug}`, 20, "Bonus mini kuis");
    else if (score === 2) addXPOnce(`module_quiz_bonus:${module.slug}`, 10, "Bonus mini kuis");

    if (module.slug === "keamanan-digital") awardBadgeOnce("shield");
    if (module.slug === "regulasi-dan-perlindungan") awardBadgeOnce("gavel");
    if (module.slug === "jenis-jenis-fintech") awardBadgeOnce("layers");
    if (module.slug === "apa-itu-fintech") awardBadgeOnce("spark");

    const after = getProgress();
    const allDone = modules.every((m) => after.completedModules.includes(m.slug));
    if (allDone) addXPOnce("all_modules_complete", 60, "Selesai semua modul");

    const isLastModule = moduleIndex === modules.length - 1;
    if (isLastModule && allDone) setShowAllDone(true);
  }

  function checkMiniQuiz() {
    if (!module) return;

    setMqChecked(true);

    let score = 0;
    for (let i = 0; i < miniQuiz.length; i++) {
      if (mqAnswers[i] === miniQuiz[i].answer) score += 1;
    }

    finalizeModuleOnce(score);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  let miniScore = 0;
  if (canShowMiniQuiz) {
    for (let i = 0; i < miniQuiz.length; i++) {
      if (mqAnswers[i] === miniQuiz[i].answer) miniScore += 1;
    }
  }

  const p = getProgress();
  const isDone = module ? p.completedModules.includes(module.slug) : false;

  if (!module) {
    return (
      <Card title="Modul tidak ditemukan" desc="Cek kembali link modulnya.">
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => nav("/modul")}>Kembali ke Modul</SecondaryButton>
          <SecondaryButton onClick={() => nav("/")}>Kembali ke Beranda</SecondaryButton>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showAllDone ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <style>{`
            @keyframes popIn { 0% { transform: scale(.92); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
          `}</style>

          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl" style={{ animation: "popIn 180ms ease-out" }}>
            <div
              className="rounded-3xl p-5 text-center text-white"
              style={{
                background:
                  "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(34,197,94,1) 50%, rgba(16,185,129,1) 100%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 1.4s ease-in-out infinite alternate"
              }}
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">✓</div>
              <div className="text-xl font-extrabold">Kamu sudah menyelesaikan semua modul.</div>
              <div className="mt-2 text-sm text-white/90">
                Mantap. Kamu sudah paham dasar fintech, tahu jenis-jenisnya, bisa menjaga keamanan digital, dan paham jalur perlindungan kalau ada masalah.
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <PrimaryButton onClick={closeAllDone}>Kembali ke Beranda</PrimaryButton>
              <SecondaryButton onClick={() => nav("/modul")}>Buka Daftar Modul</SecondaryButton>
            </div>
          </div>
        </div>
      ) : null}

      <Card title={module.title} desc={module.subtitle}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-extrabold text-slate-600">
            Modul {moduleIndex + 1}/{modules.length} {isDone ? "• Selesai" : ""}
          </div>

          <div className="flex flex-wrap gap-2">
            {hasPrevModule ? (
              <SecondaryButton onClick={goPrevModule}>Modul Sebelumnya</SecondaryButton>
            ) : (
              <div className="rounded-2xl bg-white px-3 py-2 text-xs font-extrabold text-slate-400">Modul Sebelumnya: tidak ada</div>
            )}

            {hasNextModule ? (
              <SecondaryButton onClick={goNextModule}>Modul Selanjutnya</SecondaryButton>
            ) : (
              <div className="rounded-2xl bg-white px-3 py-2 text-xs font-extrabold text-slate-400">Modul Selanjutnya: tidak ada</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-slate-500">
                Subbab {subs.length ? subIndex + 1 : 0}/{subs.length || 0}
              </div>
              <div className="mt-1 text-base font-extrabold">{currentSub ? currentSub.title : "Belum ada subbab"}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <SecondaryButton onClick={prevSub} disabled={!canPrevSub}>
                Subbab Sebelumnya
              </SecondaryButton>
              <SecondaryButton onClick={nextSub} disabled={!canNextSub}>
                Subbab Selanjutnya
              </SecondaryButton>
            </div>
          </div>

          {currentSub ? (
            <div className="mt-4 space-y-3">
              {currentSub.body.map((t, i) => (
                <div key={i} className="text-sm leading-relaxed text-slate-700">
                  {t}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-slate-600">Tambahkan subbab di src/data/content.js.</div>
          )}

          {subs.length ? (
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {subs.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSubIndex(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={
                    i === subIndex
                      ? "rounded-2xl border border-green-300 bg-green-50 p-3 text-left"
                      : "rounded-2xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                  }
                >
                  <div className="text-xs font-extrabold text-slate-500">Subbab {i + 1}</div>
                  <div className="text-sm font-extrabold">{s.title}</div>
                </button>
              ))}
            </div>
          ) : null}

          {canShowMiniQuiz ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-base font-extrabold text-slate-900">Mini Kuis (3 Pertanyaan)</div>
              <div className="mt-1 text-sm text-slate-600">
                XP otomatis tercatat saat kamu klik “Cek Jawaban”. XP untuk aktivitas yang sama hanya dihitung sekali.
              </div>

              <div className="mt-4 space-y-4">
                {miniQuiz.map((item, qi) => {
                  const chosen = mqAnswers[qi];
                  const isAnswered = typeof chosen === "number";
                  const isCorrect = isAnswered && chosen === item.answer;

                  return (
                    <div key={qi} className="rounded-2xl bg-white p-4">
                      <div className="text-sm font-extrabold text-slate-900">
                        {qi + 1}. {item.q}
                      </div>

                      <div className="mt-3 grid gap-2">
                        {item.options.map((opt, oi) => {
                          const selected = chosen === oi;
                          let cls = "rounded-2xl border p-3 text-left text-sm";

                          if (!mqChecked) {
                            cls += selected ? " border-green-300 bg-green-50" : " border-slate-200 hover:bg-slate-50";
                          } else {
                            if (oi === item.answer) cls += " border-green-300 bg-green-50";
                            else if (selected && oi !== item.answer) cls += " border-red-300 bg-red-50";
                            else cls += " border-slate-200";
                          }

                          return (
                            <button key={oi} onClick={() => pickAnswer(qi, oi)} className={cls}>
                              <div className="flex items-start justify-between gap-3">
                                <div className="text-slate-800">{opt}</div>
                                <div className="text-xs font-extrabold text-slate-500">{selected ? "Dipilih" : ""}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {mqChecked ? (
                        <div className="mt-3 text-sm">
                          <div className={isCorrect ? "font-extrabold text-green-700" : "font-extrabold text-red-700"}>
                            {isCorrect ? "Benar" : "Kurang tepat"}
                          </div>
                          <div className="mt-1 text-slate-700">{item.explain}</div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <PrimaryButton onClick={checkMiniQuiz} disabled={Object.keys(mqAnswers).length < 3}>
                  Cek Jawaban
                </PrimaryButton>

                {mqChecked ? (
                  <div className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-800">
                    Skor: {miniScore}/3
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-600">Pilih jawaban untuk semua pertanyaan dulu.</div>
                )}
              </div>
            </div>
          ) : null}

          {/* BAGIAN BAWAH MATERI: HANYA 2 TOMBOL (SUBBAB SEBELUMNYA / SELANJUTNYA) */}
          <div className="mt-6 flex flex-wrap gap-2">
            <SecondaryButton onClick={prevSub} disabled={!canPrevSub}>
              Subbab Sebelumnya
            </SecondaryButton>
            <SecondaryButton onClick={nextSub} disabled={!canNextSub}>
              Subbab Selanjutnya
            </SecondaryButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
