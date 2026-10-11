import Lights from "@/components/Lights";
import Labels from "@/components/Labels";
import Icon from "@/components/Icon";
import Reels from "@/components/Reels";
import VoicePlayer from "@/components/VoicePlayer";
import ContactForm from "@/components/ContactForm";
import { clients, commission, note, rooms, site, testimony, videos, voice, works, type Work } from "@/content/site";

const numerals = ["I", "II", "III", "IV", "V"];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-ink-2 underline decoration-hair transition-colors hover:text-ink hover:decoration-gilt-line"
    >
      {children}
      <Icon name="arrowUpRight" className="h-3 w-3" />
    </a>
  );
}

/* A placard: the small text panel that hangs beside each work. */
function WallLabel({ w, n }: { w: Work; n: number }) {
  return (
    <div className="label-in max-w-sm text-[15px] leading-relaxed">
      <p className="text-[13px] text-gilt">No. {n}</p>
      <h3 className="display mt-2 text-3xl leading-tight md:text-[2.5rem]">{w.client}</h3>
      <p className="text-ink-2">{w.location}</p>
      <p className="mt-4 italic text-ink-2">{w.medium}</p>
      <p className="mt-4">{w.summary}</p>
      <ul className="mt-5 space-y-1.5 border-t border-hair pt-4">
        {w.result.map((r) => (
          <li key={r} className="flex gap-3">
            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gilt-line" aria-hidden />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
        {w.links.map((l) => (
          <ExtLink key={l.href} href={l.href}>
            {l.label}
          </ExtLink>
        ))}
      </p>
    </div>
  );
}

/* The hung piece. Real media when supplied, otherwise a title card in a gilt mat. */
function Piece({ w, ratio }: { w: Work; ratio: string }) {
  if (w.video)
    return (
      <video
        src={w.video.src}
        poster={w.video.poster}
        controls
        playsInline
        preload="none"
        className={`${ratio} w-full bg-wall-2 object-cover`}
      />
    );
  if (w.image)
    return (
      <img
        src={w.image.src}
        alt={w.image.alt}
        width={w.image.width}
        height={w.image.height}
        loading="lazy"
        decoding="async"
        className={`${ratio} w-full object-cover`}
      />
    );
  return (
    <div className={`${ratio} relative w-full bg-wall-2`}>
      <div className="absolute inset-4 border border-gilt-line/50 md:inset-6" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
        <p className="display text-4xl leading-none md:text-6xl">{w.client}</p>
        <p className="mt-4 text-[13px] text-ink-2">{w.location}</p>
      </div>
    </div>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[88rem]">
        <h2 className="display max-w-3xl text-[2.6rem] leading-[1.04] md:text-7xl">{title}</h2>
        {intro && <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{intro}</p>}
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Labels />
      <header className="sticky top-0 z-40 border-b border-hair bg-wall/90 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-[88rem] items-center justify-between gap-4 px-5 md:h-16 md:px-10">
          <a href="#top" className="display text-lg md:text-xl">
            {site.name}
          </a>
          <div className="flex items-center gap-5 text-[13px] md:gap-8">
            <a href="#works" className="text-ink-2 transition-colors hover:text-ink">
              Works
            </a>
            <a href="#note" className="hidden text-ink-2 transition-colors hover:text-ink sm:inline">
              About
            </a>
            <a href="#inquire" className="text-ink-2 transition-colors hover:text-ink">
              Inquire
            </a>
            <Lights />
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Title wall */}
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-20">
          <div className="mx-auto grid max-w-[88rem] gap-14 md:grid-cols-12 md:gap-10">
            <div className="flex flex-col md:col-span-7 md:pt-6">
              <h1 className="display text-[3.1rem] leading-[0.98] sm:text-7xl md:text-[5.75rem]">
                Strategy, Story <span className="italic text-gilt">&amp;</span> Voice
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed md:text-xl">
                Works by {site.fullName}, for brands in Nigeria and the United States. Social media, content and
                voice-over, from one person.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#inquire"
                  className="bg-ink px-7 py-4 text-sm font-medium tracking-wide text-wall transition-opacity hover:opacity-85"
                >
                  Commission work
                </a>
                <a href="#works" className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
                  Walk through the works <Icon name="arrowDown" />
                </a>
              </div>
              <div className="mt-auto hidden pt-16 md:block text-[13px] leading-relaxed text-ink-2 md:pt-24">
                <p className="text-ink">Works on view for</p>
                <p className="mt-1 max-w-xl">
                  {clients.map((c, i) => (
                    <span key={c.name}>
                      {c.name} <span className="text-ink-2/70">({c.place})</span>
                      {i < clients.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <figure className="md:col-span-5">
              <div className="relative border border-hair p-3 md:p-5">
                <img
                  src="/media/portrait-1024.webp"
                  srcSet="/media/portrait-640.webp 640w, /media/portrait-1024.webp 1024w"
                  sizes="(min-width: 768px) 38vw, 92vw"
                  width={1024}
                  height={1536}
                  alt={`Portrait of ${site.fullName}`}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-[50%_10%]"
                />
              </div>
              <figcaption className="mt-5 text-[13px] leading-relaxed">
                <span className="block text-ink">{site.fullName}</span>
                <span className="block text-ink-2">{site.disciplines}</span>
                <span className="block italic text-ink-2">Portrait, photograph</span>
              </figcaption>
            </figure>
              <div className="text-[13px] leading-relaxed text-ink-2 md:hidden">
              <p className="text-ink">Works on view for</p>
              <p className="mt-1 max-w-xl">
                {clients.map((c, i) => (
                  <span key={c.name}>
                    {c.name} <span className="text-ink-2/70">({c.place})</span>
                    {i < clients.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* The works */}
        <section id="works" className="scroll-mt-14 border-t border-hair px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto max-w-[88rem]">
            <h2 className="display text-[2.6rem] leading-[1.04] md:text-7xl">On view</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Three works, each hung with its result. Every number here comes from the brand itself.
            </p>

            <div className="mt-16 space-y-24 md:mt-24 md:space-y-40">
              {/* No. 1: the largest wall */}
              <article className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
                <div className="md:col-span-7">
                  <Piece w={works[0]} ratio="aspect-[4/5] md:aspect-[5/4]" />
                </div>
                <div className="md:col-span-4 md:col-start-9">
                  <WallLabel w={works[0]} n={1} />
                </div>
              </article>

              {/* No. 2: hung right, label on the left */}
              <article className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
                <div className="md:order-2 md:col-span-5 md:col-start-7">
                  <Piece w={works[1]} ratio="aspect-[4/5]" />
                </div>
                <div className="md:order-1 md:col-span-4 md:col-start-2">
                  <WallLabel w={works[1]} n={2} />
                </div>
              </article>

              {/* No. 3: a small piece, centred, label beneath */}
              <article className="mx-auto max-w-md">
                <Piece w={works[2]} ratio="aspect-square" />
                <div className="mt-8">
                  <WallLabel w={works[2]} n={3} />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Testimony */}
        <section className="bg-wall-2 px-5 py-20 md:px-10 md:py-32">
          <figure className="label-in mx-auto max-w-4xl">
            <blockquote className="display text-[1.9rem] leading-[1.18] md:text-5xl">
              <span className="text-gilt">“</span>
              {testimony.text}
              <span className="text-gilt">”</span>
            </blockquote>
            <figcaption className="mt-8 text-[15px]">
              {testimony.author}
              <span className="text-ink-2">, {testimony.org}</span>
            </figcaption>
          </figure>
        </section>

        {videos.length > 0 && (
          <Section id="reels" title="Made to be watched." intro="Short-form work from the collection.">
            <Reels videos={videos} />
          </Section>
        )}

        {voice.length > 0 && (
          <Section id="voice" title="Hear her." intro="Voice-over samples. Press play.">
            <div className="max-w-3xl">
              <VoicePlayer clips={voice} />
            </div>
          </Section>
        )}

        {/* Rooms */}
        <Section id="rooms" title="Three rooms, one artist." intro="What she brings to a brand, all from one point of contact.">
          <ul className="grid border-t border-hair md:grid-cols-3">
            {rooms.map((r, i) => (
              <li key={r.name} className="label-in border-b border-hair py-8 md:border-b-0 md:py-10 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10">
                <p className="text-[13px] text-gilt">Room {numerals[i]}</p>
                <h3 className="display mt-3 text-4xl md:text-5xl">{r.name}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-2">{r.body}</p>
              </li>
            ))}
          </ul>

          <h3 className="display mt-24 text-3xl md:mt-32 md:text-4xl">How a commission works</h3>
          <ol className="mt-8 border-t border-hair">
            {commission.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-b border-hair py-6 md:grid-cols-[5rem_14rem_1fr] md:items-baseline">
                <span className="text-[13px] text-gilt">{i + 1}</span>
                <span className="display text-2xl">{s.title}</span>
                <span className="col-start-2 leading-relaxed text-ink-2 md:col-start-3">{s.body}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Artist's note */}
        <section id="note" className="scroll-mt-14 border-t border-hair px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[88rem] gap-10 md:grid-cols-12">
            <h2 className="display text-[2.6rem] leading-[1.04] md:col-span-5 md:text-6xl">{note.heading}</h2>
            <div className="max-w-[62ch] text-lg leading-relaxed md:col-span-6 md:col-start-7">
              {note.body.map((p) => (
                <p key={p} className="mb-6">
                  {p}
                </p>
              ))}
              <p className="display text-2xl italic text-gilt">{site.fullName}</p>
            </div>
          </div>
        </section>

        {/* Inquire */}
        <section id="inquire" className="after-hours scroll-mt-14 border-t border-hair px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[88rem] gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display text-5xl leading-[1.02] md:text-7xl">
                Have something in <span className="italic text-gilt">mind</span>?
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-2">
                Tell her about your brand and what you want to achieve. Replies within two working days.
              </p>
              {site.email && (
                <a href={`mailto:${site.email}`} className="mt-8 block text-lg underline decoration-gilt-line">
                  {site.email}
                </a>
              )}
              {site.booking && (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-ink-2 hover:text-ink">
                  Book a call <Icon name="arrowUpRight" className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm email={site.email} />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 py-8 text-[13px] text-ink-2 md:px-10">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-3 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}
          </p>
          {site.socials.length > 0 && (
            <ul className="flex gap-6">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <ExtLink href={s.href}>{s.label}</ExtLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </>
  );
}
