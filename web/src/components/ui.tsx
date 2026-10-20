"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { GRIT_RED, MARK_D, TAGLINE_D, VIEWBOX, WORD_D } from "@/lib/gritLogo";

/* ── Logo ─────────────────────────────────────────────────────────────── */

type LogoVariant = "mark" | "wordmark" | "lockup";

/** The GRIT logo as inline SVG. The mark stays red; the lettering takes the
 *  current text colour, so it reads on paper and on the dark stage. */
export function GritLogo({ variant = "wordmark", className = "h-7", title = "GRIT" }: { variant?: LogoVariant; className?: string; title?: string }) {
  return (
    <svg viewBox={VIEWBOX[variant]} fill="none" role="img" aria-label={title} className={`w-auto shrink-0 ${className}`}>
      <path d={MARK_D} fill="none" stroke={GRIT_RED} strokeWidth={120} strokeLinecap="round" strokeLinejoin="round" />
      {variant !== "mark" ? <path d={WORD_D} fill="currentColor" /> : null}
      {variant === "lockup" ? <path d={TAGLINE_D} fill="currentColor" /> : null}
    </svg>
  );
}

/** The True North mark: the north arrow over the TN circle. The letters in
 *  the source artwork are transparent, so it is drawn as a mask and takes
 *  any colour. */
export function TnMark({ className = "h-9", tone = "ink" }: { className?: string; tone?: "ink" | "red" | "white" }) {
  const bg = { ink: "bg-ink", red: "bg-red", white: "bg-white" }[tone];
  return (
    <span role="img" aria-label="True North" className={`inline-block aspect-[741/1313] shrink-0 ${bg} ${className}`}
      style={{ WebkitMaskImage: "url(/brand/tn-mark.png)", maskImage: "url(/brand/tn-mark.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
  );
}

/** Mark plus name, for the header and footer. */
export function TnLockup({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <TnMark className="h-10" tone={light ? "white" : "ink"} />
      <span className="inline-flex flex-col leading-none">
        <span className={`whitespace-nowrap text-[17px] font-extrabold tracking-[-0.01em] ${light ? "text-white" : "text-ink"}`}>True North</span>
        {/* Spread letter by letter across exactly the width of "True North"
            (w-0 + min-w-full keeps it from widening the column). */}
        <span className="sr-only">IT Consulting</span>
        <span aria-hidden className="mt-[5px] flex w-0 min-w-full select-none justify-between text-[9.5px] font-bold uppercase text-red">
          {"IT CONSULTING".split("").map((c, n) => <span key={n} className={c === " " ? "w-[3px]" : ""}>{c === " " ? "" : c}</span>)}
        </span>
      </span>
    </span>
  );
}

/* ── Layout ───────────────────────────────────────────────────────────── */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id, dark = false }: { children: ReactNode; className?: string; id?: string; dark?: boolean }) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-20 sm:py-28 ${dark ? "bg-stage text-stage-ink" : ""} ${className}`}>
      {children}
    </section>
  );
}

/* ── Type ─────────────────────────────────────────────────────────────── */

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] ${dark ? "text-[#ff5a60]" : "text-red"}`}>
      <span aria-hidden className={`h-px w-7 ${dark ? "bg-[#ff5a60]" : "bg-red"}`} />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow, title, lead, dark = false, align = "left", className = "",
}: { eyebrow: string; title: ReactNode; lead?: ReactNode; dark?: boolean; align?: "left" | "center"; className?: string }) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-[760px] ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-[34px] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[46px] ${dark ? "text-stage-ink" : "text-ink"}`}>{title}</h2>
      {lead ? <p className={`mt-5 text-[17px] leading-[1.65] sm:text-[18px] ${dark ? "text-stage-ink-2" : "text-ink-2"}`}>{lead}</p> : null}
    </Reveal>
  );
}

/* ── Actions ──────────────────────────────────────────────────────────── */

type ButtonTone = "primary" | "secondary" | "ghost" | "light";

const BUTTON: Record<ButtonTone, string> = {
  primary: "bg-red text-white shadow-[0_10px_30px_-10px_rgba(209,9,18,0.65)] hover:bg-red-strong",
  secondary: "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/30",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-white/10 text-stage-ink ring-1 ring-white/15 hover:bg-white/15",
};

export function Button({
  href, children, tone = "primary", size = "md", arrow = false, className = "",
}: { href: string; children: ReactNode; tone?: ButtonTone; size?: "sm" | "md" | "lg"; arrow?: boolean; className?: string }) {
  const sizes = { sm: "h-10 px-4 text-[14px]", md: "h-12 px-6 text-[15px]", lg: "h-14 px-7 text-[16px]" };
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${sizes[size]} ${BUTTON[tone]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <ArrowRight size={17} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" /> : null}
    </>
  );
  return external ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

/* ── Motion ───────────────────────────────────────────────────────────── */

export function Reveal({ children, className = "", delay = 0, y = 18, as = "div" }: { children: ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" | "span" }) {
  const Tag = as === "li" ? motion.li : as === "span" ? motion.span : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/* ── Frames ───────────────────────────────────────────────────────────── */

/** A browser window around a product screen. */
export function BrowserFrame({ children, url = "app.grit.school", className = "", dark = false }: { children: ReactNode; url?: string; className?: string; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[18px] ${dark ? "bg-stage-2 ring-1 ring-white/10" : "bg-card ring-1 ring-line"} shadow-[0_40px_100px_-40px_rgba(20,20,20,0.45)] ${className}`}>
      <div className={`flex h-10 items-center gap-2 px-4 ${dark ? "border-b border-white/10" : "border-b border-line bg-paper-2/60"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className={`mx-auto rounded-md px-3 py-1 text-[11.5px] font-medium ${dark ? "bg-white/5 text-stage-ink-2" : "bg-card text-ink-3 ring-1 ring-line"}`}>{url}</span>
        <span className="w-12" />
      </div>
      {children}
    </div>
  );
}

/** A phone around a mobile view (WhatsApp messages, the parent portal). */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[42px] bg-[#111] p-[9px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/40 ${className}`}>
      <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full overflow-hidden rounded-[34px] bg-[#efeae2]">{children}</div>
    </div>
  );
}

