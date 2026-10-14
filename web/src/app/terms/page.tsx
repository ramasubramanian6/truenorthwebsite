import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", description: `Terms of use for the ${SITE.name} website.`, alternates: { canonical: "/terms/" } };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" lead="Last updated 13 October 2026." />
      <Prose>
        <p>These terms govern your use of this website, operated by {SITE.name}. Work we do for clients is governed by the agreement for that work.</p>
        <h2>Using This Website</h2>
        <p>You may browse this website and contact us. You agree not to misuse it or disrupt it.</p>
        <h2>Content</h2>
        <p>The content of this website, including text, images and the True North and GRIT names and logos, belongs to {SITE.name}. Product screens show a demonstration school with fictional data.</p>
        <h2>No Warranty</h2>
        <p>We work to keep this website accurate, but it is provided as is. What we deliver is set out in each client agreement.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </Prose>
    </>
  );
}
