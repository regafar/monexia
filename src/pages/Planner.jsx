// src/pages/Planner.jsx
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useTransition
} from "react";
import Card from "../components/ui/Card";
import SecondaryButton from "../components/ui/SecondaryButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

function formatIDR(n) {
  const num = Number.isFinite(n) ? n : 0;
  return "Rp " + num.toLocaleString("id-ID");
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function digitsOnly(s) {
  return String(s ?? "").replace(/[^\d]/g, "");
}

const BudgetRow = memo(function BudgetRow({ label, value, setValue, sliderMax }) {
  const [isPending, startTransition] = useTransition();

  const [localVal, setLocalVal] = useState(value);
  const [text, setText] = useState(String(value));

  const draggingRef = useRef(false);
  const typingRef = useRef(false);

  // Sync dari parent -> local (tapi jangan ganggu saat drag / ngetik)
  useEffect(() => {
    if (draggingRef.current) return;
    if (typingRef.current) return;
    setLocalVal(value);
    setText(String(value));
  }, [value]);

  const safeMax = Math.max(sliderMax, localVal);

  const commit = useCallback(
    (nextVal) => {
      const v = clamp(Number.isFinite(nextVal) ? nextVal : 0, 0, 1000000000);
      startTransition(() => setValue(v));
    },
    [setValue, startTransition]
  );

  // Range: halus karena selama drag hanya update state lokal,
  // commit ke parent cuma saat lepas drag.
  const onRangeChange = useCallback((e) => {
    draggingRef.current = true;
    const v = parseInt(e.target.value, 10) || 0;
    setLocalVal(v);
    setText(String(v));
  }, []);

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    commit(localVal);
  }, [commit, localVal]);

  // Input nominal: tidak maksa update parent tiap ketikan (biar tidak “satu-satu”).
  // Parent di-update saat blur atau Enter.
  const onTextFocus = useCallback(() => {
    typingRef.current = true;
  }, []);

  const onTextChange = useCallback(
    (e) => {
      typingRef.current = true;
      const raw = digitsOnly(e.target.value);
      setText(raw);

      // Biar label Rp di kanan tetap nyambung saat user ngetik,
      // kita update localVal saja (tidak rerender seluruh page).
      const v = clamp(parseInt(raw || "0", 10), 0, 1000000000);
      setLocalVal(v);
    },
    []
  );

  const onTextBlur = useCallback(() => {
    typingRef.current = false;
    const raw = digitsOnly(text);
    const v = clamp(parseInt(raw || "0", 10), 0, 1000000000);
    setText(String(v));
    setLocalVal(v);
    commit(v);
  }, [text, commit]);

  const onTextKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      }
    },
    []
  );

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-extrabold text-slate-900">{label}</div>
        <div className="text-sm text-slate-700">{formatIDR(localVal)}</div>
      </div>

      <input
        type="range"
        min={0}
        max={safeMax}
        step={50000}
        value={localVal}
        onChange={onRangeChange}
        onMouseUp={endDrag}
        onTouchEnd={endDrag}
        onPointerUp={endDrag}
        className="w-full accent-blue-600"
      />

      <div className="grid grid-cols-[1fr_140px] gap-2">
        <div className="text-xs text-slate-500">
          Geser untuk mengubah nominal.
          {isPending ? " " : ""}
        </div>

        <input
          value={text}
          onFocus={onTextFocus}
          onChange={onTextChange}
          onBlur={onTextBlur}
          onKeyDown={onTextKeyDown}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-900"
          inputMode="numeric"
          placeholder="0"
        />
      </div>
    </div>
  );
});

