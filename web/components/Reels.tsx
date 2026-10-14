"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import type { Video } from "@/content/site";

function ReelCard({ v, onOpen }: { v: Video; onOpen: () => void }) {
  return (
    <figure className="group">
      <button
        onClick={onOpen}
        aria-label={`Play ${v.title}`}
        className="relative block w-full overflow-hidden bg-wall-2"
        style={{ aspectRatio: v.aspect ?? "9 / 16" }}
      >
        <img
          src={v.poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white transition-transform duration-300 group-hover:scale-110">
            <Icon name="play" className="h-4 w-4" />
          </span>
        </span>
        {v.metric && (
          <span className="absolute left-3 top-3 bg-wall/85 px-2.5 py-1 text-[11px] text-gilt">{v.metric}</span>
        )}
      </button>
      <figcaption className="mt-3 text-sm">
        <span className="text-ink">{v.title}</span>
        <span className="block text-ink-2">{v.client}</span>
      </figcaption>
    </figure>
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
          <video
            key={v.src}
            src={v.src}
            poster={v.poster}
            controls
            autoPlay
            playsInline
            className="mx-auto block max-h-[74vh] w-full bg-black object-contain"
            style={{ aspectRatio: v.aspect ?? "9 / 16" }}
          />
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
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:items-start md:gap-6 md:overflow-visible md:px-0">
        {shown.map((v) => (
          <div key={v.src} className="w-[78vw] shrink-0 snap-start self-start sm:w-[42vw] md:w-auto">
            <ReelCard v={v} onOpen={() => setOpen(v)} />
          </div>
        ))}
      </div>
      <Player v={open} onClose={() => setOpen(null)} />
    </div>
  );
}
