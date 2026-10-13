import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${SITE.name} handles personal data.`, alternates: { canonical: "/privacy/" } };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="Last updated 13 October 2026." />
      <Prose>
        <p>This policy explains how {SITE.name} (&ldquo;we&rdquo;) collects and uses personal data through this website.</p>
        <h2>What We Collect</h2>
        <p>When you contact us, we collect what you give us: your name, email address, phone number, company and message. We use it only to reply to you and to discuss your project.</p>
        <h2>How We Use and Share It</h2>
        <ul>
          <li>We do not sell personal data.</li>
          <li>We share it only with service providers that help us run this website and our email, under terms that protect it.</li>
          <li>We may disclose it where the law requires.</li>
        </ul>
        <h2>How Long We Keep It</h2>
        <p>We keep enquiry details for as long as needed to respond and follow up, and then delete them.</p>
        <h2>Your Rights</h2>
        <p>You may ask us to access, correct or delete the personal data we hold about you.</p>
        <h2>Contact</h2>
        <p>Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with any privacy question or request.</p>
      </Prose>
    </>
  );
}
