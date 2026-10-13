import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: `Start a project with ${SITE.name}. We reply within one working day.`, alternates: { canonical: "/contact/" } };

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: SITE.whatsapp },
    { icon: MapPin, label: "Office", value: SITE.office },
  ];
  return (
    <section className="relative overflow-hidden pb-24 pt-14 sm:pt-20">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal delay={0.05}><h1 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[56px]">Let&apos;s find your <span className="text-red">true north.</span></h1></Reveal>
          <Reveal delay={0.1}><p className="mt-6 text-[18px] leading-relaxed text-ink-2">Tell us what you are building or fixing. We read every message and reply within one working day.</p></Reveal>
          <ul className="mt-10 grid gap-3">
            {channels.map((c, n) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-soft text-red"><Icon size={19} aria-hidden /></span>
                  <span><span className="block text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink-3">{c.label}</span><span className="block text-[16px] font-semibold text-ink">{c.value}</span></span>
                </>
              );
              return (
                <Reveal as="li" key={c.label} delay={0.12 + 0.04 * n}>
                  {c.href ? <a href={c.href} className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-line transition-all hover:ring-red/40">{inner}</a> : <div className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-line">{inner}</div>}
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </Container>
    </section>
  );
}
