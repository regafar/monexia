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
      correctAnswer: 1,
      explanation: "Fintech (financial technology) adalah inovasi teknologi yang digunakan untuk mempermudah dan meningkatkan layanan keuangan, bukan hanya terbatas pada satu jenis aplikasi atau produk tertentu."
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
      correctAnswer: 1,
      explanation: "Phishing dan pencurian OTP merupakan ancaman keamanan siber yang paling umum dalam layanan fintech. Pelaku sering menyamar sebagai pihak resmi untuk mencuri data pribadi dan OTP pengguna."
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
      correctAnswer: 2,
      explanation: "Literasi keuangan digital memberikan pemahaman menyeluruh tentang produk fintech, termasuk manfaat, biaya tersembunyi, risiko yang mungkin terjadi, dan praktik keamanan dalam penggunaannya."
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
      correctAnswer: 1,
      explanation: "Payment (pembayaran), settlement (penyelesaian), dan clearing (kliring) adalah komponen inti dari sistem pembayaran yang memfasilitasi transfer dana antar pihak."
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
      correctAnswer: 0,
      explanation: "Market aggregator adalah platform yang mengumpulkan dan menampilkan berbagai produk atau layanan dari berbagai penyedia, memudahkan pengguna untuk membandingkan dan memilih yang terbaik."
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
      correctAnswer: 2,
      explanation: "Crowdfunding dan P2P (peer-to-peer) lending adalah model peminjaman dan pembiayaan alternatif yang menghubungkan pemberi pinjaman langsung dengan peminjam tanpa melalui lembaga keuangan tradisional."
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
      correctAnswer: 2,
      explanation: "OTP (One-Time Password) adalah kode rahasia yang bersifat pribadi dan hanya boleh diketahui oleh pemilik akun. Tidak ada pihak resmi yang akan meminta OTP Anda, termasuk customer service."
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
      correctAnswer: 1,
      explanation: "Pesan penipuan digital biasanya menciptakan rasa urgensi dan panik untuk membuat korban bertindak cepat tanpa berpikir, sering kali disertai link mencurigakan yang harus segera diklik."
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
      correctAnswer: 2,
      explanation: "Jangan pernah mengklik link mencurigakan. Selalu verifikasi informasi dengan membuka aplikasi resmi atau menghubungi layanan pelanggan melalui saluran resmi yang tertera di website perusahaan."
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
      correctAnswer: 1,
      explanation: "Regulasi fintech dirancang untuk melindungi hak dan keamanan konsumen sambil memberikan kepastian hukum bagi pelaku industri, sehingga inovasi dapat berkembang dengan aman dan terpercaya."
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
      correctAnswer: 1,
      explanation: "Transparansi adalah prinsip fundamental dalam perlindungan konsumen. Penyedia layanan fintech wajib menjelaskan secara jelas semua biaya, syarat, dan risiko yang mungkin dihadapi pengguna."
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
      correctAnswer: 1,
      explanation: "Dokumentasikan semua bukti transaksi, screenshot percakapan, dan detail kejadian. Segera laporkan ke penyedia layanan, bank terkait, dan jika perlu ke pihak berwenang seperti OJK atau kepolisian."
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
      correctAnswer: 1,
      explanation: "Fintech memberikan akses layanan keuangan yang lebih mudah, cepat, dan efisien, terutama bagi masyarakat yang sebelumnya sulit menjangkau layanan perbankan konvensional."
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
      correctAnswer: 1,
      explanation: "Information asymmetry (kesenjangan informasi) terjadi ketika pemilik usaha memiliki informasi lebih lengkap dibanding investor, yang dapat menyebabkan keputusan investasi yang kurang tepat."
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
      correctAnswer: 2,
      explanation: "OJK (Otoritas Jasa Keuangan) adalah lembaga yang berwenang mengawasi dan mengatur seluruh kegiatan jasa keuangan di Indonesia, termasuk platform P2P lending dan fintech lainnya."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
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
    setShowEvaluation(false);
    setSelectedOption(null);
    setIsLocked(false);
  };

  if (showEvaluation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Evaluasi Jawaban
            </h1>
            <p className="text-gray-700 text-lg">
              Berikut adalah evaluasi lengkap dari jawaban Anda beserta penjelasan untuk setiap pertanyaan.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      isCorrect ? 'bg-green-600' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {q.question}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {q.options.map((option, optIndex) => {
                          const isUserAnswer = userAnswer === optIndex;
                          const isCorrectAnswer = q.correctAnswer === optIndex;
                          
                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg border-2 ${
                                isCorrectAnswer
                                  ? 'border-green-600 bg-green-50'
                                  : isUserAnswer
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isCorrectAnswer && (
                                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                )}
                                <span className={`${
                                  isCorrectAnswer
                                    ? 'text-green-900 font-semibold'
                                    : isUserAnswer
                                    ? 'text-red-900 font-semibold'
                                    : 'text-gray-700'
                                }`}>
                                  {option}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">Penjelasan:</p>
                            <p className="text-sm text-blue-800">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={resetQuiz}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ulangi Kuis
            </button>
            <button 
              onClick={() => setShowEvaluation(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Kembali ke Hasil
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (showResult) {
    const score = getScore();
    const feedback = getFeedback(score);
    
    return (
      <div className="min-h-screen bg-gray-50">
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
              <button 
                onClick={() => setShowEvaluation(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Evaluasi
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
