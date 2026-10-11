"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import type { VoiceClip } from "@/content/site";

const fmt = (s: number) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";

export default function VoicePlayer({ clips }: { clips: VoiceClip[] }) {
  const styles = [...new Set(clips.map((c) => c.style))];
  const [style, setStyle] = useState(styles[0]);
  const list = clips.filter((c) => c.style === style);
  const [idx, setIdx] = useState(0);
  const clip = list[idx] ?? list[0];
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setT(0);
  }, [clip?.src]);

  if (!clip) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };

  return (
    <div className="border border-hair bg-wall-2 p-5 md:p-8">
      {styles.length > 1 && (
        <div className="mb-6 flex gap-6 text-sm" role="tablist">
          {styles.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={s === style}
              onClick={() => {
                setStyle(s);
                setIdx(0);
              }}
              className={`border-b pb-2 ${s === style ? "border-gilt-line text-ink" : "border-transparent text-ink-2"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-5">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gilt-line text-gilt transition-transform active:scale-95"
        >
          <Icon name={playing ? "pause" : "play"} className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-2xl">{clip.title}</p>
          <input
            type="range"
            min={0}
            max={d || 0}
            step={0.1}
            value={t}
            aria-label="Seek"
            onChange={(e) => {
              if (audio.current) audio.current.currentTime = Number(e.target.value);
            }}
            className="mt-3 w-full accent-[var(--gilt-line)]"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-2">
            <span>{fmt(t)}</span>
            <span>{fmt(d)}</span>
          </div>
        </div>
      </div>
      {list.length > 1 && (
        <ul className="mt-6 divide-y divide-hair border-t border-hair text-sm">
          {list.map((c, i) => (
            <li key={c.src}>
              <button
                onClick={() => setIdx(i)}
                className={`flex w-full justify-between py-3 text-left ${i === idx ? "text-gilt" : "text-ink-2 hover:text-ink"}`}
              >
                <span>{c.title}</span>
                <span>{c.duration}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <audio
        ref={audio}
        src={clip.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setD(e.currentTarget.duration)}
      />
    </div>
  );
}
