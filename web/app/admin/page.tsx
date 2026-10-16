"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useState } from "react";

type Video = { title: string; client: string; category: string; src: string; hls?: string; poster?: string; aspect?: string };
type Clip = { title: string; style: string; src: string; duration?: string };
type Contact = { email: string; booking: string; socials: { label: string; href: string }[] };
type Tab = "videos" | "voice" | "contact";

const SHAPES = [
  { label: "Vertical (Reels, TikTok)", value: "9 / 16", r: 9 / 16 },
  { label: "Portrait 4:5", value: "4 / 5", r: 4 / 5 },
  { label: "Square", value: "1 / 1", r: 1 },
  { label: "Wide (YouTube)", value: "16 / 9", r: 16 / 9 },
];

const field = "w-full border border-hair bg-wall px-3 py-2.5 text-ink outline-none focus:border-gilt-line";
const btn = "border border-hair px-4 py-2 text-sm text-ink-2 transition-colors hover:border-gilt-line hover:text-ink disabled:opacity-40";
const gold = "bg-gold px-5 py-2.5 text-sm font-medium text-wall transition-opacity hover:opacity-90 disabled:opacity-40";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, { ...init, headers: { "Content-Type": "application/json" } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ?? `Request failed (${r.status})`);
  return j as T;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

function readMedia(file: File, kind: "video" | "audio"): Promise<{ w: number; h: number; d: number }> {
  return new Promise((res) => {
    const el = document.createElement(kind);
    el.preload = "metadata";
    el.onloadedmetadata = () => {
      const v = el as HTMLVideoElement;
      res({ w: v.videoWidth ?? 0, h: v.videoHeight ?? 0, d: el.duration });
      URL.revokeObjectURL(el.src);
    };
    el.onerror = () => res({ w: 0, h: 0, d: 0 });
    el.src = URL.createObjectURL(file);
  });
}

function Uploader({ label, accept, value, onDone, onFile }: {
  label: string;
  accept: string;
  value?: string;
  onDone: (url: string) => void;
  onFile?: (f: File) => void;
}) {
  const [pct, setPct] = useState<number | null>(null);
  const [err, setErr] = useState("");
  return (
    <div>
      <span className="mb-1.5 block text-sm text-ink-2">{label}</span>
      <label className={`${btn} inline-block cursor-pointer`}>
        {pct !== null ? `Uploading ${pct}%` : value ? "Replace file" : "Choose file"}
        <input
          type="file"
          accept={accept}
          className="sr-only"
          disabled={pct !== null}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setErr("");
            onFile?.(f);
            setPct(0);
            try {
              const b = await upload(f.name.replace(/[^\w.-]+/g, "-"), f, {
                access: "public",
                handleUploadUrl: "/api/upload",
                multipart: f.size > 20 * 1024 * 1024,
                onUploadProgress: (p) => setPct(Math.round(p.percentage)),
              });
              onDone(b.url);
            } catch (x) {
              setErr((x as Error).message);
            } finally {
              setPct(null);
              e.target.value = "";
            }
          }}
        />
      </label>
      {value && pct === null && <span className="ml-3 text-xs text-gilt">✓ uploaded</span>}
      {err && <p className="mt-1 text-sm text-red-400">{err}</p>}
    </div>
  );
}

