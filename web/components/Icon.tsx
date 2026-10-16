// One stroke family for every glyph on the site.
const paths = {
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  play: "M8 5.5v13l11-6.5z",
  pause: "M8 5v14M16 5v14",
  close: "M6 6l12 12M18 6L6 18",
  sun: "M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-3.5 w-3.5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
