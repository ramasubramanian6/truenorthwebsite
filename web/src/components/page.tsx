import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
type Block = { title: string; text: string };
type Screen = { src: string; alt: string };
import { BrowserFrame, Button, Container, Eyebrow, Reveal, Section, SectionHeader } from "./ui";

/* Building blocks for the inner pages, so every page shares one rhythm. */

export function PageHero({ eyebrow, title, lead, children, center = false }: { eyebrow: string; title: ReactNode; lead: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--red-glow)] blur-[120px]" />
      <Container className="relative">
        <div className={center ? "mx-auto max-w-[860px] text-center" : "max-w-[860px]"}>
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h1 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[62px]">{title}</h1></Reveal>
          <Reveal delay={0.1}><p className={`mt-6 text-[18px] leading-[1.6] text-ink-2 sm:text-[20px] ${center ? "mx-auto max-w-[700px]" : "max-w-[720px]"}`}>{lead}</p></Reveal>
          {children ? <Reveal delay={0.15} className={`mt-9 flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}

export function HeroActions({ secondary = { label: "Explore Services", href: "/services/" } }: { secondary?: { label: string; href: string } }) {
  return (
    <>
      <Button href="/contact/" size="lg" arrow>Start a Project</Button>
      <Button href={secondary.href} tone="secondary" size="lg">{secondary.label}</Button>
    </>
  );
}

export function Stats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <Container>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-6">
            <dt className="sr-only">{s.label}</dt>
            <dd><span className="block text-[30px] font-extrabold tracking-[-0.03em] text-ink">{s.value}</span><span className="mt-1 block text-[13.5px] text-ink-3">{s.label}</span></dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function ScreenShowcase({ screen, url = "app.grit.school" }: { screen: Screen; url?: string }) {
  return (
    <Container className="mt-14">
      <Reveal>
        <BrowserFrame url={url}>
          <Image src={screen.src} alt={screen.alt} width={2880} height={1800} sizes="(min-width: 1240px) 1180px, 100vw" className="h-auto w-full" />
        </BrowserFrame>
      </Reveal>
    </Container>
  );
}

export function Blocks({ eyebrow, title, blocks, cols = 3 }: { eyebrow: string; title: ReactNode; blocks: Block[]; cols?: 2 | 3 }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <ul className={`mt-12 grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
          {blocks.map((b, n) => (
            <Reveal as="li" key={b.title} delay={0.04 * n} className="group rounded-2xl bg-card p-7 ring-1 ring-line transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(20,20,20,0.35)]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-red-soft text-red"><Check size={17} aria-hidden /></span>
              <p className="mt-5 text-[19px] font-bold text-ink">{b.title}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function Flow({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  return (
    <Section className="overflow-hidden bg-red-soft/60">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <SectionHeader eyebrow="How It Works" title={title} />
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s, n) => (
            <Reveal as="li" key={s.title} delay={0.07 * n} className="relative rounded-2xl bg-card p-6 ring-1 ring-line">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-red text-[14px] font-bold text-white">{n + 1}</span>
              <p className="mt-4 text-[18px] font-bold text-ink">{s.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
              {n < steps.length - 1 ? <ArrowRight aria-hidden size={18} className="absolute -right-[14px] top-9 z-10 hidden rounded-full bg-paper text-ink-3 md:block" /> : null}
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function RelatedLinks({ items, title = "Keep Exploring" }: { items: { href: string; label: string; text: string }[]; title?: string }) {
  return (
    <Section className="bg-paper-2/60">
      <Container>
        <SectionHeader eyebrow={title} title="There is more to GRIT." />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col rounded-2xl bg-card p-7 ring-1 ring-line transition-all hover:ring-red/40">
                <span className="text-[19px] font-bold text-ink">{r.label}</span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{r.text}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-red transition-all group-hover:gap-2.5">Learn more <ArrowRight size={15} aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** A prose page (about, privacy, terms). */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <Container className="pb-24">
      <div className="mx-auto max-w-[760px] text-[16.5px] leading-[1.75] text-ink-2 [&_a]:font-semibold [&_a]:text-red [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </Container>
  );
}
