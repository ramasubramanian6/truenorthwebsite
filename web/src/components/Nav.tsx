"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Button, TnLockup } from "./ui";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); setMobile(false); }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobile]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 160); };
  const active = (href: string) => href !== "/" && !href.includes("#") && pathname.startsWith(href.replace(/\/$/, ""));
  const link = (href: string) => `rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${active(href) ? "text-red" : "text-ink-2 hover:text-ink"}`;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || mobile ? "border-b border-line bg-paper/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="True North IT Consulting home"><TnLockup /></Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
            <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} onFocus={enter}
              className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${open || active("/services/") ? "text-red" : "text-ink-2 hover:text-ink"}`}>
              Services <ChevronDown size={15} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-[calc(100%+10px)] w-[560px] -translate-x-1/2 rounded-2xl bg-card p-2 shadow-[0_30px_80px_-30px_rgba(20,20,20,0.35)] ring-1 ring-line before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']">
                  <ul className="grid grid-cols-2 gap-1">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}/`} className="group flex gap-3 rounded-xl p-3.5 transition-colors hover:bg-paper-2">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-soft text-[13px] font-extrabold text-red">{s.point}</span>
                          <span className="min-w-0">
                            <span className="block text-[14.5px] font-bold text-ink">{s.name}</span>
                            <span className="block text-[12.5px] leading-snug text-ink-3">{s.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/services/" className="mt-1 flex items-center justify-between rounded-xl bg-paper-2 px-4 py-3 text-[13.5px] font-semibold text-red hover:bg-red-soft">All services <ArrowRight size={15} aria-hidden /></Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <Link href="/grit/" className={link("/grit/")}>GRIT</Link>
          <Link href="/#process" className={link("/#process")}>How We Work</Link>
          <Link href="/about/" className={link("/about/")}>About</Link>
          <Link href="/careers/" className={link("/careers/")}>Careers</Link>
        </nav>

        <div className="ml-3 hidden lg:block"><Button href="/contact/" size="sm" arrow>Start a Project</Button></div>

        <button type="button" onClick={() => setMobile((v) => !v)} aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile}
          className="ml-auto grid h-11 w-11 place-items-center rounded-full text-ink ring-1 ring-line lg:hidden">
          {mobile ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobile ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper px-5 pb-10 pt-4 lg:hidden">
            <p className="pt-2 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-3">Services</p>
            <ul className="mt-2 grid gap-1 border-b border-line pb-4">
              {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="block py-2 text-[17px] font-semibold text-ink">{s.name}</Link></li>)}
            </ul>
            {[["GRIT", "/grit/"], ["How We Work", "/#process"], ["About", "/about/"], ["Careers", "/careers/"], ["Contact", "/contact/"]].map(([l, h]) => (
              <Link key={h} href={h} className="block border-b border-line py-4 text-[20px] font-bold text-ink">{l}</Link>
            ))}
            <div className="mt-6"><Button href="/contact/" size="lg" arrow className="w-full">Start a Project</Button></div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
