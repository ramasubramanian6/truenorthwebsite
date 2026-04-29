import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';

const PrivacyPolicy = () => {
  return (
    <div className="pt-20 pb-24">
      <Helmet>
        <title>Privacy Policy | True North IT Consultant</title>
        <meta name="description" content="Privacy Policy and Data Protection guidelines for True North IT Consultant." />
      </Helmet>

      <section className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection className="mb-12">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-text-secondary">Last updated: April 2026</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="glass p-8 md:p-12 rounded-3xl border border-border-subtle prose prose-invert max-w-none">
          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8 first:mt-0">1. Information We Collect</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            When you engage with True North IT Consultant, we may collect personal information such as your name, email address, company details, and phone number via our contact forms. We also automatically collect standard analytics data (IP address, browser type, pages visited) to improve our service quality.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">2. How We Use Your Information</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            The information we collect is used strictly to provide and improve our services, respond to your inquiries, process applications, and send administrative or technical notices. We do not sell, rent, or trade your personal information to third parties.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">3. Data Security</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet-based service is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">4. Cookies and Analytics</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. This helps us analyze web traffic and improve our website to better tailor it to client needs. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h3 className="text-xl font-bold text-text-primary mb-4 mt-8">5. Your Rights</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            Depending on your location (e.g., GDPR in Europe, CCPA in California), you may have the right to access, update, or delete the information we have on you. To exercise these rights, please contact us.
          </p>

          <div className="mt-12 p-6 bg-bg-secondary rounded-2xl border border-border-subtle">
            <h4 className="text-lg font-bold text-text-primary mb-2">Contact Us</h4>
            <p className="text-text-secondary text-sm">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@truenorth.com" className="text-brand-red hover:underline">support@truenorth.com</a>
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
