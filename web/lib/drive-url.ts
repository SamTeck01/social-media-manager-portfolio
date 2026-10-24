// Client-safe helpers for media that lives in her Google Drive folder.
// A Drive item's src is its share link: https://drive.google.com/file/d/<id>/view
export const isDrive = (src?: string) => !!src && /^https:\/\/drive\.google\.com\//.test(src);
export const driveIdOf = (src: string) => src.match(/\/d\/([\w-]+)/)?.[1] ?? new URL(src).searchParams.get("id") ?? "";
export const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
// Drive's own player: streams and converts any format (incl. iPhone .MOV).
export const drivePreview = (src: string) => `https://drive.google.com/file/d/${driveIdOf(src)}/preview`;
export const driveThumb = (id: string, w = 800) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
// Direct file for <audio>.
export const driveAudio = (src: string) => `https://drive.google.com/uc?export=download&id=${driveIdOf(src)}`;
