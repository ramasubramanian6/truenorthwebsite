"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BrainCircuit, CalendarClock, Cloud, Database, MonitorSmartphone, Server, ShieldCheck, Check, Minus, Plus, Quote, Sparkles, Stamp } from "lucide-react";
import { FAQ, GRIT, PRINCIPLES, PROCESS, SERVICES, STACK, TESTIMONIALS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { BrowserFrame, Button, Container, GritLogo, Reveal, Section, SectionHeader, TnMark, tabKeys } from "../ui";

/* ── The stack, as six capability areas ───────────────────────────────── */

const STACK_ICONS = { cloud: Cloud, web: MonitorSmartphone, api: Server, data: Database, ai: BrainCircuit, quality: ShieldCheck } as const;

export function Stack() {
  return (
    <div className="border-y border-line bg-card/60 py-10">
      <Container>
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.2em] text-ink-3">Enterprise-Grade Technology, End to End</p>
        <Reveal><ul className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-3 lg:grid-cols-6">
          {STACK.map((s) => {
            const Icon = STACK_ICONS[s.key as keyof typeof STACK_ICONS];
            return (
              <li key={s.key} className="group bg-card p-5 transition-colors hover:bg-red-soft/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-soft text-red transition-colors group-hover:bg-red group-hover:text-white"><Icon size={19} aria-hidden /></span>
                <p className="mt-4 text-[14.5px] font-bold leading-snug text-ink">{s.title}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-3">{s.tools}</p>
              </li>
            );
          })}
        </ul></Reveal>
      </Container>
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

        <GritAi />

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

/* ── GRIT's three headline features ───────────────────────────────────── */

const AI_ICONS = { timetable: CalendarClock, paper: Sparkles, docs: Stamp } as const;
type AiKey = keyof typeof AI_ICONS;

function GritAi() {
  const ids = GRIT.ai.map((f) => f.key as AiKey);
  const [k, setK] = useState<AiKey>("timetable");
  const f = GRIT.ai.find((x) => x.key === k)!;
  return (
    <div className="relative mt-20 overflow-hidden rounded-[32px] bg-gradient-to-br from-card via-card to-red-soft p-6 ring-1 ring-red/15 shadow-[0_40px_100px_-50px_rgba(211,8,18,0.45)] sm:p-10">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--red-glow)] blur-3xl" />
      <Reveal className="relative max-w-[720px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-red px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white"><Sparkles size={13} aria-hidden /> Built Into GRIT</span>
        <h3 className="mt-5 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]">The work that eats a school&apos;s week, <span className="text-red">done for you.</span></h3>
        <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">Timetables, exam papers and certificates take the most hours in a school office. GRIT generates all three.</p>
      </Reveal>

      <div className="relative mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div role="tablist" aria-label="GRIT features" aria-orientation="vertical" onKeyDown={tabKeys(ids, k, setK, "vertical")} className="grid content-start gap-3">
          {GRIT.ai.map((x) => {
            const Icon = AI_ICONS[x.key as AiKey];
            const on = x.key === k;
            return (
              <button key={x.key} type="button" role="tab" data-tab-id={x.key} aria-selected={on} tabIndex={on ? 0 : -1} onClick={() => setK(x.key as AiKey)}
                className={`flex items-start gap-4 rounded-2xl p-5 text-left transition-all ${on ? "bg-card shadow-[0_20px_50px_-24px_rgba(211,8,18,0.5)] ring-2 ring-red" : "bg-card/60 ring-1 ring-line hover:bg-card"}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on ? "bg-red text-white" : "bg-red-soft text-red"}`}><Icon size={20} aria-hidden /></span>
                <span>
                  <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-red">{x.tag}</span>
                  <span className="mt-1 block text-[17px] font-bold leading-snug text-ink">{x.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" aria-label={f.tag}>
          <AnimatePresence mode="wait">
            <motion.div key={f.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {f.screen ? (
                <BrowserFrame url={`app.grit.school/${f.key === "paper" ? "question-paper" : "documents"}`}>
                  <Image src={f.screen.src} alt={f.screen.alt} width={2880} height={1800} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" />
                </BrowserFrame>
              ) : <TimetableMock />}
              <p className="mt-6 text-[16px] leading-relaxed text-ink-2">{f.text}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {f.points.map((pt) => <li key={pt} className="flex gap-2 text-[14px] font-semibold leading-snug text-ink"><Check size={16} aria-hidden className="mt-0.5 shrink-0 text-red" />{pt}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** An illustration of a generated week, drawn rather than screenshotted. */
function TimetableMock() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const tone: Record<string, string> = { Maths: "bg-red text-white", Science: "bg-red-soft text-red", English: "bg-paper-2 text-ink", Tamil: "bg-ink/[0.06] text-ink-2", Social: "bg-red/15 text-red-strong", Hindi: "bg-card text-ink ring-1 ring-line", PE: "bg-ok-soft text-ok" };
  const week = [
    ["Maths", "English", "Science", "Tamil", "Social", "Hindi"],
    ["English", "Maths", "Tamil", "Science", "PE", "Social"],
    ["Science", "Tamil", "Maths", "Hindi", "English", "Maths"],
    ["Tamil", "Social", "English", "Maths", "Science", "PE"],
    ["Maths", "Science", "Hindi", "English", "Tamil", "Social"],
  ];
  return (
    <BrowserFrame url="app.grit.school/timetable">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] font-bold text-ink">Class 8A <span className="font-medium text-ink-3">· Generated timetable</span></p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-[12px] font-bold text-ok"><Check size={13} aria-hidden /> No clashes</span>
        </div>
        <div className="mt-4 grid grid-cols-[auto_repeat(6,minmax(0,1fr))] gap-1.5 text-[10.5px] font-semibold sm:text-[12px]">
          <span />
          {[1, 2, 3, 4, 5, 6].map((p) => <span key={p} className="pb-1 text-center text-ink-3">P{p}</span>)}
          {days.map((d, r) => (
            <div key={d} className="contents">
              <span className="flex items-center pr-2 text-ink-3">{d}</span>
              {[0, 1, 2, 3, 4, 5].map((c) => {
                const name = week[r][c], cls = tone[name];
                return <motion.span key={c} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.03 * (r * 6 + c) }} className={`truncate rounded-md px-1 py-2.5 text-center ${cls}`}>{name}</motion.span>;
              })}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-ink-3">Solved with Google OR-Tools CP-SAT across every class, teacher and period.</p>
      </div>
    </BrowserFrame>
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
