import type { Metadata } from "next";
import { Button, Container, Reveal, Section, SectionHeader } from "@/components/ui";
import { PageHero } from "@/components/page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Careers", description: `Work with ${SITE.name} on real products used every day.`, alternates: { canonical: "/careers/" } };

const WHAT = [
  { title: "Real Products", text: "Your work ships to GRIT and to client systems that people rely on every day." },
  { title: "Small Team, Big Ownership", text: "You own features end to end, from design to production." },
  { title: "Modern Tools", text: "React, TypeScript, Python, PostgreSQL, AWS and automated testing." },
];

export default function CareersPage() {
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Careers at True North")}`;
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Build things <span className="text-red">people use.</span></>} lead="We are always glad to hear from engineers, testers and designers who care about doing the work properly.">
        <Button href={mail} size="lg" arrow>Send Your CV</Button>
      </PageHero>
      <Section className="pt-0 sm:pt-0">
        <Container>
          <ul className="grid gap-4 md:grid-cols-3">
            {WHAT.map((w, n) => (
              <Reveal as="li" key={w.title} delay={0.06 * n} className="rounded-2xl bg-card p-7 ring-1 ring-line">
                <p className="text-[19px] font-bold text-ink">{w.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{w.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10 rounded-[28px] bg-red-soft p-8 ring-1 ring-red/15 sm:p-10">
            <SectionHeader eyebrow="Open Roles" title="No open roles listed right now." lead={<>We still want to hear from you. Email your CV and a line about what you would like to work on to <a href={mail} className="font-semibold text-red underline underline-offset-4">{SITE.email}</a>.</>} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
