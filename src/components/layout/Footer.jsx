import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-sm font-extrabold">Finovo Edu</div>
            <div className="mt-1 text-xs text-slate-500">
              Platform edukasi fintech. Fokus literasi, keamanan, dan perlindungan konsumen.
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Catatan: Konten bersifat edukasi. Bukan ajakan membeli produk, bukan rekomendasi investasi, dan bukan pengganti nasihat profesional.
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            © {new Date().getFullYear()} Finovo Edu. Versi demo untuk tugas tim.
          </div>
        </div>
      </div>
    </footer>
  );
}
