"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Mode = "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    setMode(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const flip = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setMode(next);
    };
    try {
      localStorage.setItem("theme", next);
    } catch {}
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) doc.startViewTransition(apply);
    else apply();
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-hair text-ink-2 transition-[color,border-color,transform] duration-200 hover:border-gold hover:text-gold active:scale-95"
    >
      <Icon name={mode === "light" ? "moon" : "sun"} className="h-4 w-4" />
    </button>
  );
}
