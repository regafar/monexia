// src/pages/Simulator.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { addXPOnce, getProgress } from "../data/progressStore";

/*
SIMULASI ANTI-PHISHING (MoneEdu)
- Level 1: Awareness (jelas palsu) -> aksi 2 (Abaikan/Klik)
- Level 2: Analisis (semi meyakinkan) -> aksi 3 (Abaikan/Cek sumber/Klik)
- Level 3: Critical judgment (sangat realistis) -> observasi dulu (pilih 2 indikator), baru aksi 2 (Lanjutkan/Batalkan)
- Tidak ada spoiler jebakan sebelum user memilih
- Feedback setelah memilih dibuat lebih detail dan jelas
*/

const LEVELS = [
  {
    id: "level1",
    title: "Level 1 — Dasar",
    focus:
      "Fokus: Mengenali tanda phishing yang paling jelas. Pesan sangat mencurigakan, banyak tanda merah, tanpa tekanan waktu. Tujuan: membangun kebiasaan dasar “jangan klik”.",
    skill: "Skill: Awareness (mengenali bahaya yang tampak jelas).",
    actions: ["Abaikan", "Klik"],
    scenarios: [
      {
        id: "sms-undian",
        label: "SMS hadiah undian",
        type: "sms",
        sender: "+62 8xx xxxx",
        message:
          "SELAMAT!!! Anda menang undian Rp10.000.000. Klaim hadiah sekarang: klik tautan ini.",
        xpAwardActions: ["Abaikan"],
        evaluation: {
          Abaikan: {
            status: "Aman",
            detail: [
              "Keputusan kamu tepat karena pesan hadiah/undian tiba-tiba adalah pola phishing paling umum.",
              "Penipu sengaja memancing emosi “sayang kalau dilewatkan” agar korban klik tanpa berpikir.",
              "Mengabaikan pesan memutus risiko sebelum masuk tahap tautan, form, atau permintaan data."
            ],
            lesson: [
              "Kalau kamu tidak pernah ikut undian, anggap itu mencurigakan.",
              "Biasakan: jangan klik, jangan balas, jangan sebar."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik tautan pada pesan seperti ini berisiko karena bisa mengarah ke situs palsu yang meminta data, atau memasang malware.",
              "Phishing level dasar memang terlihat ‘ngasal’, tetapi banyak korban tertipu karena penasaran dan terburu-buru.",
              "Jika terlanjur klik di dunia nyata: tutup halaman, jangan isi apa pun, lakukan pengecekan keamanan perangkat."
            ],
            lesson: [
              "Rasa penasaran adalah pintu masuk penipuan digital.",
              "Begitu melihat pola hadiah/iming-iming, hentikan interaksi."
            ]
          }
        }
      },
      {
        id: "wa-pinjaman-cepat",
        label: "WhatsApp pinjaman cepat",
        type: "wa",
        senderName: "Promo Dana Cepat",
        senderNumber: "+62 8xx xxxx",
        message:
          "Pinjaman cair 5 menit tanpa syarat! Limit besar! Klik tautan untuk daftar sekarang.",
        xpAwardActions: ["Abaikan"],
        evaluation: {
          Abaikan: {
            status: "Aman",
            detail: [
              "Keputusan kamu tepat. Tawaran ‘tanpa syarat’ dan ‘cair instan’ dari nomor tak jelas sering dipakai untuk memancing klik.",
              "Tujuan belajar di level ini adalah membangun kebiasaan aman: jangan berinteraksi dengan tautan dari sumber tidak dikenal.",
              "Kalau benar-benar butuh layanan, cari lewat kanal resmi dan lakukan verifikasi."
            ],
            lesson: [
              "Tawaran terlalu mudah sering menyembunyikan risiko.",
              "Abaikan pesan promo mencurigakan."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik link dari chat tidak dikenal bisa mengarah ke form palsu yang meminta data pribadi.",
              "Penipu memanfaatkan kata-kata ‘limit besar’ dan ‘cair cepat’ agar korban bertindak impulsif.",
              "Di kondisi nyata: hentikan sebelum mengisi data dan verifikasi lewat kanal resmi."
            ],
            lesson: [
              "Jangan isi data di link yang datang dari chat random.",
              "Verifikasi dulu, jangan reaktif."
            ]
          }
        }
      },
      {
        id: "email-akun-diblokir",
        label: "Email akun diblokir",
        type: "email",
        from: "support@layanan-aman.com",
        subject: "Akun Anda Akan Diblokir",
        body:
          "Halo,\n\nKami mendeteksi aktivitas mencurigakan. Akun Anda akan diblokir dalam 30 menit.\nKlik tautan verifikasi untuk menghindari pemblokiran.\n\nTerima kasih,\nTim Dukungan",
        xpAwardActions: ["Abaikan"],
        evaluation: {
          Abaikan: {
            status: "Aman",
            detail: [
              "Keputusan aman. Frasa ‘diblokir dalam X menit’ sering dipakai untuk memicu panik agar korban klik.",
              "Sumber email tidak jelas dan meminta tindakan lewat tautan adalah tanda kuat phishing.",
              "Cara aman: cek informasi lewat aplikasi resmi/website resmi yang kamu ketik sendiri."
            ],
            lesson: [
              "Pesan yang memaksa cepat bertindak harus dicurigai.",
              "Cek lewat kanal resmi, bukan lewat link pesan."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik bisa membawa kamu ke halaman yang meniru login/konfirmasi data.",
              "Begitu kamu memasukkan data, pelaku bisa mengambil alih akun.",
              "Di dunia nyata: hentikan, ganti password dari kanal resmi, aktifkan 2FA, dan cek aktivitas login."
            ],
            lesson: [
              "Jangan klik tautan dari email yang memaksa.",
              "Keamanan akun bergantung pada kebiasaan verifikasi."
            ]
          }
        }
      }
    ]
  },

  {
    id: "level2",
    title: "Level 2 — Menengah",
    focus:
      "Fokus: Membedakan pesan palsu yang terlihat rapi dan hampir meyakinkan. Ada tekanan ringan. Tujuan: membentuk kebiasaan ‘verifikasi sebelum bertindak’.",
    skill: "Skill: Analisis (memeriksa sumber dan konteks).",
    actions: ["Abaikan", "Cek sumber", "Klik"],
    scenarios: [
      {
        id: "email-domain-mirip",
        label: "Email bank domain mirip",
        type: "email",
        from: "cs@bank-bnka.co.id",
        subject: "Pemberitahuan Verifikasi Akun",
        body:
          "Yth Nasabah,\n\nKami mendeteksi aktivitas tidak biasa. Untuk menjaga keamanan, silakan verifikasi akun Anda melalui tautan pada email ini.\n\nHormat kami,\nLayanan Nasabah",
        xpAwardActions: ["Cek sumber"],
        verifyGuide: [
          "Periksa alamat pengirim: apakah domain benar-benar sama dengan domain resmi institusi?",
          "Jangan klik tautan dari email. Lebih aman membuka aplikasi/website resmi melalui cara yang kamu ketik sendiri.",
          "Jika ragu, cek pengumuman di aplikasi resmi atau hubungi layanan resmi melalui nomor resmi."
        ],
        evaluation: {
          "Cek sumber": {
            status: "Aman",
            detail: [
              "Pilihan kamu paling tepat untuk Level 2. Kamu tidak reaktif dan memilih verifikasi dahulu.",
              "Pesan rapi sering dipakai untuk membuat korban lengah. Karena itu, kebiasaan verifikasi lebih penting daripada menilai tampilan.",
              "Verifikasi yang benar dilakukan lewat kanal resmi: aplikasi resmi, website resmi yang kamu ketik sendiri, atau kontak resmi."
            ],
            lesson: [
              "Jangan percaya hanya karena tampilan rapi.",
              "Cek domain dan akses kanal resmi sebelum bertindak."
            ]
          },
          Abaikan: {
            status: "Aman",
            detail: [
              "Mengabaikan lebih aman dibanding klik. Ini masih keputusan aman.",
              "Namun target Level 2 adalah membentuk kebiasaan verifikasi, bukan sekadar menghindar.",
              "Cara paling ideal: cek sumber tanpa klik tautan, lalu putuskan."
            ],
            lesson: [
              "Aman itu juga berarti memastikan informasi lewat kanal resmi.",
              "Biasakan verifikasi tanpa klik link."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik berisiko karena bisa mengarah ke halaman palsu yang meniru institusi.",
              "Di Level 2, jebakannya bukan bahasa berantakan, tapi profesional dan meyakinkan.",
              "Cara aman: jangan klik dari pesan. Buka aplikasi/website resmi lewat cara kamu sendiri."
            ],
            lesson: [
              "Verifikasi dulu, baru bertindak.",
              "Hindari klik tautan langsung dari email/pesan."
            ]
          }
        }
      },
      {
        id: "notif-paket",
        label: "Notifikasi paket tertahan",
        type: "notif",
        appName: "Layanan Pengiriman",
        title: "Paket tertahan",
        message:
          "Paket kamu tertahan. Lengkapi data penerima agar pengiriman dilanjutkan melalui tautan berikut.",
        xpAwardActions: ["Cek sumber"],
        verifyGuide: [
          "Cek nomor resi di aplikasi resmi atau website resmi jasa kirim.",
          "Jika ada biaya, pastikan pembayarannya melalui kanal resmi, bukan link acak.",
          "Waspadai pesan yang memaksa ‘lengkapi data’ lewat tautan."
        ],
        evaluation: {
          "Cek sumber": {
            status: "Aman",
            detail: [
              "Pilihan kamu tepat karena kamu memeriksa fakta lebih dulu.",
              "Tema paket sering dipakai karena banyak orang menunggu kiriman sehingga lebih mudah panik.",
              "Dengan cek sumber, kamu mencegah tahap berikutnya: pengisian data di halaman palsu."
            ],
            lesson: [
              "Verifikasi resi lewat kanal resmi.",
              "Jangan isi data dari tautan yang datang mendadak."
            ]
          },
          Abaikan: {
            status: "Aman",
            detail: [
              "Mengabaikan aman jika kamu tidak menunggu paket.",
              "Kalau sedang menunggu paket, tindakan terbaik tetap cek sumber melalui aplikasi resmi.",
              "Target Level 2 adalah membangun kebiasaan verifikasi, bukan hanya menghindar."
            ],
            lesson: [
              "Cek sumber melalui aplikasi/website resmi.",
              "Jangan reaktif pada notifikasi mendadak."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik berisiko mengarah ke halaman palsu yang meminta data alamat, nomor, atau metode pembayaran.",
              "Penipu memanfaatkan kepanikan ringan agar korban cepat bertindak.",
              "Cara aman: cek resi di kanal resmi, lalu lakukan tindakan di platform resmi jika perlu."
            ],
            lesson: [
              "Verifikasi dulu, baru bertindak.",
              "Hindari klik tautan dari pesan."
            ]
          }
        }
      },
      {
        id: "promo-ewallet",
        label: "Promo e-wallet palsu",
        type: "wa",
        senderName: "Promo E-Wallet",
        senderNumber: "+62 8xx xxxx",
        message:
          "Promo cashback besar hari ini! Klaim sekarang lewat link berikut sebelum hangus.",
        xpAwardActions: ["Cek sumber", "Abaikan"],
        verifyGuide: [
          "Cek promo hanya melalui aplikasi resmi e-wallet.",
          "Cari pengumuman promo di menu resmi atau media resmi terverifikasi.",
          "Hindari link promo yang dikirim lewat chat dari nomor tak dikenal."
        ],
        evaluation: {
          "Cek sumber": {
            status: "Aman",
            detail: [
              "Pilihan kamu paling aman. Promo sering dipakai sebagai umpan karena banyak orang tertarik diskon/cashback.",
              "Verifikasi promo harus melalui aplikasi resmi, bukan link chat.",
              "Dengan cek sumber, kamu mencegah risiko diarahkan ke halaman login palsu."
            ],
            lesson: [
              "Promo tidak pernah mengharuskan klik link dari chat random.",
              "Biasakan cek promo di aplikasi resmi."
            ]
          },
          Abaikan: {
            status: "Aman",
            detail: [
              "Mengabaikan aman dibanding klik, apalagi jika sumber tidak jelas.",
              "Namun lebih baik jika kamu juga membiasakan cek promo di aplikasi resmi untuk memastikan apakah promo itu memang ada.",
              "Target Level 2 adalah membangun kebiasaan verifikasi."
            ],
            lesson: [
              "Aman itu juga berarti memverifikasi lewat kanal resmi.",
              "Hindari link dari pesan tak dikenal."
            ]
          },
          Klik: {
            status: "Berisiko",
            detail: [
              "Klik link promo bisa membawa kamu ke situs tiruan untuk mengambil data login atau OTP.",
              "Urgensi “sebelum hangus” adalah trik untuk membuat kamu terburu-buru.",
              "Di dunia nyata: hentikan proses, jangan isi data, lalu cek promo di aplikasi resmi."
            ],
            lesson: [
              "Hati-hati pada promo yang memaksa cepat bertindak.",
              "Verifikasi dulu, jangan reaktif."
            ]
          }
        }
      }
    ]
  },

  {
    id: "level3",
    title: "Level 3 — Lanjutan",
    focus:
      "Fokus: Deteksi detail teknis dan manipulasi psikologis. Skenario sangat realistis, minim kesalahan visual. Kamu harus observasi dulu (pilih 2 indikator) sebelum memutuskan lanjut atau batal.",
    skill: "Skill: Critical judgment (ketelitian teknis + kontrol emosi di bawah urgensi).",
    actions: ["Lanjutkan", "Batalkan"],
    requireObservation: true,
    observationPrompt:
      "Sebelum memilih Lanjutkan atau Batalkan, tandai 2 hal yang paling mencurigakan. Ini melatih kebiasaan: berhenti, cek detail, baru bertindak.",
    scenarios: [
      {
        id: "website-login",
        label: "Website login palsu (sangat realistis)",
        type: "website",
        urlBar: "http://ibanking-bnka.co.id/login",
        pageTitle: "Internet Banking",
        hints: [
          { id: "hint1", text: "Alamat URL memakai HTTP, bukan HTTPS" },
          { id: "hint2", text: "Domain terlihat mirip, tapi perlu dipastikan domain resmi" },
          { id: "hint3", text: "Ada pesan urgensi yang mendorong login sekarang juga" },
          { id: "hint4", text: "Form login meminta data tambahan yang tidak biasa (misal OTP/nomor kartu) sebelum login berhasil" },
          { id: "hint5", text: "Tampilan rapi bukan jaminan aman, tetap harus cek URL dan sumber akses" }
        ],
        correctObservationIds: ["hint1", "hint3"],
        xpAwardActions: ["Batalkan"],
        evaluation: {
          Batalkan: {
            status: "Aman",
            detail: [
              "Keputusan kamu tepat. Pada phishing modern, indikator berbahaya sering kecil tapi dampaknya besar.",
              "Level 3 menguji kebiasaan ‘pause’: berhenti, cek detail, dan jangan terpengaruh urgensi.",
              "Dengan membatalkan, kamu mencegah tahap paling berbahaya: memasukkan kredensial (user id/password/OTP) pada situs yang belum terverifikasi."
            ],
            lesson: [
              "Jika URL tidak aman (HTTP) atau ada urgensi yang memaksa, jangan lanjut.",
              "Akses layanan hanya lewat aplikasi resmi atau alamat yang kamu ketik sendiri."
            ]
          },
          Lanjutkan: {
            status: "Berisiko",
            detail: [
              "Melanjutkan login berisiko karena kamu membuka peluang pencurian kredensial.",
              "Phishing level lanjutan memanfaatkan tampilan yang sangat mirip asli agar korban ‘lupa’ memeriksa URL dan protokol keamanan.",
              "Di dunia nyata: hentikan sebelum mengisi data, lalu akses layanan melalui aplikasi resmi atau domain yang kamu ketik sendiri."
            ],
            lesson: [
              "Keamanan bukan soal tampilan, tapi soal URL, protokol, dan sumber akses.",
              "Begitu ragu, hentikan proses."
            ]
          }
        },
        afterReview: [
          "Ringkasan kebiasaan aman Level 3:",
          "1) Cek protokol dan URL (HTTPS + domain resmi).",
          "2) Waspadai urgensi mendadak (akun diblokir, harus login sekarang).",
          "3) Akses layanan lewat kanal resmi (aplikasi/website yang kamu ketik sendiri)."
        ]
      }
    ]
  }
];

