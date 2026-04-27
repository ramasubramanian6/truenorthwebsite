import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { Globe, Target, Lightbulb, CheckCircle2, Code, ShieldCheck, Rocket, User } from 'lucide-react';
import { generateBreadcrumbSchema } from '../utils/seoSchema';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>About True North | 25+ Years of Software Engineering Experience</title>
        <meta
          name="description"
          content="Learn about True North — a global technology company with 25+ years of IT expertise. Specializing in high-end software development, system architecture, and SaaS exports from Tirunelveli, India."
        />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' }
          ]))}
        </script>
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-16 py-20 items-center border-b border-border-subtle mb-20">
        <AnimatedSection className="w-full lg:w-1/2">
          <span className="text-brand-red font-bold tracking-widest uppercase text-xs mb-4 block">
            About True North
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-text-primary">
            Charting the <br />
            <span className="text-gradient">Digital Course</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-5">
            True North IT Solutions is a technology company specialising in{' '}
            <strong className="text-text-primary">scalable digital solutions</strong> and the ongoing
            support of SaaS-based products.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-5">
            While newly established, we are backed by leadership with{' '}
            <strong className="text-text-primary">over 25 years of experience</strong> in the IT
            industry — bringing deep expertise in software development, system architecture, and
            enterprise solutions.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Headquartered in Tirunelveli, Tamil Nadu, India, we serve clients worldwide with the same
            commitment to quality, clarity, and measurable outcomes.
          </p>
        </AnimatedSection>

        {/* Compass visual */}
        <AnimatedSection delay={0.2} animationType="fadeIn" className="w-full lg:w-1/2 relative">
          <div className="aspect-square max-w-sm mx-auto bg-bg-secondary rounded-3xl border border-border-subtle relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-bg-secondary to-bg-secondary rounded-3xl" />
            {/* Outer spinning ring */}
            <div
              className="absolute w-64 h-64 border border-brand-red/20 rounded-full"
              style={{ animation: 'spin 40s linear infinite' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand-red rounded-full shadow-[0_0_8px_var(--color-brand-red)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-border-subtle rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-border-subtle rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-border-subtle rounded-full" />
            </div>
            {/* Inner ring */}
            <div
              className="absolute w-40 h-40 border border-border-subtle rounded-full"
              style={{ animation: 'spin 25s linear infinite reverse' }}
            />
            {/* Core */}
            <div className="absolute flex flex-col items-center z-20">
              <span className="text-brand-red font-black text-6xl leading-none mb-1">N</span>
              <div className="w-px h-16 bg-gradient-to-b from-brand-red to-transparent" />
            </div>
          </div>
          {/* Stat badges */}
          <div className="absolute top-4 left-4 glass rounded-xl px-4 py-3 shadow-lg">
            <p className="text-xl font-black text-brand-red">25+</p>
            <p className="text-xs text-text-secondary">Years Experience</p>
          </div>
          <div className="absolute bottom-4 right-4 glass rounded-xl px-4 py-3 shadow-lg">
            <p className="text-xl font-black text-brand-red">150+</p>
            <p className="text-xs text-text-secondary">Global Clients</p>
          </div>
        </AnimatedSection>
      </div>

      {/* ── Mission / Vision / Global ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Target,    title: t('about.mission'), desc: t('about.missionDesc') },
          { icon: Lightbulb, title: t('about.vision'),  desc: t('about.visionDesc')  },
          { icon: Globe,     title: t('about.global'),  desc: t('about.globalDesc')  },
        ].map((item, idx) => (
          <AnimatedSection key={idx} delay={0.1 * idx} className="bento-card">
            <item.icon size={40} className="text-brand-red mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-4">{item.title}</h3>
            <p className="text-text-secondary leading-relaxed text-sm">{item.desc}</p>
          </AnimatedSection>
        ))}
      </div>

      {/* ── Business Positioning ──────────────────────────── */}
      <section className="py-16 mb-24 bg-bg-secondary rounded-3xl border border-border-subtle px-8 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 blur-3xl rounded-full pointer-events-none" />
        <AnimatedSection className="text-center mb-14 relative z-10">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Our Structured Approach</h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm">
            Every engagement follows our proven four-pillar methodology that ensures clarity,
            efficiency, quality, and reliability — from the first conversation to production.
          </p>
        </AnimatedSection>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 z-10">
          <div className="hidden md:block absolute top-1/2 left-[12.5%] right-[12.5%] h-px bg-brand-red/20 -translate-y-1/2 z-0" />
          {[
            {
              num: '01', label: 'Consult', icon: Lightbulb,
              desc: 'We deeply understand your business goals, challenges, and technical landscape to form a clear strategy.',
            },
            {
              num: '02', label: 'Build', icon: Code,
              desc: 'We engineer solutions using modern, production-grade technology stacks optimised for performance and scale.',
            },
            {
              num: '03', label: 'Test', icon: ShieldCheck,
              desc: 'Every deliverable passes comprehensive functional, performance, and security testing before going live.',
            },
            {
              num: '04', label: 'Implement', icon: Rocket,
              desc: 'We handle deployment, integration, and data migration — ensuring a seamless, zero-disruption go-live.',
            },
          ].map(({ num, label, icon: Icon, desc }) => (
            <AnimatedSection key={label} delay={parseInt(num) * 0.1} className="text-center relative z-10">
              <div className="w-14 h-14 mx-auto mb-5 bg-bg-primary rounded-full border border-brand-red flex items-center justify-center shadow-[0_0_12px_var(--color-red-glow)]">
                <Icon size={22} className="text-brand-red" />
              </div>
              <div className="text-xs font-bold text-brand-red mb-1">{num}</div>
              <h4 className="text-base font-bold text-text-primary mb-3">{label}</h4>
              <p className="text-text-secondary text-xs leading-relaxed">{desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Leadership Team ────────────────────────────────── */}
      <section className="mb-24">
        <AnimatedSection className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Our People
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Meet the Leadership
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm">
            Backed by decades of enterprise software engineering experience, our leadership team drives the strategic and technical vision of True North.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Arun Kumar", role: "Founder & CEO", desc: "25+ years in enterprise IT architecture and global team leadership.", icon: User },
            { name: "Priya Sharma", role: "Chief Technology Officer", desc: "Expert in scalable cloud infrastructure and multi-tenant SaaS platforms.", icon: Code },
            { name: "David Chen", role: "Lead Systems Architect", desc: "Specializes in high-performance computing, distributed systems, and security.", icon: ShieldCheck }
          ].map((leader, idx) => (
            <AnimatedSection key={leader.name} delay={idx * 0.1} className="glass p-8 rounded-3xl border border-border-subtle text-center flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-bg-secondary border-2 border-border-subtle flex items-center justify-center mb-6 overflow-hidden group-hover:border-brand-red transition-colors">
                 <leader.icon size={32} className="text-text-secondary group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{leader.name}</h3>
              <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-4">{leader.role}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{leader.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── SaaS Vision ────────────────────────────────────── */}
      <section className="mb-24">
        <AnimatedSection className="max-w-3xl">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Product Vision
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Building the Next Generation of{' '}
            <span className="text-gradient">SaaS Products</span>
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed mb-10">
            Beyond client services, True North is focused on building and exporting SaaS products
            designed to solve real-world business challenges at scale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Strong Technical Foundation', desc: 'Built on proven, production-grade architectures.' },
              { label: 'Scalable Product Thinking',   desc: 'Engineered for multi-tenancy and rapid growth.' },
              { label: 'Continuous Innovation',        desc: 'Iterative roadmaps aligned with market needs.'   },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-6">
                <CheckCircle2 size={20} className="text-brand-red mb-3" />
                <h4 className="font-bold text-text-primary mb-2 text-sm">{item.label}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default About;
