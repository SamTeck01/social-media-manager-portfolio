"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import type { Video } from "@/content/site";

function ReelCard({ v }: { v: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      document.querySelectorAll("video").forEach((o) => o !== el && o.pause());
      el.play();
    } else el.pause();
  };

  return (
    <figure className="group">
      <button
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${v.title}`}
        className="relative block aspect-[9/16] w-full overflow-hidden bg-wall-2"
      >
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          preload="none"
          playsInline
          loop
          className="h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white">
              <Icon name="play" className="h-4 w-4" />
            </span>
          </span>
        )}
        {v.metric && (
          <span className="absolute left-3 top-3 bg-wall/85 px-2.5 py-1 text-[11px] text-gilt">
            {v.metric}
          </span>
        )}
      </button>
      <figcaption className="mt-3 text-sm">
        <span className="text-ink">{v.title}</span>
        <span className="block text-ink-2">{v.client}</span>
      </figcaption>
    </figure>
  );
}

export default function Reels({ videos }: { videos: Video[] }) {
  const cats = useMemo(() => {
    const counts = new Map<string, number>();
    videos.forEach((v) => counts.set(v.category, (counts.get(v.category) ?? 0) + 1));
    return [...counts].filter(([, n]) => n >= 2).map(([c]) => c);
  }, [videos]);
  const [active, setActive] = useState("All");
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
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
        {shown.map((v) => (
          <div key={v.src} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-auto">
            <ReelCard v={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
