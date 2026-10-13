import type { Metadata } from "next";
import { Services } from "@/components/home/Sections";
import { HeroActions, PageHero } from "@/components/page";

export const metadata: Metadata = { title: "Services", description: "Custom software development, QA and test automation, cloud and managed support, and implementation and consulting from True North IT Consulting.", alternates: { canonical: "/services/" } };

export default function ServicesIndex() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Build. Test. Run. <span className="text-red">Advise.</span></>} lead="Four services that cover the whole life of your software, delivered by one team that builds and runs its own product every day."><HeroActions secondary={{ label: "See GRIT", href: "/grit/" }} /></PageHero>
      <div className="-mt-16"><Services /></div>
    </>
  );
}
