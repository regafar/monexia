import React, { useState } from 'react';

export default function AntiPhishingSimulation() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [showIndicatorSelection, setShowIndicatorSelection] = useState(false);
  const [hasStarted, setHasStarted] = useState(true);

  const levels = [
    {
      id: 1,
      title: "Level 1 — Dasar (Awareness)",
      description: "Di level ini, kamu akan belajar mengenali pesan phishing yang jelas mencurigakan. Fokus: membangun refleks aman 'jangan asal klik'.",
      scenarios: [
        {
          message: "SELAMAT!!! Anda MENANG 100 JUTA!!! Klik link ini sekarang juga untuk klaim hadiah: bit.ly/hadiahgratis123",
          sender: "Nomor Tidak Dikenal (+62812-XXXX-9999)",
          actions: [
            { label: "Abaikan pesan ini", correct: true },
            { label: "Klik link untuk cek hadiah", correct: false }
          ],
          correctFeedback: "Tepat sekali! Pesan seperti ini klasik phishing. Tidak ada yang gratis tanpa alasan jelas. Hadiah tiba-tiba dari nomor tidak dikenal? Red flag besar!",
          wrongFeedback: "Ups! Link ini kemungkinan besar berbahaya. Ingat: hadiah mendadak dari nomor tak dikenal itu hampir pasti penipuan. Jangan pernah klik sembarangan."
        },
        {
          message: "URGENT! Akun Bank Anda terblokir. Segera verifikasi data di: bankku-verifikasi.com atau rekening Anda akan ditutup dalam 24 jam!",
          sender: "BankKu Official",
          actions: [
            { label: "Abaikan dan hubungi bank via nomor resmi", correct: true },
            { label: "Buka link untuk verifikasi", correct: false }
          ],
          correctFeedback: "Benar! Bank TIDAK PERNAH minta verifikasi via link mencurigakan. Kalau ada masalah dengan rekening, hubungi langsung ke customer service resmi bank.",
          wrongFeedback: "Awas! Ini tipu-tipu klasik. Bank tidak akan kirim pesan ancaman seperti ini. Mereka juga tidak akan minta kamu klik link random. Selalu cek via kanal resmi."
        }
      ]
    },
    {
      id: 2,
      title: "Level 2 — Menengah (Analisis)",
      description: "Skenario di level ini lebih rapi dan meyakinkan. Kamu perlu mulai membiasakan diri untuk verifikasi sebelum bertindak.",
      scenarios: [
        {
          message: "Halo! Paket Anda dari Shopee sedang dalam proses pengiriman. Silakan konfirmasi alamat di link berikut: shopee-konfirmasi.net/track/AB123XYZ",
          sender: "Shopee Notification",
          actions: [
            { label: "Abaikan pesan ini", correct: true },
            { label: "Cek di aplikasi Shopee resmi", correct: true },
            { label: "Klik link untuk konfirmasi", correct: false }
          ],
          correctFeedback: "Pintar! Kalau mau cek paket, buka aplikasi resmi atau website resmi. Jangan percaya link di pesan yang datang tiba-tiba, meskipun terlihat meyakinkan.",
          wrongFeedback: "Hati-hati! Domain 'shopee-konfirmasi.net' bukan domain resmi Shopee. Penipu sering bikin website tiruan yang mirip sekali. Selalu cek via aplikasi resmi."
        },
        {
          message: "Tim HR: Mohon lengkapi data karyawan untuk proses payroll bulan ini. Isi formulir di: forms.company-hr.com/payroll2024. Deadline: Hari ini!",
          sender: "HR Department",
          actions: [
            { label: "Abaikan dan konfirmasi ke HR langsung", correct: true },
            { label: "Cek email resmi dari perusahaan", correct: true },
            { label: "Isi formulir di link tersebut", correct: false }
          ],
          correctFeedback: "Bagus! Urusan data karyawan sensitif. Jangan pernah isi formulir dari link yang tidak jelas asalnya. Konfirmasi dulu ke HR via jalur resmi perusahaan.",
          wrongFeedback: "Jangan terburu! Link ini mencurigakan. HR perusahaan pasti punya prosedur resmi, bukan kirim link random. Bayangkan kalau data pribadi kamu dicuri gara-gara ini."
        }
      ]
    },
    {
      id: 3,
      title: "Level 3 — Lanjutan (Critical Judgment)",
      description: "Ini tantangan terakhir. Skenario sangat realistis dan menekan. Kamu WAJIB observasi dulu, tandai 2 indikator mencurigakan, baru boleh ambil keputusan.",
      scenarios: [
        {
          message: "Yth. Bapak/Ibu, Kami dari Direktorat Jenderal Pajak menginformasikan bahwa terdapat tunggakan pajak atas NPWP Anda sebesar Rp 15.450.000. Segera lakukan pembayaran melalui portal: pajak-online.co.id/bayar?id=NPW123456789 untuk menghindari denda dan sanksi hukum. Batas waktu: 3 hari. Terima kasih.",
          sender: "DJP Online Service",
          indicators: [
            { text: "Domain 'pajak-online.co.id' bukan domain resmi DJP (yang resmi: pajak.go.id)", suspicious: true },
            { text: "Pesan menggunakan tekanan psikologis dengan ancaman sanksi", suspicious: true },
            { text: "Ada batas waktu yang sangat ketat (3 hari)", suspicious: true },
            { text: "Pesan dikirim via SMS, bukan email resmi", suspicious: true },
            { text: "Menyebutkan jumlah tunggakan yang spesifik", suspicious: false },
            { text: "Menggunakan bahasa formal dan sopan", suspicious: false }
          ],
          actions: [
            { label: "Lanjutkan pembayaran via link", correct: false },
            { label: "Batalkan dan cek via www.pajak.go.id atau hubungi Kring Pajak 1500200", correct: true }
          ],
          correctFeedback: "Luar biasa! Kamu berhasil menahan diri di bawah tekanan. Pesan ini dirancang untuk bikin panik dengan ancaman sanksi. Tapi kamu tetap tenang dan memilih verifikasi dulu. Ini skill penting dalam hidup digital.",
          wrongFeedback: "Sayangnya, ini phishing canggih. Domain palsu, tekanan waktu, dan ancaman adalah taktik klasik penipu. Institusi resmi seperti DJP tidak akan kirim tagihan via link SMS. Selalu verifikasi ke sumber resmi."
        },
        {
          message: "Notifikasi Keamanan: Terdeteksi aktivitas mencurigakan pada akun Google Anda dari lokasi tidak dikenal (Beijing, China). Jika ini bukan Anda, segera amankan akun dengan verifikasi identitas di: google-security-check.com/verify/account. Abaikan pesan ini jika aktivitas tersebut adalah Anda. - Google Security Team",
          sender: "Google Security Alert",
          indicators: [
            { text: "Domain 'google-security-check.com' bukan domain resmi Google", suspicious: true },
            { text: "Menciptakan kepanikan dengan lokasi asing yang mencurigakan", suspicious: true },
            { text: "Link mengarah ke website eksternal, bukan akun Google langsung", suspicious: true },
            { text: "Tidak ada informasi spesifik tentang perangkat yang login", suspicious: true },
            { text: "Menyebutkan lokasi geografis yang spesifik", suspicious: false },
            { text: "Pesan terlihat profesional dengan logo Google", suspicious: false }
          ],
          actions: [
            { label: "Lanjutkan verifikasi via link yang diberikan", correct: false },
            { label: "Batalkan dan login langsung ke myaccount.google.com untuk cek aktivitas", correct: true }
          ],
          correctFeedback: "Sempurna! Kamu tidak terjebak meski pesannya sangat meyakinkan. Google memang kirim notifikasi keamanan, tapi mereka tidak akan pernah minta kamu klik link eksternal. Selalu akses langsung via browser atau aplikasi resmi.",
          wrongFeedback: "Hampir tertipu! Ini phishing tingkat tinggi yang meniru Google. Domain palsu + kepanikan = resep penipuan. Google selalu minta kamu cek keamanan via myaccount.google.com, bukan link acak."
        }
      ]
    }
  ];

  const handleStartSimulation = () => {
    setHasStarted(true);
  };

  const handleIndicatorSelect = (index) => {
    if (selectedIndicators.includes(index)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== index));
    } else if (selectedIndicators.length < 2) {
      setSelectedIndicators([...selectedIndicators, index]);
    }
  };

  const handleActionSelect = (action) => {
    const currentLevelData = levels[currentLevel];
    const currentScenarioData = currentLevelData.scenarios[currentScenario];

    if (currentLevel === 2 && !showIndicatorSelection) {
      // Level 3: Harus pilih indikator dulu
      if (selectedIndicators.length !== 2) {
        return;
      }
      
      const suspiciousIndicators = currentScenarioData.indicators
        .map((ind, idx) => ({ ...ind, index: idx }))
        .filter(ind => ind.suspicious);
      
      const correctSelections = selectedIndicators.filter(idx => 
        suspiciousIndicators.some(si => si.index === idx)
      ).length;

      if (correctSelections < 2) {
        setFeedback({
          type: 'warning',
          message: 'Indikator yang kamu pilih kurang tepat. Coba perhatikan lebih detail: apakah ada yang aneh dari domain, tekanan waktu, atau cara komunikasinya?'
        });
        return;
      }

      setShowIndicatorSelection(true);
    }

    setSelectedAction(action);
    
    if (action.correct) {
      setScore(score + 1);
      setFeedback({
        type: 'success',
        message: currentScenarioData.correctFeedback
      });
    } else {
      setFeedback({
        type: 'error',
        message: currentScenarioData.wrongFeedback
      });
    }
  };

  const handleNext = () => {
    const currentLevelData = levels[currentLevel];
    
    if (currentScenario < currentLevelData.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAction(null);
      setFeedback(null);
      setSelectedIndicators([]);
      setShowIndicatorSelection(false);
    } else if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setCurrentScenario(0);
      setSelectedAction(null);
      setFeedback(null);
      setSelectedIndicators([]);
      setShowIndicatorSelection(false);
    } else {
      // Selesai
      setFeedback({
        type: 'complete',
        message: `Simulasi selesai! Skor akhir kamu: ${score}/${levels.reduce((acc, level) => acc + level.scenarios.length, 0)}. ${score >= 4 ? 'Hebat! Kamu sudah punya awareness yang bagus.' : 'Terus berlatih ya! Keamanan digital itu skill yang bisa diasah.'}`
      });
    }
  };

  const handleReset = () => {
    setCurrentLevel(0);
    setCurrentScenario(0);
    setSelectedAction(null);
    setFeedback(null);
    setScore(0);
    setSelectedIndicators([]);
    setShowIndicatorSelection(false);
    setHasStarted(true);
  };

  const currentLevelData = levels[currentLevel];
  const currentScenarioData = currentLevelData?.scenarios[currentScenario];
  const totalScenarios = levels.reduce((acc, level) => acc + level.scenarios.length, 0);

  if (feedback?.type === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simulasi Selesai!</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{score}/{totalScenarios}</div>
              <p className="text-gray-700">Skor Akhir Kamu</p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {feedback.message}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3">💡 Ingat Selalu:</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Jangan pernah terburu-buru saat terima pesan mencurigakan</li>
                <li>• Verifikasi SELALU lewat kanal resmi, bukan dari link yang dikirim</li>
                <li>• Institusi resmi tidak akan meminta data sensitif via pesan atau link</li>
                <li>• Kalau ragu, lebih baik abaikan dan cek langsung ke sumbernya</li>
              </ul>
            </div>
            <button
              onClick={handleReset}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
              Ulangi Simulasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              Skor: {score}/{totalScenarios}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentLevel * levels[0].scenarios.length + currentScenario + 1) / totalScenarios) * 100}%` }}
            />
          </div>
        </div>

        {/* Level Header */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 mb-6 border border-green-100">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Level {currentLevel + 1}/3
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {currentLevelData.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {currentLevelData.description}
          </p>
        </div>

        {/* Scenario Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span className="font-medium">Dari:</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">{currentScenarioData.sender}</span>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {currentScenarioData.message}
              </p>
            </div>
          </div>

          {/* Level 3: Indicator Selection */}
          {currentLevel === 2 && !showIndicatorSelection && (
            <div className="mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex gap-2">
                  <span className="text-yellow-600 flex-shrink-0 text-xl">⚠️</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Tantangan Level 3</p>
                    <p className="text-sm text-gray-700">
                      Sebelum mengambil keputusan, identifikasi DUA indikator yang mencurigakan
                      dari pesan di atas. Ini melatihmu untuk tidak reaktif dan selalu observasi dulu.
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-bold text-gray-900 mb-3">
                Pilih 2 indikator mencurigakan: ({selectedIndicators.length}/2)
              </p>
              
              <div className="space-y-2">
                {currentScenarioData.indicators.map((indicator, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorSelect(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition ${
                      selectedIndicators.includes(index)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedIndicators.includes(index)
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedIndicators.includes(index) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700">{indicator.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {(currentLevel !== 2 || showIndicatorSelection) && (
            <div>
              <p className="font-bold text-gray-900 mb-3">Apa yang akan kamu lakukan?</p>
              <div className="space-y-3">
                {currentScenarioData.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionSelect(action)}
                    disabled={selectedAction !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${
                      selectedAction === action
                        ? action.correct
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : selectedAction !== null
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 bg-white hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Level 3: Submit Indicator Button */}
          {currentLevel === 2 && !showIndicatorSelection && selectedIndicators.length === 2 && (
            <button
              onClick={() => handleActionSelect({ correct: true })}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
              Lanjut ke Pilihan Tindakan
            </button>
          )}
        </div>

        {/* Feedback */}
        {feedback && feedback.type !== 'complete' && (
          <div className={`rounded-2xl p-6 md:p-8 mb-6 ${
            feedback.type === 'success' ? 'bg-green-50 border border-green-200' :
            feedback.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex gap-3 mb-3">
              <span className="text-2xl flex-shrink-0">
                {feedback.type === 'success' ? '✅' : feedback.type === 'error' ? '❌' : '⚠️'}
              </span>
              <div>
                <h3 className={`font-bold text-lg mb-2 ${
                  feedback.type === 'success' ? 'text-green-900' :
                  feedback.type === 'error' ? 'text-red-900' :
                  'text-yellow-900'
                }`}>
                  {feedback.type === 'success' ? 'Keputusan Tepat!' :
                   feedback.type === 'error' ? 'Wah, Hati-Hati!' :
                   'Perhatikan Lagi'}
                </h3>
                <p className={`leading-relaxed ${
                  feedback.type === 'success' ? 'text-green-800' :
                  feedback.type === 'error' ? 'text-red-800' :
                  'text-yellow-800'
                }`}>
                  {feedback.message}
                </p>
              </div>
            </div>
            
            {selectedAction && (
              <button
                onClick={handleNext}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition mt-4"
              >
                {currentScenario < currentLevelData.scenarios.length - 1 ? 'Lanjut Skenario Berikutnya' :
                 currentLevel < levels.length - 1 ? 'Lanjut ke Level Berikutnya' :
                 'Lihat Hasil Akhir'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
