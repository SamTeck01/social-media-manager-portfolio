import ThemeToggle from "@/components/ThemeToggle";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import Reels from "@/components/Reels";
import VoicePlayer from "@/components/VoicePlayer";
import ContactForm from "@/components/ContactForm";
import { clients, note, rooms, site, testimony, videos, voice, works, type Screen } from "@/content/site";

const [adose, ffd, taramoda] = works;

function Phone({ s, className = "", eager = false }: { s: Screen; className?: string; eager?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-[7px] border-wall-3 bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] md:rounded-[2.4rem] md:border-[9px] ${className}`}
    >
      <img
        src={s.src}
        alt={s.alt}
        width={591}
        height={1210}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[591/1210] w-full object-cover object-top"
      />
    </div>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-ink-2 underline decoration-hair transition-colors hover:text-gold hover:decoration-gold"
    >
      {children}
      <Icon name="arrowUpRight" className="h-3 w-3" />
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-hair px-3 py-1 text-xs text-ink-2">{children}</span>;
}

export default function Home() {
  const wall = [...adose.screens, ...ffd.screens];

  return (
    <>
      <Reveal />
      <div className="progress" aria-hidden />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-wall/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#top" className="display text-xl">
            {site.name}
          </a>
          <div className="flex items-center gap-2 text-sm md:gap-8">
            <a href="#work" className="sweep hidden text-ink-2 transition-colors hover:text-ink md:inline">
              Work
            </a>
            <a href="#services" className="sweep hidden text-ink-2 transition-colors hover:text-ink md:inline">
              Services
            </a>
            <a href="#about" className="sweep hidden text-ink-2 transition-colors hover:text-ink md:inline">
              About
            </a>
            <a
              href="#contact"
              className="mr-1 rounded-full bg-gold px-4 py-2.5 text-[13px] font-medium text-wall transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.97] md:mr-0 md:px-5"
            >
              Work with me
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero: her name set like a poster, Miracle standing in front of it */}
        <section className="relative isolate overflow-hidden md:h-[100svh] md:min-h-[640px]">
          <div
            className="absolute inset-0 -z-20 bg-[radial-gradient(60%_55%_at_50%_60%,var(--wall-3),transparent_70%)]"
            aria-hidden
          />
          <h1 className="par-name relative -z-10 pt-24 text-center md:absolute md:inset-x-0 md:top-[calc(5rem+4svh)] md:pt-0">
            <span className="sr-only">
              {site.fullName}, {site.disciplines}
            </span>
            <span aria-hidden className="display enter-rise block text-[19vw] leading-[0.82] md:text-[min(16vw,21svh)]">
              Miracle
            </span>
            <span
              aria-hidden
              className="display enter-rise block text-[19vw] italic leading-[0.82] text-gold md:text-[min(16vw,21svh)]"
              style={{ animationDelay: "120ms" }}
            >
              Akhimien
            </span>
          </h1>
          <img
            src="/media/hero-portrait-1000.webp"
            srcSet="/media/hero-portrait-600.webp 600w, /media/hero-portrait-1000.webp 1000w"
            sizes="(min-width: 768px) 40vw, 96vw"
            width={1000}
            height={1301}
            alt=""
            fetchPriority="high"
            className="enter-lift par-figure relative mx-auto -mt-[16vw] block h-auto w-[92vw] max-w-none md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:h-[76svh] md:w-auto md:-translate-x-1/2"
            style={{ animationDelay: "250ms" }}
          />
          <div className="absolute inset-x-0 bottom-0 hidden h-[24svh] bg-gradient-to-t from-wall via-wall/70 to-transparent md:block" aria-hidden />
          <div className="par-copy relative -mt-32 mx-auto flex max-w-[92rem] flex-col gap-6 bg-gradient-to-t from-wall from-60% to-transparent px-5 pb-12 pt-28 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:bg-none md:pt-0 md:pb-12 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12">
            <div className="enter-rise max-w-[27rem] lg:max-w-[30rem]" style={{ animationDelay: "500ms" }}>
              <p className="max-w-[23rem] text-[13px] font-medium uppercase leading-relaxed tracking-[0.14em] text-gold">{site.disciplines}</p>
              <p className="mt-3 max-w-md text-[17px] leading-relaxed md:text-lg">{site.pitch}</p>
              <p className="mt-2 text-sm text-ink-2">{site.reach}</p>
              <div className="mt-6 flex items-center gap-6">
                <a
                  href="#contact"
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-wall transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.97]"
                >
                  Start a project
                </a>
                <a href="#work" className="nudge inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
                  See the results <Icon name="arrowDown" />
                </a>
              </div>
            </div>
            <ul
              className="enter-rise hidden gap-8 text-sm text-ink-2 md:flex"
              style={{ animationDelay: "650ms" }}
              aria-label="Disciplines"
            >
              {rooms.map((r) => (
                <li key={r.name} className="display text-2xl text-ink">
                  {r.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Clients */}
        <section className="drift-wrap overflow-hidden border-y border-hair py-7" aria-label="Clients">
          <ul className="drift-fast flex w-max items-center">
            {[...clients, ...clients, ...clients, ...clients].map((c, i) => (
              <li key={i} aria-hidden={i >= clients.length} className="display flex items-center whitespace-nowrap text-2xl text-ink-2 md:text-3xl">
                <span className="px-8 md:px-12">{c.name}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section id="work" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[92rem]">
            <h2 className="display split max-w-4xl text-5xl leading-[0.98] md:text-8xl">
              Results you can <span className="italic text-gold">check</span>.
            </h2>
            <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-ink-2" style={{ ["--d" as string]: "80ms" }}>
              Real brands, real channels, and numbers that come from the brands themselves.
            </p>

            {/* ADOSE */}
            <article className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
              <div className="reveal float mx-auto w-[64%] max-w-[300px] md:col-span-4 md:col-start-2 md:w-full">
                <a href={adose.screens[0].href} target="_blank" rel="noopener noreferrer" aria-label="Open ADOSE Fashion on Instagram">
                  <Phone s={adose.screens[0]} className="rotate-[-3deg] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:rotate-0" />
                </a>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <div className="reveal flex flex-wrap gap-2">
                  <Tag>Fashion &amp; retail</Tag>
                  <Tag>{adose.location}</Tag>
                </div>
                <h3 className="display reveal mt-5 text-4xl md:text-6xl">{adose.client}</h3>
                <p className="reveal mt-2 text-ink-2">{adose.medium}</p>
                <dl className="reveal mt-10 grid grid-cols-2 gap-6 border-t border-hair pt-8">
                  <div>
                    <dd className="display text-5xl text-gold md:text-7xl">
                      <CountUp to={9837} />
                    </dd>
                    <dt className="mt-2 text-sm text-ink-2">Instagram followers, grown organically from zero</dt>
                  </div>
                  <div>
                    <dd className="display text-5xl text-gold md:text-7xl">
                      <CountUp to={1000} suffix="+" />
                    </dd>
                    <dt className="mt-2 text-sm text-ink-2">Pairs sold out in the Summer Shoes campaign</dt>
                  </div>
                </dl>
                <p className="reveal mt-8 max-w-lg leading-relaxed">{adose.summary}</p>
                <p className="reveal mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {adose.links.map((l) => (
                    <ExtLink key={l.href} href={l.href}>
                      {l.label}
                    </ExtLink>
                  ))}
                </p>
              </div>
            </article>

            {/* The Fly Foot Doctor */}
            <article className="mt-32 grid items-center gap-12 md:mt-44 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5 md:col-start-2">
                <div className="reveal flex flex-wrap gap-2">
                  <Tag>Health &amp; education</Tag>
                  <Tag>{ffd.location}</Tag>
                </div>
                <h3 className="display reveal mt-5 text-4xl md:text-6xl">{ffd.client}</h3>
                <p className="reveal mt-2 text-ink-2">{ffd.medium}</p>
                <div className="reveal mt-10 border-t border-hair pt-8">
                  <p className="display text-5xl text-gold md:text-7xl">
                    <CountUp to={800} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-ink-2">Purchases of her recorded heel-care course</p>
                </div>
                <p className="reveal mt-8 max-w-lg leading-relaxed">{ffd.summary}</p>
                <p className="reveal mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {ffd.links.map((l) => (
                    <ExtLink key={l.href} href={l.href}>
                      {l.label}
                    </ExtLink>
                  ))}
                </p>
              </div>
              <div className="relative mx-auto h-[440px] w-full max-w-[420px] md:order-first md:col-span-5 md:col-start-7 md:row-start-1 md:h-[560px] md:max-w-none">
                {ffd.screens.map((s, i) => (
                  <a
                    key={s.src}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${ffd.client} on ${s.platform}`}
                    className={`reveal ${i === 0 ? "float" : "float-slow"} absolute top-1/2 w-[46%] max-w-[250px] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:z-10`}
                    style={{
                      left: `${[27, 2, 52][i]}%`,
                      zIndex: [3, 2, 1][i],
                      transform: `translateY(-50%) rotate(${[0, -7, 7][i]}deg)`,
                      ["--d" as string]: `${i * 90}ms`,
                    }}
                  >
                    <Phone s={s} />
                  </a>
                ))}
              </div>
            </article>

            {/* Taramoda */}
            <article className="reveal mx-auto mt-32 max-w-3xl border-t border-hair pt-12 text-center md:mt-44">
              <div className="flex flex-wrap justify-center gap-2">
                <Tag>Fashion &amp; retail</Tag>
                <Tag>{taramoda.location}</Tag>
              </div>
              <h3 className="display mt-5 text-4xl md:text-6xl">{taramoda.client}</h3>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">{taramoda.summary}</p>
              <p className="mt-6 text-sm">
                {taramoda.links.map((l) => (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ))}
              </p>
            </article>
          </div>
        </section>

        {/* Testimony */}
        <section className="bg-wall-2 px-5 py-24 md:px-10 md:py-36">
          <figure className="reveal mx-auto max-w-5xl">
            <blockquote className="display text-[1.85rem] leading-[1.2] md:text-[3.25rem]">
              <span className="text-gold">“</span>
              {testimony.text}
              <span className="text-gold">”</span>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 text-sm">
              <span className="h-px w-10 bg-gold" aria-hidden />
              <span>
                {testimony.author}
                <span className="text-ink-2">, {testimony.org}</span>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* Content wall */}
        <section className="py-24 md:py-36">
          <div className="mx-auto mb-12 flex max-w-[92rem] flex-col gap-4 px-5 md:mb-16 md:flex-row md:items-end md:justify-between md:px-10">
            <h2 className="display split text-5xl leading-[0.98] md:text-8xl">
              See it <span className="italic text-gold">live</span>.
            </h2>
            <p className="reveal max-w-sm text-ink-2">
              {videos.length ? "Short-form work from her clients' channels." : "The channels she runs, as they are today. Tap one to open it."}
            </p>
          </div>
          {videos.length ? (
            <div className="mx-auto max-w-[92rem] px-5 md:px-10">
              <Reels videos={videos} />
            </div>
          ) : (
            <div className="drift-wrap overflow-hidden">
              <ul className="drift flex w-max gap-5 pl-5 md:gap-8">
                {[...wall, ...wall, ...wall, ...wall].map((s, i) => (
                  <li key={i} className="w-[58vw] max-w-[260px] shrink-0 sm:w-[260px]" aria-hidden={i >= wall.length}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={i >= wall.length ? -1 : 0} className="group block">
                      <div className="aspect-[9/16] overflow-hidden rounded-2xl bg-wall-2">
                        <img
                          src={s.src}
                          alt={i < wall.length ? s.alt : ""}
                          width={591}
                          height={1210}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-3 flex items-center justify-between text-sm">
                        <span>{s.platform}</span>
                        <span className="text-ink-2 transition-colors group-hover:text-gold">{s.handle}</span>
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {voice.length > 0 && (
          <section id="voice" className="px-5 pb-24 md:px-10 md:pb-36">
            <div className="mx-auto max-w-[92rem]">
              <h2 className="display split text-5xl md:text-8xl">
                Hear <span className="italic text-gold">her</span>.
              </h2>
              <div className="reveal mt-12 max-w-3xl">
                <VoicePlayer clips={voice} />
              </div>
            </div>
          </section>
        )}

        {/* Services */}
        <section id="services" className="scroll-mt-16 border-t border-hair px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[92rem]">
            <h2 className="display split max-w-4xl text-5xl leading-[0.98] md:text-8xl">
              Three skills. <span className="italic text-gold">One</span> hire.
            </h2>
            <ul className="mt-16 border-t border-hair md:mt-24">
              {rooms.map((r, i) => (
                <li
                  key={r.name}
                  className="reveal group grid gap-4 border-b border-hair py-10 md:grid-cols-12 md:items-baseline md:py-14"
                  style={{ ["--d" as string]: `${i * 80}ms` }}
                >
                  <h3 className="display text-5xl transition-colors duration-300 group-hover:text-gold md:col-span-6 md:text-8xl">
                    {r.name}
                  </h3>
                  <p className="max-w-md text-lg leading-relaxed text-ink-2 md:col-span-5 md:col-start-8">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-16 px-5 pb-24 md:px-10 md:pb-36">
          <div className="mx-auto grid max-w-[92rem] items-center gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <img
                src="/media/about-suit-853.webp"
                srcSet="/media/about-suit-640.webp 640w, /media/about-suit-853.webp 853w"
                sizes="(min-width: 768px) 40vw, 92vw"
                width={1024}
                height={1536}
                alt={`${site.fullName} in a burgundy suit, smiling`}
                loading="lazy"
                decoding="async"
                className="curtain aspect-[4/5] w-full rounded-2xl object-cover object-[50%_20%]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h2 className="display split text-5xl leading-[0.98] md:text-7xl">{note.heading}</h2>
              {note.body.map((p, i) => (
                <p key={p} className="reveal mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-2" style={{ ["--d" as string]: `${(i + 1) * 80}ms` }}>
                  {p}
                </p>
              ))}
              <p className="display reveal mt-8 text-3xl italic text-gold">{site.fullName}</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="night scroll-mt-16 border-t border-hair px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[92rem] gap-14 md:grid-cols-12">
            <div className="md:col-span-6">
              <h2 className="display split text-[11.5vw] leading-[0.95] md:text-8xl">
                Let&rsquo;s make your brand <span className="italic text-gold">unforgettable.</span>
              </h2>
              <p className="reveal mt-8 max-w-sm leading-relaxed text-ink-2">
                Tell her about your brand and what you want to achieve. Replies within two working days.
              </p>
              {site.email && (
                <a href={`mailto:${site.email}`} className="reveal mt-8 block text-xl underline decoration-gold">
                  {site.email}
                </a>
              )}
              {site.booking && (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
                  Book a call <Icon name="arrowUpRight" className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="reveal md:col-span-5 md:col-start-8 md:self-end">
              <ContactForm email={site.email} />
            </div>
          </div>
        </section>
      </main>

      <footer className="night border-t border-hair px-5 py-8 text-sm text-ink-2 md:px-10">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-3 md:flex-row md:justify-between">
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
