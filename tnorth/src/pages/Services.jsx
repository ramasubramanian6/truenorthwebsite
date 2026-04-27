import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';
import { generateBreadcrumbSchema } from '../utils/seoSchema';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Engineering Services | Software Development, QA & Cloud Infrastructure</title>
        <meta name="description" content="Discover True North's core engineering services: Custom Software Development, QA Automation, System Implementation, and 24/7 Managed Support." />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }
          ]))}
        </script>
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto border-b border-border-subtle mb-20">
        <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">What We Do</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Digital <span className="text-gradient">Services</span></h1>
        <p className="text-lg md:text-xl text-text-secondary">
          We provide high-performance technology solutions engineered to scale and built on 25+ years of industry expertise.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {servicesData.map((service, idx) => (
          <AnimatedSection key={service.id} delay={idx * 0.1}>
            <ServiceCard {...service} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="py-20 glass rounded-3xl p-10 md:p-16 mb-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-3xl pointer-events-none rounded-full" />
        <h2 className="text-3xl font-bold text-text-primary mb-6">Need a custom solution?</h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-10 text-lg">
          If your project requires specialized architecture or cross-platform integration, our senior lead architects can help design the perfect strategy.
        </p>
        <a href="/contact" className="inline-flex items-center px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_var(--color-red-glow)]">
          Talk to an Expert
        </a>
      </AnimatedSection>
    </div>
  );
};

export default Services;
