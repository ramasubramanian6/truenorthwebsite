"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Button, Container, GritLogo, TnMark } from "../ui";

/* The hero is a compass. The True North mark is its needle: it turns to
   follow the pointer, points at a service when you hover it, and swings
   back to north when you let go. Whatever direction a project starts in,
   we bring it back to true north. */

const POINT_ANGLE = { N: 0, E: 90, S: 180, W: 270 } as const;
const LETTERS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function heading(deg: number) {
  const d = ((Math.round(deg) % 360) + 360) % 360;
  return { deg: String(d).padStart(3, "0"), dir: LETTERS[Math.round(d / 45) % 8] };
}

export default function Hero() {
  const reduce = useReducedMotion();
  const dial = useRef<HTMLDivElement>(null);
  const rotate = useSpring(0, { stiffness: 70, damping: 11, mass: 0.9 });
  const last = useRef(0);
  const [read, setRead] = useState(heading(0));
  const [focus, setFocus] = useState<string | null>(null);
  const engaged = useRef(false);
  useMotionValueEvent(rotate, "change", (v) => setRead(heading(v)));

  // Turn the shortest way, so 350 to 10 degrees does not spin all the way round.
  const aim = (target: number) => {
    const cur = last.current;
    const delta = ((((target - cur) % 360) + 540) % 360) - 180;
    last.current = cur + delta;
    rotate.set(last.current);
  };

  // A gentle sway while nobody is steering it.
  useEffect(() => {
    if (reduce) return;
    const sway = [6, -4, 2, 0];
    let n = 0;
    const t = setInterval(() => { if (!engaged.current) aim(sway[n++ % sway.length]); }, 2200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || focus || !dial.current) return;
    const b = dial.current.getBoundingClientRect();
    const dx = e.clientX - (b.left + b.width / 2);
    const dy = e.clientY - (b.top + b.height / 2);
    if (Math.hypot(dx, dy) < 30) return;
    engaged.current = true;
    aim((Math.atan2(dx, -dy) * 180) / Math.PI);
  };
  const release = () => { engaged.current = false; setFocus(null); aim(0); };
  const pointAt = (slug: string | null) => {
    setFocus(slug);
    engaged.current = Boolean(slug);
    const s = SERVICES.find((x) => x.slug === slug);
    aim(s ? POINT_ANGLE[s.point] : 0);
  };
  const focused = SERVICES.find((s) => s.slug === focus) ?? null;

  return (
    <section onPointerMove={onMove} onPointerLeave={release} className="relative overflow-hidden">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[640px] w-[640px] rounded-full bg-[var(--red-glow)] blur-[120px]" />

      <Container className="relative grid min-w-0 min-h-[calc(100svh-72px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-10">
        <div className="min-w-0">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-[13px] font-semibold text-ink-2 shadow-sm ring-1 ring-line">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-red" /></span>
            Software engineering, testing and cloud
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.05 }}
            className="mt-7 text-[40px] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink sm:text-[64px] xl:text-[74px]">
            <span className="sm:whitespace-nowrap">Engineering that</span><br /><span className="text-red sm:whitespace-nowrap">points true north.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}
            className="mt-7 max-w-[560px] text-[18px] leading-[1.6] text-ink-2 sm:text-[19.5px]">
            We design, build, test and run software for organisations that cannot afford to get it wrong. And we build our own: GRIT, our school operating system, runs a school every day.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/" size="lg" arrow>Start a Project</Button>
            <Button href="/services/" tone="secondary" size="lg">Explore Services</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13.5px] font-semibold text-ink-3">
            <Link href="/grit/" className="group inline-flex items-center gap-2 text-ink-2 hover:text-ink">Makers of <GritLogo variant="wordmark" className="h-[18px]" /><ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden /> Tirunelveli · Chennai · Coimbatore</span>
            <span>Founder-led</span>
          </motion.div>
        </div>

        {/* The compass */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full min-w-0 max-w-[540px] px-6 sm:px-0">
          <div ref={dial} className="relative aspect-square w-full">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-card shadow-[0_50px_120px_-50px_rgba(20,20,20,0.45),inset_0_0_0_1px_var(--line)]" />
            <svg viewBox="0 0 520 520" aria-hidden className="absolute inset-0 h-full w-full">
              <g className="spin-slower" style={{ transformOrigin: "260px 260px" }}>
                {Array.from({ length: 72 }).map((_, i) => {
                  const major = i % 6 === 0;
                  return <line key={i} x1="260" y1={major ? 38 : 44} x2="260" y2="54" stroke={major ? "var(--ink-3)" : "var(--line-strong)"} strokeWidth={major ? 2 : 1} transform={`rotate(${i * 5} 260 260)`} />;
                })}
              </g>
              <circle cx="260" cy="260" r="236" fill="none" stroke="var(--line)" />
              <circle cx="260" cy="260" r="168" fill="none" stroke="var(--line)" strokeDasharray="2 7" className="spin-slow" style={{ transformOrigin: "260px 260px" }} />
              <circle cx="260" cy="260" r="110" fill="var(--red-soft)" opacity="0.55" />
              {[["N", 260, 96], ["E", 426, 266], ["S", 260, 434], ["W", 94, 266]].map(([l, x, y]) => (
                <text key={l as string} x={x as number} y={y as number} textAnchor="middle" fontSize="22" fontWeight="800" fill={l === "N" ? "var(--red)" : "var(--ink-3)"} fontFamily="var(--font-montserrat)">{l}</text>
              ))}
            </svg>

            {/* The needle: the True North mark, pivoting on its circle */}
            <motion.div aria-hidden style={{ rotate, transformOrigin: "50% 72.7%" }}
              className="absolute left-1/2 top-1/2 h-[46%] -translate-x-1/2 -translate-y-[72.7%] drop-shadow-[0_18px_24px_rgba(20,20,20,0.25)]">
              <TnMark className="h-full" tone="ink" />
            </motion.div>
            <span aria-hidden className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red ring-4 ring-white" />

            {/* The four directions we work in */}
            {SERVICES.map((s) => {
              const pos = { N: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2", E: "right-0 top-1/2 translate-x-[8%] -translate-y-1/2 sm:translate-x-[18%]", S: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2", W: "left-0 top-1/2 -translate-x-[8%] -translate-y-1/2 sm:-translate-x-[18%]" }[s.point];
              const on = focus === s.slug;
              return (
                <Link key={s.slug} href={`/services/${s.slug}/`} onMouseEnter={() => pointAt(s.slug)} onMouseLeave={() => pointAt(null)} onFocus={() => pointAt(s.slug)} onBlur={() => pointAt(null)}
                  className={`absolute z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold shadow-[0_12px_30px_-14px_rgba(20,20,20,0.4)] ring-1 transition-all ${pos} ${on ? "bg-red text-white ring-red" : "bg-card text-ink ring-line hover:ring-red/40"}`}>
                  <span className={`text-[11px] font-extrabold ${on ? "text-white/80" : "text-red"}`}>{s.point}</span>{s.verb}
                </Link>
              );
            })}
          </div>

          {/* Heading readout */}
          <div className="mx-auto mt-12 flex max-w-[460px] items-center justify-center gap-3 rounded-2xl bg-card px-5 py-3.5 text-center shadow-sm ring-1 ring-line" aria-live="polite">
            <span className="shrink-0 whitespace-nowrap font-mono text-[13px] font-semibold text-ink-3">HDG <span className="text-ink">{read.deg}°</span> {read.dir}</span>
            <span className="h-4 w-px bg-line-strong" />
            <span className="min-w-0 text-left text-[13px] font-semibold leading-snug text-ink-2 sm:truncate sm:text-[13.5px]">{focused ? `${focused.verb}: ${focused.tagline}` : "Move your pointer. We return to north."}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
