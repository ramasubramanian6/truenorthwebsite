import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Faq } from "@/components/home/Sections";
import { Flow, HeroActions, PageHero } from "@/components/page";
import { Container, GritLogo, Reveal, Section, SectionHeader } from "@/components/ui";
import { SERVICES } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return SERVICES.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.name, description: s.summary, alternates: { canonical: `/services/${s.slug}/` }, openGraph: { title: `${s.name} | True North IT Consulting`, description: s.summary, url: `/services/${s.slug}/` } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  return (
    <>
      <PageHero eyebrow={`${s.point} · ${s.verb}`} title={<>{s.name}. <span className="text-red">{s.tagline}</span></>} lead={s.summary}><HeroActions /></PageHero>

      <Section className="pt-0 sm:pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-[28px] bg-card p-8 ring-1 ring-line sm:p-10">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-3">What You Get</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.deliverables.map((d) => <li key={d} className="flex items-start gap-3 text-[16px] font-semibold text-ink"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-soft text-red"><Check size={14} aria-hidden /></span>{d}</li>)}
            </ul>
            <p className="mt-10 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-3">Tools</p>
            <ul className="mt-4 flex flex-wrap gap-2">{s.stack.map((t) => <li key={t} className="rounded-full bg-paper-2 px-3 py-1.5 text-[13px] font-semibold text-ink-2">{t}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-between rounded-[28px] bg-red-soft p-8 ring-1 ring-red/15 sm:p-10">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-red">Proof, Not Promises</p>
              <p className="mt-4 text-[21px] font-bold leading-snug text-ink">{s.proof}</p>
            </div>
            <Link href="/grit/" className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-ink hover:text-red">See how we built <GritLogo variant="wordmark" className="h-4" /> <ArrowRight size={15} aria-hidden /></Link>
          </Reveal>
        </Container>
      </Section>

      <Flow title={`How ${s.verb.toLowerCase()} works with us.`} steps={s.steps} />
      <Faq items={s.faq} title={`${s.name}, answered.`} />

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeader eyebrow="Other Directions" title="We cover the whole journey." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}/`} className="group flex h-full flex-col rounded-2xl bg-card p-7 ring-1 ring-line transition-all hover:ring-red/40">
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-red">{o.point} · {o.verb}</span>
                  <span className="mt-2 text-[19px] font-bold text-ink">{o.name}</span>
                  <span className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{o.tagline}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-red transition-all group-hover:gap-2.5">Learn more <ArrowRight size={15} aria-hidden /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
