import type { Metadata } from "next";
import { Proof } from "@/components/home/Sections";
import { Compass, Layers, Sparkles } from "lucide-react";
import { HeroActions, PageHero } from "@/components/page";
import { Container, Reveal } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: `${SITE.name} is a software engineering company with offices in Tirunelveli, Chennai and Coimbatore, and the makers of GRIT.`, alternates: { canonical: "/about/" } };

const STORY = [
  { icon: Compass, title: "Why True North", tone: "from-red-soft via-card to-paper-2 ring-red/15", body: <>A compass needle always finds north, however the ground moves. That is how we want our clients to feel about their software: whatever changes around it, it keeps pointing the right way.</> },
  { icon: Layers, title: "What We Do", tone: "from-paper-2 via-card to-red-soft ring-red/10", body: <>We work across the life of a system: designing and building it, testing it on every change, running it in the cloud, and advising on what to build next. Our leadership brings <strong className="font-bold text-ink">60+ years</strong> of combined experience in software and IT.</> },
  { icon: Sparkles, title: "Our Own Product", tone: "from-red-soft/80 via-card to-paper-2 ring-red/15", body: <>GRIT, our school operating system, is designed, built and run by our team. Running our own product in production keeps us honest about what software needs to survive real users, real data and real deadlines. <a href="/grit/" className="font-semibold text-red underline underline-offset-4">See how we built it</a>.</> },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={<>A small team that builds <span className="text-red">like it means it.</span></>} lead={`${SITE.name} is a software engineering company with offices in Tirunelveli, Chennai and Coimbatore, Tamil Nadu. We build, test and run software for organisations, and we build our own products.`}><HeroActions /></PageHero>
      <Container className="pb-24">
        <ul className="grid gap-5 lg:grid-cols-3">
          {STORY.map((c, n) => {
            const Icon = c.icon;
            return (
              <Reveal as="li" key={c.title} delay={0.06 * n} className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br p-8 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(211,8,18,0.35)] sm:p-9 ${c.tone}`}>
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red via-red/60 to-transparent" />
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--red-glow)] blur-3xl transition-opacity group-hover:opacity-100 opacity-70" />
                <span aria-hidden className="pointer-events-none absolute -bottom-8 right-4 text-[150px] font-black leading-none text-red/[0.04]">0{n + 1}</span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-card text-red shadow-sm ring-1 ring-red/15"><Icon size={22} aria-hidden /></span>
                <h2 className="relative mt-6 text-[24px] font-bold tracking-[-0.02em] text-ink">{c.title}</h2>
                <p className="relative mt-3 text-[16px] leading-[1.7] text-ink-2">{c.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
      <Proof />
    </>
  );
}
