import React, { useState } from 'react';
import { Shield, MessageSquare, Mail, AlertTriangle, CheckCircle, XCircle, ChevronRight, Award, Lock } from 'lucide-react';

export default function AntiPhishingSimulation() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [showIndicatorSelection, setShowIndicatorSelection] = useState(false);

  const levels = [
    {
      id: 1,
      title: "Level 1 — Dasar (Awareness)",
      description: "Di level ini, kamu akan belajar mengenali pesan phishing yang jelas mencurigakan. Fokus: membangun refleks aman 'jangan asal klik'.",
      scenarios: [
        {
          message: "SELAMAT!!! Anda MENANG 100 JUTA!!! Klik link ini sekarang juga untuk klaim hadiah: bit.ly/hadiahgratis123",
          sender: "Nomor Tidak Dikenal",
          phone: "+62812-XXXX-9999",
          time: "10:23 AM",
          type: "sms",
          actions: [
            { label: "🚫 Abaikan pesan ini", correct: true },
            { label: "🔗 Klik link untuk cek hadiah", correct: false }
          ],
          correctFeedback: "Tepat sekali! Pesan seperti ini klasik phishing. Tidak ada yang gratis tanpa alasan jelas. Hadiah tiba-tiba dari nomor tidak dikenal? Red flag besar!",
          wrongFeedback: "Ups! Link ini kemungkinan besar berbahaya. Ingat: hadiah mendadak dari nomor tak dikenal itu hampir pasti penipuan. Jangan pernah klik sembarangan."
        },
        {
          message: "URGENT! Akun Bank Anda terblokir. Segera verifikasi data di: bankku-verifikasi.com atau rekening Anda akan ditutup dalam 24 jam!",
          sender: "BankKu Official",
          phone: "+62811-XXXX-1234",
          time: "2:45 PM",
          type: "sms",
          actions: [
            { label: "✅ Abaikan dan hubungi bank via nomor resmi", correct: true },
            { label: "🔗 Buka link untuk verifikasi", correct: false }
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
          sender: "Shopee",
          email: "notification@shopee-id.com",
          time: "11:30 AM",
          type: "email",
          actions: [
            { label: "🚫 Abaikan pesan ini", correct: true },
            { label: "📱 Cek di aplikasi Shopee resmi", correct: true },
            { label: "🔗 Klik link untuk konfirmasi", correct: false }
          ],
          correctFeedback: "Pintar! Kalau mau cek paket, buka aplikasi resmi atau website resmi. Jangan percaya link di pesan yang datang tiba-tiba, meskipun terlihat meyakinkan.",
          wrongFeedback: "Hati-hati! Domain 'shopee-konfirmasi.net' bukan domain resmi Shopee. Penipu sering bikin website tiruan yang mirip sekali. Selalu cek via aplikasi resmi."
        },
        {
          message: "Tim HR: Mohon lengkapi data karyawan untuk proses payroll bulan ini. Isi formulir di: forms.company-hr.com/payroll2024. Deadline: Hari ini!",
          sender: "HR Department",
          email: "hr@company-email.com",
          time: "9:15 AM",
          type: "email",
          actions: [
            { label: "✅ Abaikan dan konfirmasi ke HR langsung", correct: true },
            { label: "📧 Cek email resmi dari perusahaan", correct: true },
            { label: "📝 Isi formulir di link tersebut", correct: false }
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
          email: "noreply@pajak-online.co.id",
          time: "3:20 PM",
          type: "email",
          indicators: [
            { text: "Domain 'pajak-online.co.id' bukan domain resmi DJP (yang resmi: pajak.go.id)", suspicious: true },
            { text: "Pesan menggunakan tekanan psikologis dengan ancaman sanksi", suspicious: true },
            { text: "Ada batas waktu yang sangat ketat (3 hari)", suspicious: true },
            { text: "Pesan dikirim via SMS, bukan email resmi", suspicious: true },
            { text: "Menyebutkan jumlah tunggakan yang spesifik", suspicious: false },
            { text: "Menggunakan bahasa formal dan sopan", suspicious: false }
          ],
          actions: [
            { label: "💳 Lanjutkan pembayaran via link", correct: false },
            { label: "✅ Batalkan dan cek via www.pajak.go.id atau hubungi Kring Pajak 1500200", correct: true }
          ],
          correctFeedback: "Luar biasa! Kamu berhasil menahan diri di bawah tekanan. Pesan ini dirancang untuk bikin panik dengan ancaman sanksi. Tapi kamu tetap tenang dan memilih verifikasi dulu. Ini skill penting dalam hidup digital.",
          wrongFeedback: "Sayangnya, ini phishing canggih. Domain palsu, tekanan waktu, dan ancaman adalah taktik klasik penipu. Institusi resmi seperti DJP tidak akan kirim tagihan via link SMS. Selalu verifikasi ke sumber resmi."
        },
        {
          message: "Notifikasi Keamanan: Terdeteksi aktivitas mencurigakan pada akun Google Anda dari lokasi tidak dikenal (Beijing, China). Jika ini bukan Anda, segera amankan akun dengan verifikasi identitas di: google-security-check.com/verify/account. Abaikan pesan ini jika aktivitas tersebut adalah Anda. - Google Security Team",
          sender: "Google Security Alert",
          email: "security-alert@google-verify.com",
          time: "7:42 PM",
          type: "email",
          indicators: [
            { text: "Domain 'google-security-check.com' bukan domain resmi Google", suspicious: true },
            { text: "Menciptakan kepanikan dengan lokasi asing yang mencurigakan", suspicious: true },
            { text: "Link mengarah ke website eksternal, bukan akun Google langsung", suspicious: true },
            { text: "Tidak ada informasi spesifik tentang perangkat yang login", suspicious: true },
            { text: "Menyebutkan lokasi geografis yang spesifik", suspicious: false },
            { text: "Pesan terlihat profesional dengan logo Google", suspicious: false }
          ],
          actions: [
            { label: "🔐 Lanjutkan verifikasi via link yang diberikan", correct: false },
            { label: "✅ Batalkan dan login langsung ke myaccount.google.com untuk cek aktivitas", correct: true }
          ],
          correctFeedback: "Sempurna! Kamu tidak terjebak meski pesannya sangat meyakinkan. Google memang kirim notifikasi keamanan, tapi mereka tidak akan pernah minta kamu klik link eksternal. Selalu akses langsung via browser atau aplikasi resmi.",
          wrongFeedback: "Hampir tertipu! Ini phishing tingkat tinggi yang meniru Google. Domain palsu + kepanikan = resep penipuan. Google selalu minta kamu cek keamanan via myaccount.google.com, bukan link acak."
        }
      ]
    }
  ];

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
  };

  const currentLevelData = levels[currentLevel];
  const currentScenarioData = currentLevelData?.scenarios[currentScenario];
  const totalScenarios = levels.reduce((acc, level) => acc + level.scenarios.length, 0);

  if (feedback?.type === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Simulasi Selesai!</h2>
              <p className="text-gray-600 text-lg">Selamat, kamu telah menyelesaikan semua level</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <p className="text-gray-700 font-medium mb-2">Skor Akhir</p>
                <div className="text-6xl font-bold text-green-600 mb-2">{score}/{totalScenarios}</div>
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: totalScenarios }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < score ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">💡 Ingat Selalu:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Jangan pernah terburu-buru saat terima pesan mencurigakan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Verifikasi SELALU lewat kanal resmi, bukan dari link yang dikirim</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Institusi resmi tidak akan meminta data sensitif via pesan atau link</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Kalau ragu, lebih baik abaikan dan cek langsung ke sumbernya</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Ulangi Simulasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Simulasi Anti-Phishing</h1>
          <p className="text-gray-600">Latih kemampuanmu mengenali ancaman digital</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">Progress Simulasi</span>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{score}/{totalScenarios}</span>
            </div>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${((currentLevel * levels[0].scenarios.length + currentScenario + 1) / totalScenarios) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Level {currentLevel + 1} dari 3</span>
            <span>Skenario {currentScenario + 1} dari {currentLevelData.scenarios.length}</span>
          </div>
        </div>

        {/* Level Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 mb-6 shadow-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-bold">Level {currentLevel + 1}/3</span>
            </div>
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {currentLevelData.title}
          </h2>
          <p className="text-indigo-100 leading-relaxed">
            {currentLevelData.description}
          </p>
        </div>

        {/* Message Display - SMS/Email Style */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Message Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {currentScenarioData.type === 'sms' ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{currentScenarioData.sender}</h3>
                  <p className="text-sm text-gray-600">
                    {currentScenarioData.type === 'sms' ? currentScenarioData.phone : currentScenarioData.email}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{currentScenarioData.time}</span>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6 md:p-8">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {currentScenarioData.message}
              </p>
            </div>

            {/* Level 3: Indicator Selection */}
            {currentLevel === 2 && !showIndicatorSelection && (
              <div className="mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-5 mb-6 shadow-sm">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 mb-2">🎯 Tantangan Level 3</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Sebelum mengambil keputusan, identifikasi DUA indikator yang mencurigakan
                        dari pesan di atas. Ini melatihmu untuk tidak reaktif dan selalu observasi dulu.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-gray-900 text-lg">Pilih 2 indikator mencurigakan:</p>
                  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold">
                    {selectedIndicators.length}/2
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentScenarioData.indicators.map((indicator, index) => (
                    <button
                      key={index}
                      onClick={() => handleIndicatorSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedIndicators.includes(index)
                          ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]'
                          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          selectedIndicators.includes(index)
                            ? 'border-indigo-500 bg-indigo-500 shadow-sm'
                            : 'border-gray-300'
                        }`}>
                          {selectedIndicators.includes(index) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-gray-700 leading-relaxed">{indicator.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedIndicators.length === 2 && (
                  <button
                    onClick={() => handleActionSelect({ correct: true })}
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Lanjut ke Pilihan Tindakan
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Actions */}
            {(currentLevel !== 2 || showIndicatorSelection) && (
              <div>
                <p className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Apa yang akan kamu lakukan?
                </p>
                <div className="space-y-3">
                  {currentScenarioData.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionSelect(action)}
                      disabled={selectedAction !== null}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 font-medium ${
                        selectedAction === action
                          ? action.correct
                            ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                            : 'border-red-500 bg-red-50 text-red-700 shadow-lg'
                          : selectedAction !== null
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{action.label}</span>
                        {selectedAction === action && (
                          action.correct ? 
                            <CheckCircle className="w-6 h-6 text-green-600" /> : 
                            <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback */}
        {feedback && feedback.type !== 'complete' && (
          <div className={`rounded-2xl p-6 md:p-8 mb-6 shadow-xl ${
            feedback.type === 'success' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300' :
            feedback.type === 'error' ? 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300' :
            'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300'
          }`}>
            <div className="flex gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                feedback.type === 'success' ? 'bg-green-500' :
                feedback.type === 'error' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}>
                {feedback.type === 'success' ? <CheckCircle className="w-6 h-6 text-white" /> :
                 feedback.type === 'error' ? <XCircle className="w-6 h-6 text-white" /> :
                 <AlertTriangle className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-xl mb-3