export default function Simulator() {
  const nav = useNavigate();
  const progress = getProgress();

  const [step, setStep] = useState("level"); // level | scenario | case
  const [level, setLevel] = useState(null);
  const [scenario, setScenario] = useState(null);

  const [actionTaken, setActionTaken] = useState(null);

  // Level 3 observation
  const [selectedHints, setSelectedHints] = useState([]);

  const canTakeActions = useMemo(() => {
    if (!level?.requireObservation) return true;
    return selectedHints.length === 2;
  }, [level, selectedHints]);

  function goBackStep() {
    if (step === "case") {
      setStep("scenario");
      setScenario(null);
      setActionTaken(null);
      setSelectedHints([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (step === "scenario") {
      setStep("level");
      setLevel(null);
      setScenario(null);
      setActionTaken(null);
      setSelectedHints([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    nav(-1);
  }

  function chooseLevel(lv) {
    setLevel(lv);
    setStep("scenario");
    setScenario(null);
    setActionTaken(null);
    setSelectedHints([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseScenario(sc) {
    setScenario(sc);
    setStep("case");
    setActionTaken(null);
    setSelectedHints([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleHint(hintId) {
    setSelectedHints((prev) => {
      if (prev.includes(hintId)) return prev.filter((x) => x !== hintId);
      if (prev.length >= 2) return prev;
      return [...prev, hintId];
    });
  }

  function takeAction(act) {
    setActionTaken(act);

    const awards = scenario?.xpAwardActions || [];
    if (awards.includes(act)) {
      addXPOnce(
        `anti_phishing_${level.id}_${scenario.id}_${act}`,
        10,
        "Jawaban tepat pada simulasi anti-phishing"
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetCase() {
    setActionTaken(null);
    setSelectedHints([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCaseMock() {
    if (!scenario) return null;

    if (scenario.type === "sms") {
      return (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <div className="mb-1 text-xs text-slate-500">SMS dari {scenario.sender}</div>
          <div className="text-slate-900">{scenario.message}</div>
        </div>
      );
    }

    if (scenario.type === "wa") {
      return (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <div className="mb-1 text-xs text-slate-500">
            WhatsApp dari {scenario.senderName} ({scenario.senderNumber})
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-slate-900">{scenario.message}</div>
        </div>
      );
    }

    if (scenario.type === "email") {
      return (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <div className="mb-1 text-xs text-slate-500">Dari: {scenario.from}</div>
          <div className="mb-2 font-extrabold text-slate-900">{scenario.subject}</div>
          <pre className="whitespace-pre-wrap text-slate-900">{scenario.body}</pre>
        </div>
      );
    }

    if (scenario.type === "notif") {
      return (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <div className="mb-1 text-xs text-slate-500">{scenario.appName}</div>
          <div className="font-extrabold text-slate-900">{scenario.title}</div>
          <div className="mt-2 rounded-xl bg-slate-50 p-3 text-slate-900">{scenario.message}</div>
        </div>
      );
    }

    if (scenario.type === "website") {
      return (
        <div className="rounded-2xl border bg-white p-4 text-sm">
          <div className="mb-2 text-xs text-slate-500">URL: {scenario.urlBar}</div>

          <div className="mb-3 rounded-xl border bg-slate-50 p-3">
            <div className="text-center font-extrabold text-slate-900">{scenario.pageTitle}</div>
            <div className="mt-3">
              <input disabled className="mb-2 w-full rounded-xl border p-3" placeholder="User ID" />
              <input
                disabled
                type="password"
                className="mb-3 w-full rounded-xl border p-3"
                placeholder="Password"
              />
              <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                Sistem mendeteksi aktivitas tidak biasa. Silakan login ulang untuk melanjutkan.
              </div>
              <button
                disabled
                className="w-full rounded-xl bg-green-600 py-2 text-sm font-extrabold text-white opacity-80"
              >
                Login
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Catatan: ini adalah tampilan simulasi. Tidak ada data nyata dan semua contoh bersifat fiktif.
          </div>
        </div>
      );
    }

    return null;
  }

  function renderFeedback() {
    if (!scenario || !actionTaken) return null;

    const evalObj = scenario.evaluation?.[actionTaken];

    const statusLabel = evalObj?.status || "—";

    // Level 3 observation review AFTER choosing action
    const showObsReview = !!level?.requireObservation && !!scenario?.correctObservationIds?.length;

    let obsBlock = null;
    if (showObsReview) {
      const correctIds = scenario.correctObservationIds;
      const correctPicked = selectedHints.filter((h) => correctIds.includes(h));
      const missed = correctIds.filter((h) => !selectedHints.includes(h));

      obsBlock = (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <div className="font-extrabold text-slate-900">Review Observasi</div>

          <div className="mt-2 text-slate-700">
            Kamu menandai: <b>{selectedHints.length}</b> indikator.
          </div>
          <div className="mt-2 text-slate-700">
            Indikator yang tepat kamu pilih: <b>{correctPicked.length}</b>
          </div>

          <div className="mt-2 text-slate-700">
            Indikator yang seharusnya diperhatikan:
            <ul className="mt-2 list-disc pl-5">
              {scenario.hints
                .filter((h) => scenario.correctObservationIds.includes(h.id))
                .map((h) => (
                  <li key={h.id}>{h.text}</li>
                ))}
            </ul>
          </div>

          {missed.length > 0 ? (
            <div className="mt-2 text-slate-700">
              Kamu melewatkan:
              <ul className="mt-2 list-disc pl-5">
                {scenario.hints
                  .filter((h) => missed.includes(h.id))
                  .map((h) => (
                    <li key={h.id}>{h.text}</li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
      );
    }

    // Level 2 verification guide after choosing
    let verifyBlock = null;
    if (level?.id === "level2" && scenario.verifyGuide?.length) {
      verifyBlock = (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <div className="font-extrabold text-slate-900">Cara Verifikasi yang Benar</div>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            {scenario.verifyGuide.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>
      );
    }

    // AfterReview lines
    let afterReview = null;
    if (scenario.afterReview?.length) {
      afterReview = (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <div className="font-extrabold text-slate-900">Ringkasan</div>
          <div className="mt-2 text-slate-700">
            {scenario.afterReview.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm">
        <div className="font-extrabold text-green-800">Status: {statusLabel}</div>

        {evalObj?.detail?.length ? (
          <div className="mt-2 space-y-2 text-slate-800">
            {evalObj.detail.map((p, idx) => (
              <div key={idx}>{p}</div>
            ))}
          </div>
        ) : null}

        {evalObj?.lesson?.length ? (
          <div className="mt-3 rounded-2xl border border-green-200 bg-white p-4">
            <div className="font-extrabold text-slate-900">Pelajaran Praktis</div>
            <ul className="mt-2 list-disc pl-5 text-slate-700">
              {evalObj.lesson.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {verifyBlock}
        {obsBlock}
        {afterReview}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card
        title="Simulasi Anti-Phishing"
        desc="Simulasi ini melatih kebiasaan aman: mengenali pola phishing, memverifikasi sumber, dan mengambil keputusan yang tepat."
      >
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={goBackStep}>← Kembali</SecondaryButton>
          <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
        </div>

        {step === "level" && (
          <div className="mt-4 space-y-3">
            {LEVELS.map((lv) => (
              <button
                key={lv.id}
                onClick={() => chooseLevel(lv)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
              >
                <div className="text-base font-extrabold text-slate-900">{lv.title}</div>
                <div className="mt-1 text-sm text-slate-700">{lv.focus}</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">{lv.skill}</div>
              </button>
            ))}
          </div>
        )}

        {step === "scenario" && level && (
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
              <div className="font-extrabold text-slate-900">{level.title}</div>
              <div className="mt-1 text-slate-700">{level.focus}</div>
              <div className="mt-1 text-slate-600">{level.skill}</div>
              <div className="mt-2 text-slate-700">
                Opsi tindakan pada level ini (konsisten): <b>{level.actions.join(", ")}</b>
              </div>
            </div>

            {level.scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => chooseScenario(sc)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
              >
                <div className="font-extrabold text-slate-900">{sc.label}</div>
                <div className="text-xs text-slate-500">Klik untuk masuk ke simulasi kasus.</div>
              </button>
            ))}
          </div>
        )}

        {step === "case" && level && scenario && (
          <div className="mt-4 space-y-4">
            {renderCaseMock()}

            {level.requireObservation && !actionTaken ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-extrabold text-slate-900">Langkah Observasi</div>
                <div className="mt-1 text-slate-700">{level.observationPrompt}</div>

                <div className="mt-3 grid gap-2">
                  {scenario.hints.map((h) => {
                    const checked = selectedHints.includes(h.id);
                    const disabled = !checked && selectedHints.length >= 2;

                    return (
                      <button
                        key={h.id}
                        onClick={() => toggleHint(h.id)}
                        disabled={disabled}
                        className={
                          "rounded-2xl border p-3 text-left text-sm " +
                          (checked
                            ? "border-green-300 bg-green-50"
                            : "border-slate-200 bg-white hover:bg-slate-50") +
                          (disabled ? " opacity-60" : "")
                        }
                      >
                        {checked ? "✓ " : ""}
                        {h.text}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  Kamu harus memilih tepat 2 indikator untuk melanjutkan.
                </div>
              </div>
            ) : null}

            {!actionTaken ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-extrabold text-slate-900">Ambil Keputusan</div>
                <div className="mt-1 text-slate-700">
                  Pilih satu tindakan. Feedback akan muncul setelah kamu memilih.
                </div>

                <div className="mt-3 grid gap-2">
                  {level.actions.map((act) => (
                    <button
                      key={act}
                      onClick={() => takeAction(act)}
                      disabled={!canTakeActions}
                      className={
                        "rounded-2xl border p-3 text-left text-sm " +
                        (canTakeActions
                          ? "border-slate-200 bg-white hover:bg-slate-50"
                          : "border-slate-200 bg-white opacity-60")
                      }
                    >
                      {act}
                    </button>
                  ))}
                </div>

                {!canTakeActions && level.requireObservation ? (
                  <div className="mt-2 text-xs text-slate-500">
                    Selesaikan observasi dulu (pilih 2 indikator) sebelum memilih tindakan.
                  </div>
                ) : null}
              </div>
            ) : null}

            {renderFeedback()}

            {actionTaken ? (
              <div className="flex flex-wrap gap-2">
                <SecondaryButton onClick={resetCase}>Ulangi skenario ini</SecondaryButton>
                <SecondaryButton
                  onClick={() => {
                    setStep("scenario");
                    setScenario(null);
                    setActionTaken(null);
                    setSelectedHints([]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Kembali ke daftar skenario
                </SecondaryButton>
                <PrimaryButton onClick={() => nav("/")}>Kembali ke Home</PrimaryButton>
              </div>
            ) : null}

            <div className="text-xs text-slate-500">XP saat ini: {progress.xp}/300</div>
          </div>
        )}
      </Card>
    </div>
  );
}
