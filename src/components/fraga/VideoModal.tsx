import { useEffect, useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import { trackConversion } from "@/lib/whatsapp";

export type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  person: string;
  role: string;
};

function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function VideoCard({ v, onPlay }: { v: VideoItem; onPlay: (v: VideoItem) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPlay(v)}
      className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-dark text-left shadow-elegant transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={thumb(v.youtubeId)}
          alt={`Depoimento — ${v.person}, ${v.role}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1200ms] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.03_220/0.9)] via-[oklch(0.18_0.03_220/0.45)] to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-accent text-accent-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full bg-accent/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="relative w-7 h-7 fill-current" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="text-[11px] uppercase tracking-[0.2em] text-accent-glow font-semibold mb-2">
            Depoimento em vídeo
          </div>
          <div className="text-xl lg:text-2xl font-bold leading-tight">{v.title}</div>
          <div className="mt-2 text-sm text-white/75">
            {v.person} <span className="text-white/40">·</span> {v.role}
          </div>
        </div>
      </div>
    </button>
  );
}

export function VideoModal({ video, onClose }: { video: VideoItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fn);
    };
  }, [video, onClose]);

  if (!video) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vídeo — ${video.title}`}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className="absolute inset-0 bg-[oklch(0.1_0.03_220/0.85)] backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl">
        <div className="flex items-center justify-between mb-3 text-white">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent-glow font-semibold">Depoimento</div>
            <div className="text-lg font-bold">{video.person} — {video.role}</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://youtu.be/${video.youtubeId}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-3 py-1.5 rounded-full border border-white/15"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Abrir no YouTube
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar vídeo"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-elegant bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export function useVideoModal() {
  const [active, setActive] = useState<VideoItem | null>(null);
  const open = (v: VideoItem) => {
    trackConversion("video_testimonial_click", v.title);
    setActive(v);
  };
  const close = () => setActive(null);
  return { active, open, close };
}