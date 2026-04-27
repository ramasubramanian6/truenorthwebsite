import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { generateOrganizationSchema, generateWebsiteSchema } from '../utils/seoSchema';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import StatBadge from '../components/StatBadge';
import Accordion from '../components/Accordion';
import { servicesData } from '../data/servicesData';
import { ArrowRight, ArrowDown, Activity, Code, Server, Shield } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>True North | {t('hero.title2')}</title>
        <meta name="description" content={t('hero.subtitle')} />
        <script type="application/ld+json">
          {`[${JSON.stringify(generateOrganizationSchema())}, ${JSON.stringify(generateWebsiteSchema())}]`}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--color-border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
        <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-brand-red/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none transition-colors" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center relative">
            
            {/* Floating Stat Badges injected for Premium visual info density */}
            <StatBadge title="Uptime SLA" value="99.9%" delay={0.5} className="top-10 -left-10 lg:-left-32 hidden md:flex" />
            <StatBadge title="Global Clients" value="150+" delay={0.7} className="bottom-20 -right-10 lg:-right-32 hidden md:flex" />

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-text-primary leading-[1.1]">
              {t('hero.title1')} <br/><span className="text-gradient">{t('hero.title2')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link 
                to="/services" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white text-lg font-bold rounded hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_var(--color-red-glow)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-1/4 bg-white/20 skew-x-12 -ml-10 group-hover:translate-x-[500px] transition-transform duration-700" />
                {t('hero.ctaPrimary')}
              </Link>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-4 glass border hover:border-brand-red text-text-primary text-lg font-bold rounded flex items-center justify-center transition-all duration-300 group"
              >
                {t('hero.ctaSecondary')} <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform text-brand-red" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection delay={0.8} animationType="fadeIn" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary animate-bounce cursor-default z-20">
          <ArrowDown size={24} />
        </AnimatedSection>
      </section>

      {/* Services Section with Bento Style injection */}
      <section className="py-24 bg-bg-secondary relative transition-colors">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('services.heading')}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">{t('services.subheading')}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, idx) => (
              <AnimatedSection key={service.id} delay={0.1 * idx}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid: Premium Info-Rich Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
           <AnimatedSection className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Engineering <br/><span className="text-gradient">Excellence</span></h2>
           </AnimatedSection>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* Bento Box 1: Large Span */}
              <AnimatedSection delay={0.1} className="lg:col-span-2 rounded-3xl overflow-hidden glass p-10 relative group hover:border-brand-red/30 transition-colors">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-3xl pointer-events-none rounded-full" />
                 <Code size={40} className="text-brand-red mb-6" />
                 <h3 className="text-3xl font-bold text-text-primary mb-4">Code-First Approach</h3>
                 <p className="text-text-secondary text-lg max-w-lg mb-8">We engineer raw performance directly into the architecture. Avoiding bloated builders ensures your infrastructure scales beautifully.</p>
                 <div className="flex gap-2 font-mono text-sm text-text-secondary mt-auto">
                    <span className="bg-bg-primary px-3 py-1 rounded">React</span>
                    <span className="bg-bg-primary px-3 py-1 rounded">Node.js</span>
                    <span className="bg-bg-primary px-3 py-1 rounded">Kubernetes</span>
                 </div>
              </AnimatedSection>

              {/* Bento Box 2 */}
              <AnimatedSection delay={0.2} className="rounded-3xl overflow-hidden glass p-10 flex flex-col items-start justify-center group hover:border-brand-red/30 transition-colors">
                 <Server size={40} className="text-brand-red mb-4" />
                 <h3 className="text-2xl font-bold text-text-primary mb-2">99.9% Uptime</h3>
                 <p className="text-text-secondary">Load balanced, redundant architectures built for fault tolerance.</p>
              </AnimatedSection>

              {/* Bento Box 3 */}
              <AnimatedSection delay={0.3} className="rounded-3xl overflow-hidden glass p-10 flex flex-col justify-end relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwdjhINFYweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] hover:border-brand-red/30 transition-colors">
                 <Shield size={40} className="text-brand-red mb-4" />
                 <h3 className="text-2xl font-bold text-text-primary mb-2">Security Audited</h3>
                 <p className="text-text-secondary">Robust penetration testing on every release.</p>
              </AnimatedSection>

              {/* Bento Box 4 */}
              <AnimatedSection delay={0.4} className="lg:col-span-2 rounded-3xl overflow-hidden glass p-10 flex items-center justify-between group hover:border-brand-red/30 transition-colors">
                 <div>
                    <Activity size={40} className="text-brand-red mb-4" />
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Real-Time Analytics</h3>
                    <p className="text-text-secondary max-w-sm">Gain precise insights into your operational flows with custom BI dashboards directly tethered to your primary database.</p>
                 </div>
                 <div className="hidden sm:block w-32 h-32 relative">
                    {/* Placeholder for dynamic graph/chart */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-brand-red/20 group-hover:text-brand-red/40 transition-colors">
                       <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="15" strokeDasharray="180" />
                       <circle cx="50" cy="50" r="40" fill="none" stroke="#E50914" strokeWidth="15" strokeDasharray="120 100" className="drop-shadow-[0_0_5px_var(--color-brand-red)]" />
                    </svg>
                 </div>
              </AnimatedSection>
           </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-bg-secondary border-t border-b border-border-subtle transition-colors">
         <div className="container mx-auto px-6 max-w-3xl">
            <AnimatedSection className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
               <Accordion title="What makes True North's development process different?" defaultOpen>
                 Unlike agencies that pump out boilerplate code, True North embeds with your team to understand precise business logic bottlenecks. We build custom architectures (React/Node landscapes) optimized precisely for your localized load demands.
               </Accordion>
               <Accordion title="Do you provide ongoing maintenance and QA?">
                 Yes. We don't just ship and disappear. We offer robust SLA contracts, conducting automated end-to-end testing (using tools like Cypress) across every CI/CD cycle to guarantee 99.9% uptime.
               </Accordion>
               <Accordion title="Are you equipped to handle global scale?">
                 Absolutely. Our backend architectures employ dynamic edge-caching and distributed Kubernetes clusters to render data instantly regardless of whether the user is in Mumbai or New York.
               </Accordion>
            </AnimatedSection>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-brand-red mb-0" />
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwdjhINFYweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-30" />
         
         <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6">Ready to scale your business?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
                Join hundreds of successful companies globally that trust True North to power their digital infrastructure.
              </p>
              <Link 
                to="/contact" 
                className="inline-block px-10 py-5 bg-black text-white text-lg font-bold rounded hover:bg-gray-900 transition-transform shadow-2xl hover:scale-105"
              >
                Let's Work Together
              </Link>
            </AnimatedSection>
         </div>
      </section>
    </>
  );
};

export default Home;
