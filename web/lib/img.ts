import placeholders from "@/content/placeholders.json";

const ph = placeholders as Record<string, string>;

// A tiny blurred copy of the image shown as the background, so the frame is
// never an empty dark box while the real image downloads.
export function blur(src?: string): React.CSSProperties | undefined {
  const p = src && ph[src];
  return p ? { backgroundImage: `url(${p})`, backgroundSize: "cover", backgroundPosition: "center top" } : undefined;
}

// Picks the 400px copy on small screens when one was generated.
export function srcSet(src?: string) {
  if (!src || !ph[src] || src.endsWith("-853.webp")) return undefined;
  return `${src.replace(/\.webp$/, "-400.webp")} 400w, ${src} 720w`;
}
