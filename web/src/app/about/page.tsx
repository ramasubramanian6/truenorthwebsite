import type { Metadata } from "next";
import { Proof } from "@/components/home/Sections";
import { HeroActions, PageHero, Prose } from "@/components/page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: `${SITE.name} is a software engineering company based in Tirunelveli, Tamil Nadu, and the makers of GRIT.`, alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={<>A small team that builds <span className="text-red">like it means it.</span></>} lead={`${SITE.name} is a software engineering company in Tirunelveli, Tamil Nadu. We build, test and run software for organisations, and we build our own products.`}><HeroActions /></PageHero>
      <Prose>
        <h2>Why True North</h2>
        <p>A compass needle always finds north, however the ground moves. That is how we want our clients to feel about their software: whatever changes around it, it keeps pointing the right way.</p>
        <h2>What We Do</h2>
        <p>We work across the life of a system: designing and building it, testing it on every change, running it in the cloud, and advising on what to build next. Our leadership brings more than sixty years of combined experience in software and IT.</p>
        <h2>Our Own Product</h2>
        <p>GRIT, our school operating system, is designed, built and run by our team. Running our own product in production keeps us honest about what software needs to survive real users, real data and real deadlines. <a href="/grit/">See how we built it</a>.</p>
      </Prose>
      <Proof />
    </>
  );
}
