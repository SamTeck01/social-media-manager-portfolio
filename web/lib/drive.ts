// Server-only. Reads her shared Google Drive folder with a Google API key.
//   GOOGLE_API_KEY   Google Cloud API key with the Drive API enabled
//   DRIVE_FOLDER_ID  optional; defaults to the folder she shared
// The folder must stay shared as "Anyone with the link can view".
export const DRIVE_FOLDER = process.env.DRIVE_FOLDER_ID || "1Y3nXCbL5Ay4IqqxzuLualofPN5CspMgi";
const API = "https://www.googleapis.com/drive/v3/files";
const FOLDER_MIME = "application/vnd.google-apps.folder";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  videoMediaMetadata?: { width?: number; height?: number; durationMillis?: string };
  folder?: string;
};

export const driveConfigured = () => Boolean(process.env.GOOGLE_API_KEY);

async function call(params: Record<string, string>, path = "") {
  const q = new URLSearchParams({ ...params, key: process.env.GOOGLE_API_KEY ?? "", supportsAllDrives: "true" });
  const r = await fetch(`${API}${path}?${q}`, { cache: "no-store" });
  if (!r.ok) throw new Error(`Google Drive error (${r.status}). Check the API key and that the folder is shared by link.`);
  return r;
}

// Every video and audio file in the folder and its subfolders (3 levels deep), newest first.
export async function listMedia(): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let level: { id: string; name: string }[] = [{ id: DRIVE_FOLDER, name: "" }];
  for (let depth = 0; depth < 3 && level.length; depth++) {
    const next: { id: string; name: string }[] = [];
    for (const folder of level) {
      let pageToken = "";
      do {
        const r = await call({
          q: `'${folder.id}' in parents and trashed = false`,
          fields: "nextPageToken, files(id,name,mimeType,size,modifiedTime,thumbnailLink,videoMediaMetadata(width,height,durationMillis))",
          pageSize: "1000",
          includeItemsFromAllDrives: "true",
          ...(pageToken ? { pageToken } : {}),
        });
        const j = (await r.json()) as { files: DriveFile[]; nextPageToken?: string };
        for (const f of j.files) {
          if (f.mimeType === FOLDER_MIME) next.push({ id: f.id, name: f.name });
          else if (/^(video|audio)\//.test(f.mimeType)) files.push({ ...f, folder: folder.name });
        }
        pageToken = j.nextPageToken ?? "";
      } while (pageToken);
    }
    level = next;
  }
  return files.sort((a, b) => (b.modifiedTime ?? "").localeCompare(a.modifiedTime ?? ""));
}
