import Hero from "@/components/home/Hero";
import { Faq, GritShowcase, Process, Proof, Services, Stack } from "@/components/home/Sections";
import { FAQ } from "@/lib/content";
import { SITE } from "@/lib/site";

const STRUCTURED = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: SITE.name, url: SITE.origin, email: SITE.email, telephone: SITE.phone, address: SITE.offices.map((city) => ({ "@type": "PostalAddress", addressLocality: city, addressRegion: "Tamil Nadu", addressCountry: "IN" })), sameAs: [SITE.linkedin] },
    { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED) }} />
      <Hero />
      <Stack />
      <Services />
      <GritShowcase />
      <Process />
      <Proof />
      <Faq />
    </>
  );
}
