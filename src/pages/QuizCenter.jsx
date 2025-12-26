import React, { useState } from 'react';

const FintechLiteracyQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "Fintech paling tepat berarti …",
      options: [
        "Aplikasi hiburan dengan fitur transfer",
        "Layanan keuangan yang dipermudah teknologi",
        "Semua hal tentang kripto",
        "Satu perusahaan dompet digital"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Risiko fintech yang paling sering terjadi adalah …",
      options: [
        "Antrian panjang",
        "Phishing dan pencurian OTP",
        "Keterlambatan pos",
        "Uang tunai rusak"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Literasi keuangan digital membantu pengguna untuk …",
      options: [
        "Membagikan OTP ke customer service",
        "Mengabaikan syarat dan biaya",
        "Memahami manfaat, biaya, risiko, dan cara pakai aman",
        "Selalu mengikuti tren produk"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "Payment, settlement, dan clearing termasuk dalam kategori …",
      options: [
        "Market aggregator",
        "Sistem pembayaran",
        "Manajemen investasi dan risiko",
        "Jasa finansial lainnya"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Market aggregator paling tepat digunakan untuk …",
      options: [
        "Membandingkan produk dari banyak penyedia",
        "Menghapus semua risiko penipuan",
        "Mengubah saldo tanpa transaksi",
        "Mengirim OTP ke pengguna"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      question: "Crowdfunding dan P2P lending termasuk kategori …",
      options: [
        "Sistem pembayaran",
        "Pendukung pasar",
        "Peminjaman dan pembiayaan",
        "Jasa finansial lainnya"
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "OTP seharusnya …",
      options: [
        "Dibagikan ke siapa pun yang mengaku CS",
        "Dikirim ke teman dekat",
        "Dirahasiakan dan tidak dibagikan",
        "Diposting jika diminta admin"
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      question: "Ciri pesan penipuan digital yang umum adalah …",
      options: [
        "Bahasanya tenang dan tidak mendesak",
        "Mendesak, bikin panik, dan minta klik link cepat",
        "Selalu memakai email resmi",
        "Tidak pernah meminta data"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "Langkah aman saat menerima link verifikasi mencurigakan adalah …",
      options: [
        "Klik dulu baru dicek",
        "Kirim OTP agar cepat selesai",
        "Abaikan dan cek lewat aplikasi resmi",
        "Teruskan ke grup chat"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      question: "Tujuan utama regulasi fintech adalah …",
      options: [
        "Menghambat inovasi digital",
        "Melindungi konsumen dan memberi kepastian hukum",
        "Mewajibkan semua orang memakai e-wallet",
        "Menghapus seluruh risiko teknologi"
      ],
      correctAnswer: 1
    },
    {
      id: 11,
      question: "Salah satu prinsip perlindungan konsumen dalam layanan fintech adalah …",
      options: [
        "OTP boleh diminta oleh CS",
        "Transparansi biaya, syarat, dan risiko",
        "Syarat disembunyikan agar cepat",
        "Pengaduan tidak diperlukan"
      ],
      correctAnswer: 1
    },
    {
      id: 12,
      question: "Jika menjadi korban penipuan transaksi digital, langkah paling tepat adalah …",
      options: [
        "Menghapus semua bukti",
        "Mengumpulkan bukti dan melapor lewat jalur resmi",
        "Mengirim ulang uang agar dikembalikan",
        "Memberikan password ke pihak lain"
      ],
      correctAnswer: 1
    },
    {
      id: 13,
      question: "Salah satu manfaat utama fintech bagi masyarakat adalah …",
      options: [
        "Proses keuangan menjadi lebih rumit",
        "Akses layanan keuangan lebih mudah dan efisien",
        "Menghilangkan seluruh risiko keuangan",
        "Menggantikan peran pengguna"
      ],
      correctAnswer: 1
    },
    {
      id: 14,
      question: "Salah satu risiko utama dalam investasi digital berbasis equity crowdfunding adalah …",
      options: [
        "Inflasi",
        "Information asymmetry",
        "Pajak tinggi",
        "Nilai tukar rupiah"
      ],
      correctAnswer: 1
    },
    {
      id: 15,
      question: "Sebuah platform pinjaman online (P2P lending) melanggar aturan perlindungan konsumen dengan bunga tidak transparan dan penagihan tidak etis. Siapa yang bertugas menanganinya?",
      options: [
        "Bank Indonesia (BI)",
        "Kementerian Komunikasi dan Informatika (Kominfo)",
        "Otoritas Jasa Keuangan (OJK)",
        "Kementerian Keuangan"
      ],
      correctAnswer: 2
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    if (!isLocked) {
      setSelectedOption(optionIndex);
    }
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedOption });
      setSelectedOption(null);
      setIsLocked(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
      setIsLocked(false);
    }
  };

  const calculateResult = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setShowResult(true);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getFeedback = (score) => {
    if (score >= 80) {
      return {
        title: "Luar Biasa!",
        message: "Pemahaman literasi fintech Anda sangat baik. Terus pertahankan dan praktikkan pengetahuan ini dalam kehidupan sehari-hari.",
        color: "text-green-700"
      };
    } else if (score >= 60) {
      return {
        title: "Cukup Baik",
        message: "Anda memiliki pemahaman dasar yang baik tentang literasi fintech. Tingkatkan pengetahuan dengan belajar lebih dalam tentang keamanan dan risiko digital.",
        color: "text-blue-700"
      };
    } else {
      return {
        title: "Perlu Peningkatan",
        message: "Literasi fintech Anda masih perlu ditingkatkan. Pelajari lebih lanjut tentang layanan keuangan digital dan cara menggunakannya dengan aman.",
        color: "text-orange-700"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setSelectedOption(null);
    setIsLocked(false);
  };

  if (showResult) {
    const score = getScore();
    const feedback = getFeedback(score);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">MoneEdu</span>
                  <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">EDU</span>
                </div>
                <p className="text-sm text-gray-600">Edukasi fintech, aman, terarah</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Beranda
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kuis Selesai!</h1>
            <p className="text-gray-600 mb-8">Berikut adalah hasil evaluasi literasi fintech Anda</p>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-6">
              <div className="text-6xl font-bold text-green-600 mb-2">{score}</div>
              <div className="text-gray-700 text-lg">dari 100</div>
            </div>
            
            <div className={`bg-gray-50 rounded-xl p-6 mb-8 text-left`}>
              <h3 className={`text-xl font-bold mb-2 ${feedback.color}`}>{feedback.title}</h3>
              <p className="text-gray-700">{feedback.message}</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Ulangi Kuis
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">MoneEdu</span>
                <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">EDU</span>
              </div>
              <p className="text-sm text-gray-600">Edukasi fintech, aman, terarah</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Beranda
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm p-8 mb-8">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="mr-2">📚</span>
            KUIS EVALUASI LITERASI FINTECH
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kuis Literasi Fintech
          </h1>
          
          <p className="text-gray-700 text-lg">
            Uji pemahaman Anda tentang layanan keuangan digital, keamanan transaksi, dan cara menggunakan fintech dengan bijak. Kuis ini terdiri dari 15 pertanyaan pilihan ganda.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </span>
              <span className="text-sm font-semibold text-green-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOption === index
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                } ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === index
                      ? 'border-green-600 bg-green-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === index && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sebelumnya
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedOption === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FintechLiteracyQuiz;
