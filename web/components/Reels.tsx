"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { blur, srcSet } from "@/lib/img";
import type { Video } from "@/content/site";

type HlsCtor = typeof import("hls.js").default;
let hlsLib: Promise<HlsCtor> | null = null;
const loadHls = () => (hlsLib ??= import("hls.js").then((m) => m.default));
const nativeHls = () => typeof document !== "undefined" && !!document.createElement("video").canPlayType("application/vnd.apple.mpegurl");

// Warm up a video before it's opened: fetch the stream playlists and the
// library so playback starts almost instantly on tap.
const warmed = new Set<string>();
function warm(v: Video) {
  if (!v.hls || warmed.has(v.hls)) return;
  warmed.add(v.hls);
  if (!nativeHls()) loadHls();
  fetch(v.hls).then((r) => r.text()).then((m) => {
    const first = m.split("\n").find((l) => l.endsWith(".m3u8"));
    if (first) fetch(new URL(first, new URL(v.hls!, location.href))).catch(() => {});
  }).catch(() => {});
}

const TILT = [-3, 2.5, -2, 3]; // same slant as the case-study phones

function ReelCard({ v, i, onOpen }: { v: Video; i: number; onOpen: () => void }) {
  return (
    <figure className="group">
      <button
        onClick={onOpen}
        onPointerEnter={() => warm(v)}
        onTouchStart={() => warm(v)}
        onFocus={() => warm(v)}
        aria-label={`Play ${v.title}`}
        className="relative block w-full overflow-hidden rounded-[1.6rem] border-[6px] border-wall-3 bg-wall-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-0 group-active:rotate-0"
        style={{ aspectRatio: v.aspect ?? "9 / 16", rotate: `${TILT[i % TILT.length]}deg` }}
      >
        {v.poster ? (
          <img
            src={v.poster}
            srcSet={srcSet(v.poster)}
            sizes="(min-width: 768px) 25vw, 78vw"
            style={blur(v.poster)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        ) : (
          <video src={`${v.src}#t=0.5`} preload="metadata" muted playsInline className="h-full w-full object-cover" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white transition-transform duration-300 group-hover:scale-110">
            <Icon name="play" className="h-4 w-4" />
          </span>
        </span>
        {v.metric && (
          <span className="absolute left-3 top-3 bg-wall/85 px-2.5 py-1 text-[11px] text-gilt">{v.metric}</span>
        )}
      </button>
      <figcaption className="mt-5 text-sm">
        <span className="text-ink">{v.title}</span>
        <span className="block text-ink-2">{v.client}</span>
      </figcaption>
    </figure>
  );
}

function Stream({ v }: { v: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let hls: InstanceType<HlsCtor> | null = null;
    let dead = false;
    const play = () => el.play().catch(() => {});
    if (!v.hls) {
      el.src = v.src;
      play();
    } else if (nativeHls()) {
      el.src = v.hls; // Safari / iOS stream natively
      play();
    } else {
      loadHls().then((Hls) => {
        if (dead) return;
        if (!Hls.isSupported()) {
          el.src = v.src;
          play();
          return;
        }
        hls = new Hls({
          capLevelToPlayerSize: true, // don't fetch 1080p into a small window
          startLevel: -1,
          abrEwmaDefaultEstimate: 2_000_000,
          maxBufferLength: 20,
          backBufferLength: 30,
        });
        hls.loadSource(v.hls!);
        hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED, play);
        hls.on(Hls.Events.ERROR, (_, d) => {
          if (d.fatal) {
            hls?.destroy();
            hls = null;
            el.src = v.src;
            play();
          }
        });
      });
    }
    return () => {
      dead = true;
      hls?.destroy();
      el.removeAttribute("src");
      el.load();
    };
  }, [v]);

  return (
    <div className="relative">
      <video
        ref={ref}
        poster={v.poster}
        controls
        playsInline
        preload="auto"
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        className="mx-auto block max-h-[74vh] w-full bg-black object-contain"
        style={{ aspectRatio: v.aspect ?? "9 / 16" }}
      />
      {waiting && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/25 border-t-gold" />
        </span>
      )}
    </div>
  );
}

function Player({ v, onClose }: { v: Video | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (v && !d.open) {
      document.querySelectorAll("audio, video").forEach((m) => (m as HTMLMediaElement).pause());
      d.showModal();
    } else if (!v && d.open) d.close();
  }, [v]);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={v?.title}
      className="m-auto w-[min(92vw,64rem)] max-w-none bg-transparent p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {v && (
        <div className="border border-hair bg-wall p-3 md:p-5">
          <div className="mb-3 flex items-start justify-between gap-4 md:mb-4">
            <div>
              <p className="font-serif text-xl md:text-2xl">{v.title}</p>
              <p className="text-sm text-ink-2">
                {v.client} · {v.category}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hair text-ink-2 transition-colors hover:border-gilt-line hover:text-gilt"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
          <Stream key={v.src} v={v} />
        </div>
      )}
    </dialog>
  );
}

export default function Reels({ videos }: { videos: Video[] }) {
  const cats = useMemo(() => [...new Set(videos.map((v) => v.category))], [videos]);
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<Video | null>(null);
  const shown = active === "All" ? videos : videos.filter((v) => v.category === active);

  return (
    <div>
      {cats.length > 1 && (
        <div className="-mx-5 mb-8 flex gap-6 overflow-x-auto px-5 text-sm md:mx-0 md:px-0" role="tablist">
          {["All", ...cats].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`shrink-0 border-b pb-2 transition-colors ${
                active === c ? "border-gilt-line text-ink" : "border-transparent text-ink-2 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="-mx-5 flex snap-x snap-mandatory gap-7 overflow-x-auto px-7 pb-6 pt-4 md:mx-0 md:grid md:grid-cols-4 md:items-start md:gap-x-10 md:gap-y-16 md:overflow-visible md:px-0">
        {shown.map((v, i) => (
          <div key={v.src} className="w-[78vw] shrink-0 snap-start self-start sm:w-[42vw] md:w-auto">
            <ReelCard v={v} i={i} onOpen={() => setOpen(v)} />
          </div>
        ))}
      </div>
      <Player v={open} onClose={() => setOpen(null)} />
    </div>
  );
}
