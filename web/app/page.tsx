import Nav from "@/components/Nav";
import Reels from "@/components/Reels";
import VoicePlayer from "@/components/VoicePlayer";
import ContactForm from "@/components/ContactForm";
import RevealObserver from "@/components/RevealObserver";
import {
  about,
  capabilities,
  caseStudies,
  clients,
  process,
  proof,
  site,
  videos,
  voice,
  type CaseStudy,
} from "@/content/site";

function SectionHead({ label, title, id }: { label: string; title: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="reveal mb-12 scroll-mt-24 md:mb-16">
      <p className="label">{label}</p>
      <span className="rule mt-4" />
      <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] md:text-6xl">{title}</h2>
    </div>
  );
}

function Case({ c, i }: { c: CaseStudy; i: number }) {
  const lead = i === 0;
  return (
    <article className="reveal border-t border-line py-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className={lead ? "md:col-span-7" : "md:col-span-6"}>
          <p className="label">
            {String(i + 1).padStart(2, "0")} · {c.industry}
          </p>
          <h3 className="mt-5 font-serif text-5xl leading-none md:text-7xl">{c.client}</h3>
          <p className="mt-3 text-sm text-gold">{c.location}</p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85">{c.summary}</p>
        </div>
        <dl className={`grid grid-cols-2 gap-x-6 gap-y-8 text-sm ${lead ? "md:col-span-5" : "md:col-span-5 md:col-start-8"}`}>
          <div>
            <dt className="label">Role</dt>
            <dd className="mt-2">{c.role}</dd>
          </div>
          <div>
            <dt className="label">Work</dt>
            <dd className="mt-2 leading-relaxed">{c.work.join(", ")}</dd>
          </div>
          {c.metrics.map((m) => (
            <div key={m.label} className="col-span-2 border-t border-line pt-6 sm:col-span-1">
              <dt className="sr-only">Result</dt>
              <dd className="font-serif text-4xl md:text-5xl">{m.value}</dd>
              <dd className="mt-2 text-muted">{m.label}</dd>
            </div>
          ))}
          <div className="col-span-2 flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {c.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </dl>
      </div>
      {c.quote && (
        <blockquote className="mt-14 border-l border-gold pl-6 md:ml-[calc(100%/12)] md:mt-20 md:max-w-3xl md:pl-10">
          <p className="font-serif text-2xl leading-snug md:text-4xl">“{c.quote.text}”</p>
          <footer className="mt-6 text-sm text-muted">{c.quote.author}</footer>
        </blockquote>
      )}
    </article>
  );
}

export default function Home() {
  const links = [
    { href: "#work", label: "Work" },
    ...(voice.length ? [{ href: "#voice", label: "Voice" }] : []),
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <Nav name={site.name} links={links} />
      <RevealObserver />
      <main id="top" className="overflow-x-clip">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-28 md:grid-cols-12 md:gap-10 md:px-10 md:pb-24 md:pt-40">
          <div className="flex flex-col justify-center md:col-span-7">
            <p className="label">{site.role}</p>
            <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.02] sm:text-6xl md:text-[5.6rem]">
              Strategy, story and <em className="text-gold">voice</em> for brands that want to be remembered.
            </h1>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#contact"
                className="bg-gold px-8 py-4 text-center text-sm font-medium tracking-wide text-bg transition-opacity hover:opacity-90"
              >
                Work with me
              </a>
              <a href="#work" className="text-center text-sm text-muted transition-colors hover:text-ink">
                See the results ↓
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="absolute -inset-3 border border-gold/40 md:-inset-4" aria-hidden />
              <img
                src="/media/portrait-1024.webp"
                srcSet="/media/portrait-640.webp 640w, /media/portrait-1024.webp 1024w"
                sizes="(min-width: 768px) 40vw, 90vw"
                width={1024}
                height={1536}
                alt={`Portrait of ${site.fullName}`}
                fetchPriority="high"
                className="relative aspect-[4/5] w-full object-cover object-[50%_12%]"
              />
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <section className="border-y border-line">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
            {proof.map((p) => (
              <div key={p.label} className="flex flex-col-reverse justify-end bg-bg px-5 py-8 md:px-8 md:py-10">
                <dt className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{p.label}</dt>
                <dd className="font-serif text-3xl md:text-5xl">{p.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Clients */}
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
          <p className="label">Selected clients</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-serif text-2xl text-ink/80 md:gap-x-12 md:text-3xl">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <SectionHead
            id="work"
            label="Selected work"
            title={
              <>
                Results, not just <em className="text-gold">posts</em>.
              </>
            }
          />
          {caseStudies.map((c, i) => (
            <Case key={c.id} c={c} i={i} />
          ))}
        </section>

        {videos.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
            <SectionHead label="Content" title="Made to be watched." />
            <div className="reveal">
              <Reels videos={videos} />
            </div>
          </section>
        )}

        {voice.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
            <SectionHead
              id="voice"
              label="Voice-over"
              title={
                <>
                  Hear <em className="text-gold">her</em>.
                </>
              }
            />
            <div className="reveal max-w-3xl">
              <VoicePlayer clips={voice} />
            </div>
          </section>
        )}

        {/* Capabilities */}
        <section className="bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
            <SectionHead label="What I do" title="Three skills, one point of contact." />
            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {capabilities.map((c) => (
                <div key={c.title} className="reveal border-t border-line pt-6">
                  <h3 className="font-serif text-4xl">{c.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="label mt-20">How we work</p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {process.map((p, i) => (
                <li key={p.title} className="reveal grid grid-cols-[3rem_1fr] gap-4 py-6 md:grid-cols-[6rem_14rem_1fr]">
                  <span className="text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl">{p.title}</span>
                  <span className="col-start-2 text-muted md:col-start-3">{p.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="reveal md:col-span-5">
            <img
              src="/media/portrait-640.webp"
              width={640}
              height={960}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </div>
          <div id="about" className="reveal scroll-mt-24 md:col-span-6 md:col-start-7 md:self-center">
            <p className="label">About</p>
            <span className="rule mt-4" />
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">{about.heading}</h2>
            {about.body.map((p) => (
              <p key={p} className="mt-6 text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            <p className="mt-8 font-serif text-2xl italic text-gold">{site.fullName}</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 border-t border-line">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
            <div className="reveal md:col-span-5">
              <p className="label">Contact</p>
              <span className="rule mt-4" />
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] md:text-7xl">
                Have something in <em className="text-gold">mind</em>?
              </h2>
              <p className="mt-6 max-w-sm text-muted">
                Tell me about your brand and what you want to achieve. I reply within two working days.
              </p>
              {site.email && (
                <a href={`mailto:${site.email}`} className="mt-8 block text-lg underline decoration-gold underline-offset-4">
                  {site.email}
                </a>
              )}
              {site.booking && (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="mt-3 block text-muted hover:text-ink">
                  Book a call ↗
                </a>
              )}
            </div>
            <div className="reveal md:col-span-6 md:col-start-7">
              {site.email ? (
                <ContactForm email={site.email} />
              ) : (
                <p className="border border-dashed border-line p-6 text-sm text-muted">
                  Inquiry form appears once the contact email is set in content/site.ts.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
