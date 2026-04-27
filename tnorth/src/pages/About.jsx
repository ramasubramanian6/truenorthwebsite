import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import StatBadge from '../components/StatBadge';
import { Globe, Shield, Target } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>{t('nav.about')} Us | True North</title>
        <meta name="description" content={t('about.missionDesc')} />
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-16 py-20 items-center border-b border-border-subtle mb-16">
        <AnimatedSection className="w-full lg:w-1/2">
          <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-4 block">About True North</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-text-primary">
            Charting the <br/><span className="text-gradient">Digital Course</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-6">
            Located in Tirunelveli, Tamil Nadu, India, True North provides cost-effective, high-quality digital services for companies worldwide. We believe in bridging the gap between raw technological capability and actionable business results.
          </p>
          <p className="text-xl text-text-secondary leading-relaxed">
            Our team comprises dedicated engineers, strategists, and designers focused on accelerating growth for startups and established enterprises through modern web architecture and rigorous software standards.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2} animationType="fadeIn" className="w-full lg:w-1/2 relative">
           <StatBadge title="Developers" value="50+" className="top-5 left-5 z-30" delay={0.5} />
           <StatBadge title="Countries" value="12" className="bottom-10 right-10 z-30" delay={0.7} />
           
           <div className="aspect-square bg-bg-secondary rounded-2xl border border-border-subtle relative flex items-center justify-center p-10 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-bg-secondary to-bg-secondary opacity-70 border border-border-subtle rounded-2xl" />
             <div className="w-64 h-64 border-4 border-brand-red/20 rounded-full flex flex-col items-center justify-center relative z-10 animate-[spin_60s_linear_infinite]">
                <div className="w-4 h-4 rounded-full bg-brand-red absolute -top-2" />
                <div className="w-0.5 h-full bg-brand-red/10 absolute" />
                <div className="w-full h-0.5 bg-brand-red/10 absolute" />
             </div>
             <div className="absolute flex items-center justify-center flex-col z-20 pointer-events-none">
                 <span className="text-brand-red font-bold text-4xl mb-2">N</span>
                 <div className="w-2 h-16 bg-gradient-to-t from-transparent to-brand-red rounded-t-full" />
             </div>
           </div>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Target, title: t('about.mission'), desc: t('about.missionDesc') + " making elite engineering accessible and cost-effective for modern businesses." },
          { icon: Shield, title: t('about.vision'), desc: "To become the globally trusted compass for digital transformation, setting the benchmark for quality and reliability." },
          { icon: Globe, title: t('about.global'), desc: "While rooted in India, our standards, communication, and delivery mechanisms are built to serve a diverse, worldwide clientele." }
        ].map((item, idx) => (
          <AnimatedSection key={idx} delay={0.3 + (idx * 0.1)} className="bento-card">
            <item.icon size={40} className="text-brand-red mb-6" />
            <h3 className="text-2xl font-bold text-text-primary mb-4">{item.title}</h3>
            <p className="text-text-secondary leading-relaxed">{item.desc}</p>
          </AnimatedSection>
        ))}
      </div>

      {/* Information-Rich Feature: Company Timeline */}
      <section className="py-16 mb-20 bg-bg-secondary rounded-3xl border border-border-subtle px-6 md:px-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-3xl rounded-full pointer-events-none" />
         <AnimatedSection className="text-center mb-16 relative z-10">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Our Journey</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Milestones that map the trajectory of our global presence.</p>
         </AnimatedSection>

         <div className="relative border-l border-brand-red/30 pl-8 ml-4 md:pl-12 md:ml-12 space-y-12 z-10">
            {[
              { year: "Phase 1 - Inception", text: "Founded in Tirunelveli with a vision to democratize elite software architecture. Began serving local SMEs." },
              { year: "Phase 2 - Expansion", text: "Scaled our custom React & Node frameworks. Onboarded our first major European and North American clients." },
              { year: "Phase 3 - Global Presence", text: "Currently deploying highly concurrent, multi-region web applications and CRM systems for enterprise organizations globally." }
            ].map((node, i) => (
               <AnimatedSection key={i} delay={0.1 * i} className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-brand-red -left-[39px] md:-left-[55px] ring-4 ring-bg-primary" />
                  <h3 className="text-xl font-bold text-white mb-2 py-1 px-3 bg-brand-red inline-block rounded text-sm tracking-wide">{node.year}</h3>
                  <p className="text-text-secondary mt-3 max-w-2xl leading-relaxed text-lg">{node.text}</p>
               </AnimatedSection>
            ))}
         </div>
      </section>
    </div>
  );
};

export default About;
