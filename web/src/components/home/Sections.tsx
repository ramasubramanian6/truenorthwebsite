"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Minus, Plus, Quote } from "lucide-react";
import { FAQ, GRIT, PRINCIPLES, PROCESS, SERVICES, STACK, TESTIMONIALS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { BrowserFrame, Button, Container, GritLogo, Reveal, Section, SectionHeader, TnMark } from "../ui";

/* ── The stack, as a quiet marquee ────────────────────────────────────── */

export function Stack() {
  return (
    <div className="border-y border-line bg-card/60 py-6">
      <p className="text-center text-[12px] font-bold uppercase tracking-[0.2em] text-ink-3">Built With Tools We Use Every Day</p>
      <div className="mask-fade-x mt-4 overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...STACK, ...STACK].map((s, i) => <span key={i} className="text-[18px] font-bold text-ink/45">{s}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── Services, one per compass point ──────────────────────────────────── */

export function Services() {
  return (
    <Section id="services">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <SectionHeader eyebrow="What We Do" title={<>Four directions.<br className="hidden sm:block" /> <span className="text-red">One team.</span></>} lead="From the first sketch to the system that runs at 2 AM, we cover every direction a software project takes." />
          <Link href="/services/" className="inline-flex items-center gap-1.5 text-[15px] font-bold text-red transition-all hover:gap-2.5">All services <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, n) => (
            <Reveal as="li" key={s.slug} delay={0.06 * n}>
              <Link href={`/services/${s.slug}/`} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-8 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(20,20,20,0.4)] hover:ring-red/30 sm:p-10">
                <span aria-hidden className="pointer-events-none absolute -right-6 -top-10 text-[200px] font-black leading-none text-ink/[0.035] transition-colors group-hover:text-red/[0.08]">{s.point}</span>
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-red-soft px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em] text-red">{s.point} · {s.verb}</span>
                <h3 className="relative mt-6 text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink">{s.name}</h3>
                <p className="relative mt-3 text-[16px] leading-relaxed text-ink-2">{s.summary}</p>
                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {s.deliverables.slice(0, 4).map((d) => <li key={d} className="rounded-full bg-paper-2 px-3 py-1 text-[12.5px] font-semibold text-ink-2">{d}</li>)}
                </ul>
                <span className="relative mt-auto inline-flex items-center gap-1.5 pt-8 text-[15px] font-bold text-red">Explore {s.verb.toLowerCase()} <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── GRIT: the product we built and run ───────────────────────────────── */

export function GritShowcase() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setI((n) => (n + 1) % GRIT.screens.length), 3200);
    return () => clearInterval(t);
  }, [hover]);
  const gritHref = SITE.gritUrl || "/grit/";

  return (
    <Section id="grit" className="overflow-hidden bg-red-soft/60">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal><span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-red ring-1 ring-red/15">Our Product</span></Reveal>
            <Reveal delay={0.05} className="mt-6 text-ink"><GritLogo variant="lockup" className="h-[74px]" /></Reveal>
            <Reveal delay={0.1}><h2 className="mt-7 text-[34px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[44px]">{GRIT.promise}</h2></Reveal>
            <Reveal delay={0.14}><p className="mt-5 text-[17px] leading-relaxed text-ink-2">{GRIT.summary}</p></Reveal>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GRIT.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-card p-4 ring-1 ring-line">
                  <dt className="sr-only">{s.label}</dt>
                  <dd><span className="block text-[26px] font-extrabold leading-none tracking-tight text-ink">{s.value}</span><span className="mt-1.5 block text-[12.5px] font-bold text-ink">{s.label}</span><span className="block text-[11.5px] text-ink-3">{s.hint}</span></dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={gritHref} size="lg" arrow>Discover GRIT</Button>
              <Button href="/contact/" tone="secondary" size="lg">Book a Demo</Button>
            </div>
          </div>

          {/* A deck of real GRIT screens; the front card changes, the rest wait behind */}
          <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="relative aspect-[16/12.4]">
              {GRIT.screens.map((s, n) => {
                const pos = (n - i + GRIT.screens.length) % GRIT.screens.length;
                const visible = pos < 4;
                return (
                  <motion.div key={s.src} className="absolute inset-x-0 top-0 origin-bottom"
                    animate={{ y: pos * -26, scale: 1 - pos * 0.06, opacity: visible ? 1 - pos * 0.18 : 0, zIndex: 10 - pos, rotate: pos === 0 ? 0 : (pos % 2 ? -1.5 : 1.5) }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ top: "14%" }}>
                    <BrowserFrame url={`app.grit.school/${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Image src={s.src} alt={pos === 0 ? s.alt : ""} width={2880} height={1800} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" priority={n === 0} />
                    </BrowserFrame>
                  </motion.div>
                );
              })}
            </div>
            <div role="tablist" aria-label="GRIT screens" className="mt-8 flex flex-wrap justify-center gap-2">
              {GRIT.screens.map((s, n) => (
                <button key={s.src} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${n === i ? "bg-red text-white" : "bg-card text-ink-2 ring-1 ring-line hover:text-ink"}`}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GRIT.highlights.map((h, n) => (
            <Reveal as="li" key={h.title} delay={0.05 * n} className="rounded-2xl bg-card p-6 ring-1 ring-line">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-red-soft text-red"><Check size={16} aria-hidden /></span>
              <p className="mt-4 text-[17px] font-bold text-ink">{h.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{h.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── How we work: a route that fills in as you scroll ─────────────────── */

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [lit, setLit] = useState(0);
  useEffect(() => scrollYProgress.on("change", (v) => setLit(Math.min(PROCESS.length, Math.floor(v * PROCESS.length + 0.35)))), [scrollYProgress]);

  return (
    <Section id="process">
      <Container>
        <SectionHeader align="center" eyebrow="How We Work" title={<>A clear route, <span className="text-red">every time.</span></>} lead="Four stages, the same on every project, so you always know where things stand and what comes next." />
        <div ref={ref} className="relative mt-16">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-1 rounded-full bg-line md:block">
            <motion.div style={{ width: fill }} className="h-full rounded-full bg-red" />
          </div>
          <ol className="grid gap-6 md:grid-cols-4">
            {PROCESS.map((p, n) => {
              const on = n < lit;
              return (
                <li key={p.title} className="relative text-center">
                  <span className={`relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full text-[17px] font-extrabold transition-all duration-500 ${on ? "bg-red text-white shadow-[0_12px_30px_-10px_rgba(211,8,18,0.6)]" : "bg-card text-ink-3 ring-1 ring-line"}`}>{p.point}</span>
                  <p className={`mt-5 text-[22px] font-bold transition-colors duration-500 ${on ? "text-ink" : "text-ink-3"}`}>{p.title}</p>
                  <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-relaxed text-ink-2">{p.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ── Proof and principles ─────────────────────────────────────────────── */

export function Proof() {
  const t = TESTIMONIALS[0];
  return (
    <Section className="bg-paper-2/60">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <figure className="relative overflow-hidden rounded-[32px] bg-card p-9 ring-1 ring-line shadow-[0_40px_90px_-50px_rgba(20,20,20,0.45)] sm:p-12">
              <TnMark tone="red" className="pointer-events-none absolute -bottom-20 -right-6 h-[300px] opacity-[0.06]" />
              <Quote size={42} className="text-red" aria-hidden />
              <blockquote className="relative mt-6 text-[24px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink sm:text-[29px]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-red-soft text-[14px] font-extrabold text-red">KB</span>
                <span><span className="block text-[17px] font-bold text-ink">{t.who}</span><span className="block text-[14px] text-ink-3">{t.role}</span></span>
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <SectionHeader eyebrow="Why True North" title="We build like we have to live with it. Because we do." />
            <ul className="mt-8 grid gap-4">
              {PRINCIPLES.map((p, n) => (
                <Reveal as="li" key={p.title} delay={0.05 * n} className="flex gap-4">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red text-[13px] font-bold text-white">{n + 1}</span>
                  <span><span className="block text-[17px] font-bold text-ink">{p.title}</span><span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{p.text}</span></span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export function Faq({ items = FAQ, title = "Questions, answered." }: { items?: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="FAQ" title={title} lead={<>Something else? <Link href="/contact/" className="font-semibold text-red underline underline-offset-4">Ask us directly</Link>.</>} />
          <ul className="divide-y divide-line border-y border-line">
            {items.map((f, n) => {
              const on = open === n;
              return (
                <li key={f.q}>
                  <h3>
                    <button type="button" aria-expanded={on} aria-controls={`faq-${n}`} onClick={() => setOpen(on ? null : n)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                      <span className="text-[17px] font-bold text-ink">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-red text-white" : "bg-paper-2 text-ink"}`}>{on ? <Minus size={16} aria-hidden /> : <Plus size={16} aria-hidden />}</span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div id={`faq-${n}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p className="pb-6 pr-12 text-[15.5px] leading-relaxed text-ink-2">{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
