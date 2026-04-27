import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';

const TermsOfService = () => {
  return (
    <div className="pt-20 pb-24">
      <Helmet>
        <title>Terms of Service | True North IT Solutions</title>
        <meta name="description" content="Terms of Service and usage guidelines for True North IT Solutions." />
      </Helmet>

      <section className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection className="mb-12">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6">Terms of Service</h1>
          <p className="text-text-secondary">Last updated: April 2026</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="glass p-8 md:p-12 rounded-3xl border border-border-subtle prose prose-invert max-w-none">
          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8 first:mt-0">1. Acceptance of Terms</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            By accessing and using the True North IT Solutions website and our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">2. Intellectual Property Rights</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of True North IT Solutions or its content suppliers and protected by international copyright laws.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">3. Use License</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            Permission is granted to temporarily download one copy of the materials (information or software) on True North IT Solutions' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">4. Service Limitations</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            We reserve the right to refuse service, terminate accounts, or cancel services in our sole discretion. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">5. Governing Law</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising from these terms will be resolved exclusively in the courts located in Tamil Nadu, India.
          </p>

          <div className="mt-12 p-6 bg-bg-secondary rounded-2xl border border-border-subtle">
            <h4 className="text-lg font-bold text-text-primary mb-2">Contact Us</h4>
            <p className="text-text-secondary text-sm">
              If you have any questions about these Terms, please contact us at: <a href="mailto:admin@truenorthitc.com" className="text-brand-red hover:underline">admin@truenorthitc.com</a>
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default TermsOfService;
