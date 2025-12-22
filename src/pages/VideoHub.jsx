import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";

export default function VideoHub() {
  const nav = useNavigate();

  const defaultIframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/5RHmGwAoY88?si=SR5HNUyNUPWNCJR0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

  // textarea (draft)
  const [embed, setEmbed] = useState(defaultIframe);

  // yang ditampilkan di preview (saved)
  const [savedEmbed, setSavedEmbed] = useState(defaultIframe);

  // ambil src dari iframe kalau ada
  const iframeSrc = useMemo(() => {
    const raw = (savedEmbed || "").trim();
    console.log("Raw savedEmbed:", raw); // Debug
    const m = raw.match(/src\s*=\s*["']([^"']+)["']/i);
    const extractedSrc = m ? m[1] : "";
    console.log("Extracted src:", extractedSrc); // Debug
    return extractedSrc;
  }, [savedEmbed]);

  // Debug saat komponen mount
  useEffect(() => {
    console.log("VideoHub mounted");
    console.log("Initial savedEmbed:", savedEmbed);
    console.log("Initial iframeSrc:", iframeSrc);
  }, []);

  const handleSave = () => {
    console.log("Saving embed:", embed); // Debug
    setSavedEmbed(embed);
  };

  const handleClear = () => {
    setEmbed("");
    setSavedEmbed("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-500">Monexia</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">
              Video Pembelajaran
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Tempel iframe YouTube atau embed lain. Halaman ini dibuat khusus supaya rapi.
            </div>
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => nav(-1)}>← Kembali</SecondaryButton>
            <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
          </div>
        </div>
      </div>

      <Card title="Slot Video" desc="Kamu bisa tempel iframe kapan saja.">
        <div className="space-y-3">
          <div className="text-sm text-slate-600">Tempel kode iframe di bawah (optional).</div>

          <textarea
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            placeholder="<iframe ...></iframe>"
            className="h-28 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-green-400"
          />

          <div className="flex flex-wrap gap-2">
            <PrimaryButton onClick={handleSave}>Simpan Tampilan</PrimaryButton>
            <SecondaryButton onClick={handleClear}>Kosongkan</SecondaryButton>
          </div>

          {/* Info Debug */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-xs">
            <div className="font-semibold text-blue-700">Debug Info:</div>
            <div className="mt-1 text-blue-600">
              <div>Iframe Src: {iframeSrc || "(kosong)"}</div>
              <div>Has Saved Embed: {savedEmbed ? "Ya" : "Tidak"}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-500">Preview</div>

            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4">
              {!savedEmbed ? (
                <div className="text-sm text-slate-600">
                  Segment video masih kosong. Nanti kamu tinggal tempel iframe di atas.
                </div>
              ) : iframeSrc ? (
                <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-black">
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={iframeSrc}
                      title="Video Pembelajaran"
                      className="absolute left-0 top-0 h-full w-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      onError={(e) => console.error("Iframe error:", e)}
                      onLoad={() => console.log("Iframe loaded successfully")}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: savedEmbed }}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
