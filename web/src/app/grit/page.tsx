import type { Metadata } from "next";
import { GritShowcase } from "@/components/home/Sections";
import { PageHero } from "@/components/page";
import { Button, Container, Reveal, Section, SectionHeader } from "@/components/ui";
import { GRIT, TESTIMONIALS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "GRIT, the School Operating System", description: GRIT.summary, alternates: { canonical: "/grit/" } };

const BUILT = [
  { title: "Designed With the School", text: "We sat with leadership, the office, teachers and accounts to learn how a school really runs, then designed every screen around the work done most often." },
  { title: "Engineered as One System", text: "One PostgreSQL schema, one identity model and one academic year, so an admission becomes a student, a fee ledger and a parent login in one step." },
  { title: "Tested on Every Change", text: "An automated test gate, including a PostgreSQL lane, runs before any release reaches the school." },
  { title: "Run on AWS in India", text: "Containers on ECS Fargate in Hyderabad, managed PostgreSQL and encrypted, versioned document storage." },
];

export default function GritPage() {
  const t = TESTIMONIALS[0];
  return (
    <>
      <PageHero eyebrow="Our Product" title={<>GRIT. <span className="text-red">{GRIT.promise}</span></>} lead="The school operating system we designed, built and run ourselves. It is the clearest example of what True North does for its clients.">
        {SITE.gritUrl ? <Button href={SITE.gritUrl} size="lg" arrow>Visit the GRIT Website</Button> : null}
        <Button href="/contact/" tone={SITE.gritUrl ? "secondary" : "primary"} size="lg" arrow={!SITE.gritUrl}>Book a GRIT Demo</Button>
      </PageHero>
      <GritShowcase />
      <Section>
        <Container>
          <SectionHeader eyebrow="Case Study" title="How we built GRIT." lead="Every service we offer went into one product. Here is what that looked like." />
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {BUILT.map((b, n) => (
              <Reveal as="li" key={b.title} delay={0.05 * n} className="rounded-2xl bg-card p-7 ring-1 ring-line">
                <span className="text-[13px] font-extrabold text-red">0{n + 1}</span>
                <p className="mt-3 text-[20px] font-bold text-ink">{b.title}</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{b.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 rounded-[28px] bg-red-soft p-8 ring-1 ring-red/15 sm:p-10">
            <p className="text-[22px] font-semibold leading-snug text-ink sm:text-[26px]">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-4 text-[15px] font-bold text-ink">{t.who} <span className="font-medium text-ink-3">· {t.role}</span></p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
