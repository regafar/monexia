import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";

export default function VideoHub() {
  const nav = useNavigate();

  const STORAGE_KEY = "monexia_video_embed";

  const DEFAULT_EMBED = `
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/oRYo3zHc-10?si=8eq9ebe36wKU2Dx3"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>
`;

  const [embed, setEmbed] = useState("");
  const [savedEmbed, setSavedEmbed] = useState("");

  // ambil video saat halaman dibuka
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEmbed(saved);
      setSavedEmbed(saved);
    } else {
      setEmbed(DEFAULT_EMBED);
      setSavedEmbed(DEFAULT_EMBED);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, embed);
    setSavedEmbed(embed);
  };

  const handleClear = () => {
    setEmbed("");
    setSavedEmbed("");
    localStorage.removeItem(STORAGE_KEY);
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
              Video edukasi ditampilkan langsung dari YouTube.
            </div>
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => nav(-1)}>← Kembali</SecondaryButton>
            <SecondaryButton onClick={() => nav("/")}>Beranda</SecondaryButton>
          </div>
        </div>
      </div>

      <Card title="Slot Video" desc="Video dapat diganti kapan saja.">
        <div className="space-y-4">
          <div className="text-sm text-slate-600">
            Tempel kode iframe YouTube di bawah jika ingin mengganti video.
          </div>

          <textarea
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            className="h-36 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-green-400"
          />

          <div className="flex gap-2">
            <PrimaryButton onClick={handleSave}>Simpan Video</PrimaryButton>
            <SecondaryButton onClick={handleClear}>Hapus Video</SecondaryButton>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-500">Preview</div>

            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4">
              {!savedEmbed ? (
                <div className="text-sm text-slate-600">
                  Belum ada video.
                </div>
              ) : (
                <div
                  className="w-full overflow-hidden rounded-2xl"
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