export default function Planner() {
  const nav = useNavigate();
  const [isPending, startTransition] = useTransition();

  const [income, setIncome] = useState(5000000);

  // Nilai tiap pos (bisa diubah)
  const [wajib, setWajib] = useState(2500000);
  const [makan, setMakan] = useState(1500000);
  const [nonwajib, setNonwajib] = useState(500000);
  const [hiburan, setHiburan] = useState(300000);
  const [tabungan, setTabungan] = useState(0);

  const totalExpense = useMemo(() => {
    return wajib + makan + nonwajib + hiburan + tabungan;
  }, [wajib, makan, nonwajib, hiburan, tabungan]);

  const sisa = useMemo(() => income - totalExpense, [income, totalExpense]);

  const maxSlider = useMemo(() => Math.max(1000000, income), [income]);

  // Income input: local text (biar tidak “satu-satu” dan tidak maksa delete)
  const [incomeText, setIncomeText] = useState(String(income));
  const incomeTypingRef = useRef(false);

  useEffect(() => {
    if (incomeTypingRef.current) return;
    setIncomeText(String(income));
  }, [income]);

  const commitIncome = useCallback(
    (next) => {
      const v = clamp(parseInt(digitsOnly(next) || "0", 10), 0, 1000000000);
      startTransition(() => setIncome(v));
    },
    [startTransition]
  );

  const onIncomeFocus = useCallback(() => {
    incomeTypingRef.current = true;
  }, []);

  const onIncomeChange = useCallback(
    (e) => {
      incomeTypingRef.current = true;
      const raw = digitsOnly(e.target.value);
      setIncomeText(raw);
      // update income low-priority supaya UI lain tidak bikin seret
      commitIncome(raw);
    },
    [commitIncome]
  );

  const onIncomeBlur = useCallback(() => {
    incomeTypingRef.current = false;
    const raw = digitsOnly(incomeText);
    const v = clamp(parseInt(raw || "0", 10), 0, 1000000000);
    setIncomeText(String(v));
    startTransition(() => setIncome(v));
  }, [incomeText, startTransition]);

  const onIncomeKeyDown = useCallback((e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  }, []);

  // Jaga pos tidak lewat max saat income turun
  useEffect(() => {
    const hardMax = Math.max(1000000, income);
    startTransition(() => {
      setWajib((v) => clamp(v, 0, hardMax));
      setMakan((v) => clamp(v, 0, hardMax));
      setNonwajib((v) => clamp(v, 0, hardMax));
      setHiburan((v) => clamp(v, 0, hardMax));
      setTabungan((v) => clamp(v, 0, hardMax));
    });
  }, [income, startTransition]);

  const status = useMemo(() => {
    if (income <= 0) {
      return {
        tone: "neutral",
        title: "Pendapatan belum diatur",
        desc: [
          "Untuk membaca kondisi keuangan dengan tepat, kamu perlu memasukkan total pendapatan bulanan terlebih dahulu.",
          "Tanpa angka pendapatan, sistem tidak bisa menentukan apakah anggaran kamu sehat, pas-pasan, atau defisit.",
          "",
          "Tips cepat:",
          "• Gunakan pendapatan bersih (setelah potongan rutin).",
          "• Kalau pendapatan tidak tetap, pakai rata-rata 3 bulan terakhir.",
          "• Angka yang realistis lebih berguna daripada angka yang terlalu optimis."
        ]
      };
    }

    if (sisa < 0) {
      return {
        tone: "danger",
        title: "Anggaran defisit",
        desc: [
          "Pengeluaran kamu saat ini lebih besar daripada pendapatan. Ini tanda kamu sedang ‘bocor’ di beberapa pos, atau ada beban yang memang terlalu berat untuk ditutup oleh pemasukan bulanan.",
          "Kalau kondisi ini berlangsung lama, biasanya orang menutup kekurangan dengan utang baru. Itu membuat beban bulan depan makin berat.",
          "",
          "Langkah yang bisa kamu lakukan sekarang:",
          "• Prioritaskan kebutuhan wajib dulu, baru kebutuhan lain.",
          "• Tekan pengeluaran gaya hidup sementara waktu sampai kembali aman.",
          "• Evaluasi cicilan atau biaya rutin: adakah yang bisa diturunkan, ditunda, atau dinegosiasikan?",
          "• Kalau memungkinkan, cari tambahan pemasukan jangka pendek.",
          "",
          "Target sederhana: buat anggaran kembali minimal ‘nol’ dulu (tidak defisit), baru naik ke kondisi punya sisa."
        ]
      };
    }

    if (sisa === 0) {
      return {
        tone: "warn",
        title: "Anggaran pas-pasan",
        desc: [
          "Semua pendapatan kamu habis teralokasi. Ini artinya kamu berjalan tepat di garis batas: aman untuk hari ini, tapi rentan kalau ada kejadian mendadak.",
          "Kondisi ini belum berarti buruk, tapi ruang napasnya tipis. Dana darurat dan tabungan jadi sulit terbentuk kalau tidak ada sisa sama sekali.",
          "",
          "Tips perbaikan kecil tapi efektif:",
          "• Cari 1 pos yang bisa dipangkas sedikit saja (misal hiburan atau non-wajib).",
          "• Mulai tabungan mikro: 2%–5% dulu juga tidak apa-apa, yang penting konsisten.",
          "• Coba buat batas pengeluaran mingguan agar lebih terkontrol.",
          "",
          "Target realistis: sisihkan minimal satu porsi kecil tiap bulan untuk dana darurat."
        ]
      };
    }

    const ratio = sisa / income;

    if (ratio >= 0.15) {
      return {
        tone: "good",
        title: "Anggaran sehat",
        desc: [
          "Kondisi keuangan kamu tergolong sehat. Setelah kebutuhan bulanan terpenuhi, kamu masih punya sisa dana yang cukup besar. Ini tanda pengeluaran kamu terkendali dan kamu tidak ‘memaksa’ gaya hidup melebihi pendapatan.",
          `Sisa dana kamu (${formatIDR(sisa)}) punya potensi besar untuk memperkuat masa depan finansial: tabungan, dana darurat, atau investasi bertahap.`,
          "",
          "Tips lanjutan biar makin mantap:",
          "• Pastikan dana darurat minimal 3–6 bulan pengeluaran (mulai dari 1 bulan dulu juga oke).",
          "• Kalau dana darurat sudah aman, kamu bisa bagi tabungan ke tujuan: jangka pendek, menengah, dan panjang.",
          "• Hindari ‘lifestyle naik’ hanya karena merasa aman. Naiknya pelan-pelan, bukan langsung lompat.",
          "",
          "Kalimat kuncinya: konsistensi lebih penting daripada sempurna."
        ]
      };
    }

    return {
      tone: "ok",
      title: "Anggaran cukup aman",
      desc: [
        "Keuangan kamu sudah di jalur yang cukup aman. Pengeluaran tidak melebihi pendapatan, dan masih ada sisa dana di akhir bulan. Ini sudah lebih baik daripada kondisi defisit.",
        `Sisa dana kamu (${formatIDR(sisa)}) memang belum besar, tapi cukup untuk mulai membangun kebiasaan menabung secara konsisten.`,
        "",
        "Tips supaya anggaran naik level:",
        "• Tambah tabungan sedikit demi sedikit (misal naik 50 ribu–100 ribu per bulan).",
        "• Audit pengeluaran kecil yang sering tidak terasa (jajan, langganan, biaya layanan).",
        "• Buat aturan sederhana: sebelum belanja non-wajib, pastikan tabungan sudah ‘dibayar’ dulu.",
        "",
        "Target yang enak: naikan sisa dana sampai minimal 10% pendapatan, bertahap."
      ]
    };
  }, [income, sisa]);

  const toneBoxClass = useMemo(() => {
    if (status.tone === "danger") return "border-red-200 bg-red-50";
    if (status.tone === "warn") return "border-amber-200 bg-amber-50";
    if (status.tone === "good") return "border-green-200 bg-green-50";
    if (status.tone === "ok") return "border-emerald-200 bg-emerald-50";
    return "border-slate-200 bg-slate-50";
  }, [status.tone]);

  const toneTextClass = useMemo(() => {
    if (status.tone === "danger") return "text-red-800";
    if (status.tone === "warn") return "text-amber-800";
    if (status.tone === "good") return "text-green-800";
    if (status.tone === "ok") return "text-emerald-800";
    return "text-slate-800";
  }, [status.tone]);

  return (
    <div className="space-y-6">
      <Card
        title="Rencana Keuangan"
        desc="Atur pendapatan dan detail pengeluaran. Ringkasan anggaran akan otomatis menyesuaikan nilai yang kamu masukkan."
      >
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => nav(-1)}>← Kembali</SecondaryButton>
          <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
        </div>

        {/* Pendapatan */}
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">
            Total Pendapatan Bersih Bulanan:
          </div>

          <div className="mt-3">
            <input
              value={incomeText}
              onFocus={onIncomeFocus}
              onChange={onIncomeChange}
              onBlur={onIncomeBlur}
              onKeyDown={onIncomeKeyDown}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-3xl font-extrabold text-green-700 outline-none focus:border-green-300"
              inputMode="numeric"
              placeholder="0"
            />
            <div className="mt-2 text-xs text-slate-500">
              Ketik angka saja. Contoh: 5000000
              {isPending ? " " : ""}
            </div>
          </div>
        </div>

        {/* Detail Pengeluaran */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-2xl font-extrabold text-slate-900">Detail Pengeluaran:</div>
          <div className="mt-2 h-px w-full bg-slate-200" />

          <div className="mt-5 space-y-6">
            <BudgetRow
              label="Kebutuhan Wajib (Sewa/Cicilan)"
              value={wajib}
              setValue={setWajib}
              sliderMax={maxSlider}
            />
            <BudgetRow
              label="Makanan & Transportasi"
              value={makan}
              setValue={setMakan}
              sliderMax={maxSlider}
            />
            <BudgetRow
              label="Utang/Cicilan (Non-wajib)"
              value={nonwajib}
              setValue={setNonwajib}
              sliderMax={maxSlider}
            />
            <BudgetRow
              label="Hiburan & Gaya Hidup"
              value={hiburan}
              setValue={setHiburan}
              sliderMax={maxSlider}
            />
            <BudgetRow
              label="Tabungan/Investasi"
              value={tabungan}
              setValue={setTabungan}
              sliderMax={maxSlider}
            />
          </div>
        </div>

        {/* Ringkasan Anggaran */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-2xl font-extrabold text-slate-900">Ringkasan Anggaran:</div>
          <div className="mt-2 h-px w-full bg-slate-200" />

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="font-extrabold text-slate-900">Total Pendapatan:</div>
              <div className="font-extrabold text-green-700">{formatIDR(income)}</div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="font-extrabold text-slate-900">Total Pengeluaran:</div>
              <div className="font-extrabold text-red-600">{formatIDR(totalExpense)}</div>
            </div>

            <div className="h-px w-full bg-slate-200" />

            <div className="flex items-center justify-between gap-3">
              <div className="text-3xl font-extrabold text-slate-900">Sisa Dana (Tabungan):</div>
              <div className="text-3xl font-extrabold text-blue-700">{formatIDR(sisa)}</div>
            </div>

            <div className={`rounded-2xl border p-4 ${toneBoxClass}`}>
              <div className={`font-extrabold ${toneTextClass}`}>{status.title}</div>

              <div className="mt-2 space-y-2 text-slate-700">
                {status.desc.map((line, idx) => (
                  <div key={idx}>{line === "" ? <div className="h-2" /> : line}</div>
                ))}
              </div>

              <div className="mt-3 text-xs text-slate-600">
                Catatan: fitur ini bersifat edukatif dan preventif. Tujuannya membantu kamu memahami pola anggaran, bukan memberi nasihat keuangan yang mengikat.
              </div>
            </div>

            <div className="mt-4">
              <PrimaryButton
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Simulasikan Anggaran
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