function Input({ label, value, onChange, list, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  list?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink-2">{label}</span>
      <input className={field} value={value} list={list} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Row({ title, sub, thumb, onUp, onDown, onEdit, onDelete }: {
  title: string;
  sub: string;
  thumb?: React.ReactNode;
  onUp?: () => void;
  onDown?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-hair py-4">
      {thumb}
      <div className="min-w-0 flex-1">
        <p className="truncate">{title}</p>
        <p className="truncate text-sm text-ink-2">{sub}</p>
      </div>
      <div className="flex w-full shrink-0 justify-end gap-1.5 sm:w-auto">
        <button className={btn} onClick={onUp} disabled={!onUp} aria-label="Move up">↑</button>
        <button className={btn} onClick={onDown} disabled={!onDown} aria-label="Move down">↓</button>
        <button className={btn} onClick={onEdit}>Edit</button>
        <button className={btn} onClick={() => confirm(`Delete "${title}"?`) && onDelete()}>Delete</button>
      </div>
    </li>
  );
}

function move<T>(list: T[], i: number, d: number) {
  const n = [...list];
  [n[i], n[i + d]] = [n[i + d], n[i]];
  return n;
}

function VideoForm({ init, cats, onSave, onCancel }: { init: Video; cats: string[]; onSave: (v: Video) => void; onCancel: () => void }) {
  const [v, setV] = useState(init);
  const set = (p: Partial<Video>) => setV((o) => ({ ...o, ...p }));
  const ok = v.title && v.client && v.category && v.src;
  return (
    <div className="space-y-5 border border-gilt-line bg-wall-2 p-5">
      <Input label="Title" value={v.title} onChange={(title) => set({ title })} placeholder="e.g. Zendago, radio commercial" />
      <Input label="Client or brand" value={v.client} onChange={(client) => set({ client })} />
      <div>
        <Input label="Category (becomes a tab on the site)" value={v.category} onChange={(category) => set({ category })} list="cats" placeholder="e.g. UGC" />
        <datalist id="cats">{cats.map((c) => <option key={c} value={c} />)}</datalist>
      </div>
      <Uploader
        label="Video file (MP4 or MOV)"
        accept="video/*"
        value={v.src}
        onFile={async (f) => {
          const { w, h } = await readMedia(f, "video");
          if (w && h) set({ aspect: SHAPES.reduce((a, s) => (Math.abs(s.r - w / h) < Math.abs(a.r - w / h) ? s : a)).value });
        }}
        onDone={(src) => set({ src, hls: undefined })}
      />
      <label className="block">
        <span className="mb-1.5 block text-sm text-ink-2">Shape (set automatically from the video)</span>
        <select className={field} value={v.aspect ?? "9 / 16"} onChange={(e) => set({ aspect: e.target.value })}>
          {SHAPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </label>
      <Uploader label="Cover image (optional, otherwise the first frame is used)" accept="image/*" value={v.poster} onDone={(poster) => set({ poster })} />
      <div className="flex gap-3">
        <button className={gold} disabled={!ok} onClick={() => onSave(v)}>Done</button>
        <button className={btn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function ClipForm({ init, styles, onSave, onCancel }: { init: Clip; styles: string[]; onSave: (c: Clip) => void; onCancel: () => void }) {
  const [c, setC] = useState(init);
  const set = (p: Partial<Clip>) => setC((o) => ({ ...o, ...p }));
  return (
    <div className="space-y-5 border border-gilt-line bg-wall-2 p-5">
      <Input label="Title" value={c.title} onChange={(title) => set({ title })} />
      <div>
        <Input label="Style (becomes a tab)" value={c.style} onChange={(style) => set({ style })} list="styles" placeholder="e.g. Commercial" />
        <datalist id="styles">{styles.map((s) => <option key={s} value={s} />)}</datalist>
      </div>
      <Uploader
        label="Audio file (MP3 preferred)"
        accept="audio/*"
        value={c.src}
        onFile={async (f) => {
          const { d } = await readMedia(f, "audio");
          if (d) set({ duration: fmt(d) });
        }}
        onDone={(src) => set({ src })}
      />
      <div className="flex gap-3">
        <button className={gold} disabled={!(c.title && c.style && c.src)} onClick={() => onSave(c)}>Done</button>
        <button className={btn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function useFile<T>(file: Tab, on: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [sha, setSha] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    setMsg("");
    try {
      const r = await api<{ data: T; sha: string }>(`/api/content?file=${file}`);
      setData(r.data);
      setSha(r.sha);
      setDirty(false);
    } catch (e) {
      setMsg((e as Error).message);
    }
  }, [file]);

  // Load once, the first time the tab opens, so switching tabs keeps unpublished edits.
  useEffect(() => {
    if (on && !loaded) {
      setLoaded(true);
      load();
    }
  }, [on, loaded, load]);

  const change = (d: T) => {
    setData(d);
    setDirty(true);
    setMsg("");
  };

  const publish = async () => {
    setBusy(true);
    try {
      await api("/api/content", { method: "PUT", body: JSON.stringify({ file, data, sha }) });
      await load();
      setMsg("Published. The site updates in about 2 minutes.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return { data, change, dirty, busy, msg, publish };
}

function PublishBar({ dirty, busy, msg, publish }: { dirty: boolean; busy: boolean; msg: string; publish: () => void }) {
  return (
    <div className="sticky bottom-0 -mx-5 mt-10 flex flex-wrap items-center gap-4 border-t border-hair bg-wall/95 px-5 py-4 backdrop-blur">
      <button className={gold} disabled={!dirty || busy} onClick={publish}>{busy ? "Publishing…" : "Publish changes"}</button>
      <span className={`text-sm ${msg ? "text-gilt" : "text-ink-2"}`}>{msg || (dirty ? "You have unpublished changes." : "Everything is live.")}</span>
    </div>
  );
}

function Videos({ on }: { on: boolean }) {
  const f = useFile<{ items: Video[] }>("videos", on);
  const [edit, setEdit] = useState<number | "new" | null>(null);
  if (!f.data) return <p className="text-ink-2">{f.msg || "Loading…"}</p>;
  const items = f.data.items;
  const cats = [...new Set(items.map((v) => v.category))];
  const save = (v: Video, i: number | "new") => {
    f.change({ items: i === "new" ? [v, ...items] : items.map((o, j) => (j === i ? v : o)) });
    setEdit(null);
  };
  return (
    <>
      {edit === null ? (
        <button className={gold} onClick={() => setEdit("new")}>+ Add video</button>
      ) : (
        edit === "new" && <VideoForm init={{ title: "", client: "", category: "", src: "", aspect: "9 / 16" }} cats={cats} onSave={(v) => save(v, "new")} onCancel={() => setEdit(null)} />
      )}
      <ul className="mt-6">
        {items.map((v, i) =>
          edit === i ? (
            <li key={v.src} className="py-4"><VideoForm init={v} cats={cats} onSave={(n) => save(n, i)} onCancel={() => setEdit(null)} /></li>
          ) : (
            <Row
              key={v.src}
              title={v.title}
              sub={`${v.category} · ${v.client}`}
              thumb={
                v.poster ? (
                  <img src={v.poster} alt="" className="h-14 w-14 shrink-0 object-cover" />
                ) : (
                  <video src={`${v.src}#t=0.5`} preload="metadata" muted className="h-14 w-14 shrink-0 object-cover" />
                )
              }
              onUp={i > 0 ? () => f.change({ items: move(items, i, -1) }) : undefined}
              onDown={i < items.length - 1 ? () => f.change({ items: move(items, i, 1) }) : undefined}
              onEdit={() => setEdit(i)}
              onDelete={() => f.change({ items: items.filter((_, j) => j !== i) })}
            />
          ),
        )}
      </ul>
      <PublishBar {...f} />
    </>
  );
}

function Voice({ on }: { on: boolean }) {
  const f = useFile<{ items: Clip[] }>("voice", on);
  const [edit, setEdit] = useState<number | "new" | null>(null);
  if (!f.data) return <p className="text-ink-2">{f.msg || "Loading…"}</p>;
  const items = f.data.items;
  const styles = [...new Set(items.map((c) => c.style))];
  const save = (c: Clip, i: number | "new") => {
    f.change({ items: i === "new" ? [c, ...items] : items.map((o, j) => (j === i ? c : o)) });
    setEdit(null);
  };
  return (
    <>
      {edit === null ? (
        <button className={gold} onClick={() => setEdit("new")}>+ Add voice clip</button>
      ) : (
        edit === "new" && <ClipForm init={{ title: "", style: "", src: "" }} styles={styles} onSave={(c) => save(c, "new")} onCancel={() => setEdit(null)} />
      )}
      <ul className="mt-6">
        {items.map((c, i) =>
          edit === i ? (
            <li key={c.src} className="py-4"><ClipForm init={c} styles={styles} onSave={(n) => save(n, i)} onCancel={() => setEdit(null)} /></li>
          ) : (
            <Row
              key={c.src}
              title={c.title}
              sub={`${c.style}${c.duration ? ` · ${c.duration}` : ""}`}
              onUp={i > 0 ? () => f.change({ items: move(items, i, -1) }) : undefined}
              onDown={i < items.length - 1 ? () => f.change({ items: move(items, i, 1) }) : undefined}
              onEdit={() => setEdit(i)}
              onDelete={() => f.change({ items: items.filter((_, j) => j !== i) })}
            />
          ),
        )}
      </ul>
      <PublishBar {...f} />
    </>
  );
}

function ContactTab({ on }: { on: boolean }) {
  const f = useFile<Contact>("contact", on);
  if (!f.data) return <p className="text-ink-2">{f.msg || "Loading…"}</p>;
  const c = f.data;
  const set = (p: Partial<Contact>) => f.change({ ...c, ...p });
  return (
    <div className="max-w-xl space-y-5">
      <Input label="Public email" value={c.email} onChange={(email) => set({ email })} placeholder="hello@…" />
      <Input label="Booking link (Calendly etc.)" value={c.booking} onChange={(booking) => set({ booking })} placeholder="https://calendly.com/…" />
      <div>
        <span className="mb-1.5 block text-sm text-ink-2">Social links</span>
        <div className="space-y-2">
          {c.socials.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${field} w-36`} value={s.label} placeholder="Instagram" onChange={(e) => set({ socials: c.socials.map((o, j) => (j === i ? { ...o, label: e.target.value } : o)) })} />
              <input className={field} value={s.href} placeholder="https://…" onChange={(e) => set({ socials: c.socials.map((o, j) => (j === i ? { ...o, href: e.target.value } : o)) })} />
              <button className={btn} onClick={() => set({ socials: c.socials.filter((_, j) => j !== i) })} aria-label="Remove">✕</button>
            </div>
          ))}
        </div>
        <button className={`${btn} mt-3`} onClick={() => set({ socials: [...c.socials, { label: "", href: "" }] })}>+ Add link</button>
      </div>
      <PublishBar {...f} />
    </div>
  );
}

export default function Admin() {
  const [state, setState] = useState<"loading" | "out" | "in" | "unset">("loading");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("videos");

  useEffect(() => {
    api<{ loggedIn: boolean; configured: boolean }>("/api/login")
      .then((r) => setState(!r.configured ? "unset" : r.loggedIn ? "in" : "out"))
      .catch(() => setState("out"));
  }, []);

  if (state === "loading") return <main className="min-h-dvh bg-wall" />;

  if (state !== "in")
    return (
      <main className="flex min-h-dvh items-center justify-center bg-wall px-5 text-ink">
        <form
          className="w-full max-w-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr("");
            try {
              await api("/api/login", { method: "POST", body: JSON.stringify({ password: pw }) });
              setState("in");
            } catch (x) {
              setErr((x as Error).message);
            }
          }}
        >
          <h1 className="display text-5xl">
            Your <span className="italic text-gold">studio</span>.
          </h1>
          {state === "unset" ? (
            <p className="mt-6 text-ink-2">The admin isn&apos;t set up yet. Ask your developer to add the password in Vercel.</p>
          ) : (
            <>
              <input type="password" autoFocus className={`${field} mt-8`} placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
              {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
              <button className={`${gold} mt-4 w-full`} disabled={!pw}>Log in</button>
            </>
          )}
        </form>
      </main>
    );

  const tabs: [Tab, string][] = [["videos", "Videos"], ["voice", "Voice clips"], ["contact", "Contact details"]];
  return (
    <main className="min-h-dvh bg-wall text-ink">
      <header className="flex items-center justify-between border-b border-hair px-5 py-4 md:px-10">
        <p className="font-serif text-xl">Your studio</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" target="_blank" className="text-ink-2 hover:text-ink">View site ↗</a>
          <button
            className="text-ink-2 hover:text-ink"
            onClick={async () => {
              await api("/api/login", { method: "DELETE" });
              setState("out");
            }}
          >
            Log out
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-10">
        <nav className="mb-10 flex gap-6 overflow-x-auto text-sm" role="tablist">
          {tabs.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`shrink-0 border-b pb-2 ${tab === k ? "border-gilt-line text-ink" : "border-transparent text-ink-2 hover:text-ink"}`}>
              {l}
            </button>
          ))}
        </nav>
        <div hidden={tab !== "videos"}><Videos on={tab === "videos"} /></div>
        <div hidden={tab !== "voice"}><Voice on={tab === "voice"} /></div>
        <div hidden={tab !== "contact"}><ContactTab on={tab === "contact"} /></div>
      </div>
    </main>
  );
}
