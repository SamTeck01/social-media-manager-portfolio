"use client";

import { useEffect, useState } from "react";

type Link = { href: string; label: string };

export default function Nav({ name, links }: { name: string; links: Link[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-bg/95 border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" className="font-serif text-xl tracking-wide md:text-2xl">
          {name}
        </a>
        <ul className="hidden items-center gap-9 text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="border border-gold px-5 py-2.5 text-gold transition-colors hover:bg-gold hover:text-bg"
            >
              Work with me
            </a>
          </li>
        </ul>
        <button
          className="-mr-2 p-2 text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] px-5 pt-10 md:hidden">
          <ul className="space-y-6">
            {[...links, { href: "#contact", label: "Work with me" }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="font-serif text-4xl">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