/* ── Small pieces ─────────────────────────────────────────────────────── */

export function IconTile({ children, tone = "red", className = "" }: { children: ReactNode; tone?: "red" | "ink" | "dark"; className?: string }) {
  const tones = {
    red: "bg-red-soft text-red",
    ink: "bg-ink/5 text-ink",
    dark: "bg-white/[0.07] text-[#ff5a60] ring-1 ring-white/10",
  };
  return <span aria-hidden className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tones[tone]} ${className}`}>{children}</span>;
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[12.5px] font-semibold text-ink-2 ring-1 ring-line ${className}`}>{children}</span>;
}

/* ── Keyboard ─────────────────────────────────────────────────────────── */

/** Arrow-key movement for a tab strip (the ARIA tabs pattern): the arrows
 *  pick the next or previous tab and move focus to it. Each tab button needs
 *  data-tab-id. */
export function tabKeys<T extends string>(ids: readonly T[], current: T, select: (id: T) => void, orientation: "horizontal" | "vertical" = "horizontal") {
  return (e: React.KeyboardEvent<HTMLElement>) => {
    const prev = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    const next = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    if (![prev, next, "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = ids.indexOf(current);
    const n = e.key === "Home" ? 0 : e.key === "End" ? ids.length - 1 : (i + (e.key === next ? 1 : ids.length - 1)) % ids.length;
    select(ids[n]);
    (e.currentTarget.querySelector(`[data-tab-id="${ids[n]}"]`) as HTMLElement | null)?.focus();
  };
}
