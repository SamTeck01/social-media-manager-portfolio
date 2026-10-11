"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

// The gallery's light switch: toggles the theme with a whole-room cross-fade.
export default function Lights() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    setMode(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const flip = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setMode(next);
    };
    try {
      localStorage.setItem("lights", next);
    } catch {}
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else apply();
  };

  const on = mode !== "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Gallery lights"
      onClick={flip}
      className="group flex items-center gap-2.5 text-[13px] text-ink-2 transition-colors hover:text-ink"
    >
      <span className="hidden sm:inline">Lights</span>
      <span className="relative h-[18px] w-8 rounded-full border border-hair transition-colors group-hover:border-gilt-line">
        <span
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-[var(--ease-out-expo)] ${
            on ? "left-[17px] bg-gilt-line" : "left-[3px] bg-ink-2"
          }`}
        />
      </span>
      <span className="w-6 text-left">{mode === null ? "" : on ? "On" : "Off"}</span>
    </button>
  );
}
