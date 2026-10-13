import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, GritLogo, TnLockup, TnMark } from "./ui";

export default function Footer() {
  const cols = {
    Services: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })),
    Company: [
      { label: "About", href: "/about/" },
      { label: "How We Work", href: "/#process" },
      { label: "Careers", href: "/careers/" },
      { label: "Contact", href: "/contact/" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms of Use", href: "/terms/" },
    ],
  };
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2/70">
      <Container>
        {/* Closing call to action */}
        <div className="relative mt-16 overflow-hidden rounded-[32px] bg-red px-7 py-14 text-white sm:px-14 sm:py-16">
          <TnMark tone="white" className="pointer-events-none absolute -right-10 -top-16 h-[360px] opacity-[0.12]" />
          <div className="relative max-w-[760px]">
            <h2 className="text-[34px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[48px]">Know where you are headed?<br />We will get you there.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/85">Tell us what you are building. We reply within one working day with next steps.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" tone="light" size="lg" arrow className="!bg-white !text-red hover:!bg-white/90">Start a Project</Button>
              <a href={SITE.whatsapp} className="inline-flex h-14 items-center rounded-full px-6 text-[15.5px] font-semibold text-white ring-1 ring-white/40 transition-colors hover:bg-white/10">Chat on WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="True North IT Consulting home"><TnLockup /></Link>
            <p className="mt-5 max-w-[320px] text-[14.5px] leading-relaxed text-ink-2">We build, test and run software for organisations, and we build our own products.</p>
            <ul className="mt-6 grid gap-2.5 text-[14px] text-ink-2">
              <li><a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-red"><Mail size={15} aria-hidden /> {SITE.email}</a></li>
              <li><a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-red"><Phone size={15} aria-hidden /> {SITE.phone}</a></li>
              <li className="inline-flex items-center gap-2"><MapPin size={15} aria-hidden /> {SITE.office}</li>
            </ul>
          </div>
          {Object.entries(cols).map(([h, links]) => (
            <div key={h}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-3">{h}</h3>
              <ul className="mt-4 grid gap-2.5">
                {links.map((l) => <li key={l.href}><Link href={l.href} className="text-[14.5px] text-ink-2 transition-colors hover:text-red">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-7 text-[13px] text-ink-3 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/grit/" className="inline-flex items-center gap-2 text-ink-2 hover:text-ink"><span>Makers of</span><GritLogo variant="wordmark" className="h-4" /></Link>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-ink-2 hover:text-red">LinkedIn</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
