"use client";

import { useEffect } from "react";

// Splits .split headings into masked words, then adds .is-in to every
// .reveal / .split / .curtain element once it enters view. One shared observer.
export default function Reveal() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".split:not([data-split])").forEach((el) => {
      el.dataset.split = "";
      let i = 0;
      const walk = (node: Node) => {
        for (const child of [...node.childNodes]) {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            for (const part of (child.textContent ?? "").split(/(\s+)/)) {
              if (!part) continue;
              if (/^\s+$/.test(part)) {
                frag.append(part);
                continue;
              }
              const w = document.createElement("span");
              w.className = "w";
              const inner = document.createElement("span");
              inner.textContent = part;
              inner.style.setProperty("--i", String(i++));
              w.append(inner);
              frag.append(w);
            }
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
        }
      };
      walk(el);
    });

    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .split:not(.is-in), .curtain:not(.is-in)");
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px 15% 0px" } // start just before it scrolls in, so nothing is ever blank on screen,
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
