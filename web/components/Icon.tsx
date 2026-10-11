// One stroke family for every glyph on the site.
const paths = {
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  play: "M8 5.5v13l11-6.5z",
  pause: "M8 5v14M16 5v14",
} as const;

export default function Icon({ name, className = "h-3.5 w-3.5" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
