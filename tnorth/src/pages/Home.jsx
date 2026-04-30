import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { generateOrganizationSchema, generateWebsiteSchema, generateFAQSchema } from '../utils/seoSchema';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import Accordion from '../components/Accordion';
import { servicesData } from '../data/servicesData';
import {
  ArrowRight, Code, Server, Shield, Activity,
  CheckCircle2, TrendingUp, Lightbulb, ShieldCheck, Rocket, Star,
  Cpu, Database, Cloud, Layers, Globe, Zap, MapPin,
  GitBranch, Container, Terminal, Box,
  // Replace Figma with a generic tool icon if it's missing
  PenTool,
  Layout // Often used as a replacement for "Figma/Design" icons
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────── */
/* Static data                                                  */
/* ──────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { num: '01', label: 'Consult', detail: 'Clarity & Strategy', icon: Lightbulb },
  { num: '02', label: 'Build', detail: 'Scalable Systems', icon: Code },
  { num: '03', label: 'Test', detail: 'Error-Free Solutions', icon: ShieldCheck },
  { num: '04', label: 'Implement', detail: 'Efficient Workflows', icon: Rocket },
];

const TESTIMONIAL_PREVIEW = [
  {
    name: 'Arjun Mehta',
    role: 'CTO, NovaSoft Technologies',
    quote: 'True North delivered our platform ahead of schedule and above quality expectations. Exceptional team.',
    initials: 'AM',
  },
  {
    name: 'Sarah Collins',
    role: 'Product Manager, GreenVault UK',
    quote: 'Their QA process caught critical issues we would never have found. Complete confidence before go-live.',
    initials: 'SC',
  },
  {
    name: 'Ravi Shankar',
    role: 'Director of Operations, Pinnacle Retail',
    quote: 'Six months, zero downtime. Their SLA-backed support has been a game-changer for our business.',
    initials: 'RS',
  },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

/* ──────────────────────────────────────────────────────────── */
/* Component                                                    */
/* ──────────────────────────────────────────────────────────── */
const Home = () => {
  const { t } = useTranslation();
  const { settings } = useSiteSettings();

  const faqs = [
    {
      question: "What makes True North's approach different?",
      answer: "Unlike traditional agencies, True North embeds with your team to understand precise business bottlenecks. Our structured Consult → Build → Test → Implement methodology ensures every solution is engineered for your specific operational needs."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve clients across technology, retail, e-commerce, healthcare administration, and professional services worldwide."
    },
    {
      question: "Do you provide ongoing maintenance and SLA support?",
      answer: "Yes. We offer robust SLA-backed maintenance contracts with 24/7 monitoring, rapid issue resolution, and regular performance optimisation cycles."
    },
    {
      question: "Can you build and support SaaS products?",
      answer: "Absolutely. True North is focused on architecting and exporting SaaS products that solve real-world business challenges with scalable architecture."
    }
  ];

  return (
    <>
      <Helmet>
        <title>True North IT Consultant | Global Software Engineering & Digital Infrastructure</title>
        <meta name="description" content="True North IT Consultant – World-class IT consulting, software development, QA testing, and managed IT support serving global clients." />
        <meta name="keywords" content="Software Engineering, Digital Infrastructure, SaaS Development, Cloud Native, React Developers, Node.js Experts" />
        <link rel="canonical" href="https://truenorthitc.com/" />
        <meta property="og:title" content="True North IT Consultant | Engineering Excellence" />
        <meta property="og:description" content="World-class IT consulting and software development for global businesses." />
        <meta property="og:url" content="https://truenorthitc.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://truenorthitc.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {`[
            ${JSON.stringify(generateOrganizationSchema())}, 
            ${JSON.stringify(generateWebsiteSchema())},
            ${JSON.stringify(generateFAQSchema(faqs))}
          ]`}
        </script>
      </Helmet>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col overflow-hidden bg-bg-primary">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--color-border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)] z-0 pointer-events-none" />
        {/* Glow blobs - Hidden on mobile to improve TBT performance */}
        <div className="hidden lg:block absolute top-0 right-0 w-[700px] h-[700px] bg-brand-red/8 rounded-full blur-[130px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="hidden lg:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-red/4 rounded-full blur-[90px] pointer-events-none" />
        {/* Decorative geometric shapes */}
        <div className="hidden lg:block absolute top-20 right-[15%] w-20 h-20 border border-brand-red/20 rotate-45 pointer-events-none" />
        <div className="hidden lg:block absolute bottom-32 left-[10%] w-16 h-16 border border-white/10 rounded-full pointer-events-none" />
        <div className="hidden lg:block absolute top-1/3 left-[5%] w-px h-32 bg-gradient-to-b from-brand-red/0 via-brand-red/30 to-brand-red/0 pointer-events-none" />

        {/* Main grid */}
        <div className="container mx-auto px-6 max-w-7xl relative z-10 flex-1 flex flex-col justify-center pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-8 items-center">

            {/* LEFT — Text */}
            <div className="flex flex-col">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em]">
                  True North IT Consultant
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-black leading-[0.95] tracking-tight mb-8 text-[clamp(2.8rem,6vw,5.5rem)]">
                <span className="block text-text-primary mb-5">{t('hero.title1')}</span>
                <span className="block text-gradient">{t('hero.title2')}</span>
              </h1>

              <AnimatedSection delay={0.1}>
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
                  {t('hero.subtitle')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <Link
                    to="/contact"
                    className="px-7 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_28px_var(--color-red-glow)] text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-1/3 bg-white/15 skew-x-12 -ml-10 group-hover:translate-x-[600px] transition-transform duration-700 pointer-events-none" />
                    {t('hero.ctaPrimary')} <ArrowRight size={16} className="inline ml-1" />
                  </Link>
                  <Link
                    to="/services"
                    className="px-7 py-4 glass border hover:border-brand-red/60 text-text-primary font-bold rounded-lg flex items-center justify-center transition-all duration-300 group"
                  >
                    {t('hero.ctaSecondary')}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-brand-red" />
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="flex items-center gap-6 flex-wrap">
                {[
                  { val: '25+', label: 'Years Exp.' },
                  { val: 'Founder', label: 'Led Engineering' },
                  { val: '99.9%', label: 'Uptime SLA' },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <div className="w-px h-10 bg-border-subtle" />}
                    <div>
                      <p className="text-2xl font-black text-brand-red">{item.val}</p>
                      <p className="text-[11px] uppercase tracking-widest text-text-secondary">{item.label}</p>
                    </div>
                  </React.Fragment>
                ))}
              </AnimatedSection>
            </div>

            {/* RIGHT — Dashboard Visual */}
            <AnimatedSection delay={0.3} animationType="fadeIn" className="relative hidden lg:block lg:ml-auto w-full max-w-[480px]">
              {/* Main glass card */}
              <div className="glass rounded-3xl p-3 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-0.5 bg-bg-secondary rounded-full">
                    <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-text-secondary font-mono">Live Dashboard</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3.5 mb-4">
                  {[
                    { label: 'System Uptime', value: '99.9%', pct: 99.9, from: 'from-brand-red', to: 'to-red-400' },
                    { label: 'Project Success Rate', value: '95%', pct: 95, from: 'from-orange-500', to: 'to-yellow-400' },
                    { label: 'Client Satisfaction', value: '100%', pct: 100, from: 'from-green-500', to: 'to-emerald-400' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-text-secondary">{m.label}</span>
                        <span className="text-xs font-bold text-text-primary">{m.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${m.from} ${m.to} rounded-full`} style={{ width: `${m.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-border-subtle">
                  {['Cloud Native', 'SaaS', 'Microservices', 'CI/CD', 'DevOps'].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-bg-secondary text-text-secondary text-[10px] font-mono rounded-md">{tech}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-brand-red">25+</p>
                    <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wider">Years Exp.</p>
                  </div>
                  <div className="border-x border-border-subtle">
                    <p className="text-2xl font-black text-text-primary">High</p>
                    <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wider">Precision</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-text-primary">4</p>
                    <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wider">Services</p>
                  </div>
                </div>
              </div>

              {/* Floating badge: Deployment */}
              <div className="absolute -top-18 -left-4 glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-green-500/20"
                style={{ animation: 'float 5s ease-in-out infinite' }}>
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 size={15} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary leading-none mb-0.5">Deployment Live</p>
                  <p className="text-xs text-text-secondary">2 min ago</p>
                </div>
              </div>

              {/* Floating badge: Growth */}
              <div className="absolute -bottom-18 -right-5 glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-brand-red/20"
                style={{ animation: 'float 6s ease-in-out 1s infinite' }}>
                <div className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp size={15} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary leading-none mb-0.5">+32% Revenue Growth</p>
                  <p className="text-xs text-text-secondary">This quarter</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

      </section>

      {/* ── PROCESS STRIP ──────────────────────────────────────── */}
      <div className="bg-bg-secondary border-y border-border-subtle">
        <div className="container mx-auto px-6 max-w-7xl py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[22px] left-[12.5%] right-[12.5%] h-px bg-border-subtle z-0" />
            {PROCESS_STEPS.map(({ num, label, detail, icon: Icon }) => (
              <div key={label} className="text-center relative z-10">
                <div className="w-11 h-11 mx-auto mb-3 bg-bg-primary rounded-full border border-brand-red flex items-center justify-center shadow-[0_0_12px_var(--color-red-glow)]">
                  <Icon size={17} className="text-brand-red" />
                </div>
                <div className="text-[10px] font-bold text-brand-red mb-0.5">{num}</div>
                <h3 className="text-sm font-bold text-text-primary mb-0.5">{label}</h3>
                <p className="text-[11px] text-text-secondary">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-bg-primary relative transition-colors">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">What We Do</span>
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

      {/* ── ENGINEERING EXCELLENCE BENTO ──────────────────────── */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection className="mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Why True North</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Engineering <br /><span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-text-secondary text-lg mt-4 max-w-xl leading-relaxed">
              Uncompromising quality and performance at every layer of your digital infrastructure.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatedSection delay={0.1} className="lg:col-span-2 rounded-3xl glass p-8 relative group hover:border-brand-red/30 transition-colors min-h-[260px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-3xl pointer-events-none rounded-full" />
              <Code size={40} className="text-brand-red mb-6" />
              <h3 className="text-3xl font-bold text-text-primary mb-4">Code-First Approach</h3>
              <p className="text-text-secondary text-lg max-w-lg mb-8">Raw performance engineered directly into the architecture. No bloated builders — clean, scalable code that grows with your business.</p>
              <div className="flex gap-2 flex-wrap mb-6">
                {['High Performance', 'Scalable', 'Zero Bloat', 'Production-Ready'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-full border border-brand-red/40 text-brand-red" style={{ backgroundColor: 'rgba(229,9,20,0.08)' }}>{tech}</span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="rounded-3xl overflow-hidden glass p-8 flex flex-col items-start justify-center group hover:border-brand-red/30 transition-colors min-h-[260px]">
              <Server size={40} className="text-brand-red mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-2">99.9% Uptime</h3>
              <p className="text-text-secondary">Load-balanced, redundant architectures built for fault tolerance and continuous availability.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="rounded-3xl overflow-hidden glass p-8 flex flex-col justify-center group hover:border-brand-red/30 transition-colors">
              <Shield size={40} className="text-brand-red mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-2">Security Audited</h3>
              <p className="text-text-secondary">Penetration testing and vulnerability scanning on every production release.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4} className="lg:col-span-2 rounded-3xl overflow-hidden glass p-8 flex items-center justify-between gap-6 group hover:border-brand-red/30 transition-colors">
              <div>
                <Activity size={40} className="text-brand-red mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">Real-Time Analytics</h3>
                <p className="text-text-secondary max-w-sm">Precise insights into your operational flows via custom BI dashboards tethered directly to your primary database.</p>
              </div>
              <div className="hidden sm:block w-32 h-32 relative shrink-0">
                <svg width="128" height="128" viewBox="0 0 100 100" className="w-full h-full text-brand-red/20 group-hover:text-brand-red/40 transition-colors">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="15" strokeDasharray="180" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E50914" strokeWidth="15" strokeDasharray="120 100" />
                </svg>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS TEASER ─────────────────────────────────── */}
      {settings.testimonialsVisible && (
        <section className="py-16 md:py-20 bg-bg-primary transition-colors">
          <div className="container mx-auto px-6 max-w-7xl">
            <AnimatedSection className="text-center mb-14">
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Client Stories</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                Trusted by Teams <span className="text-gradient">Worldwide</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">From startups to established enterprises — our clients achieve measurable results.</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {TESTIMONIAL_PREVIEW.map((item, idx) => (
                <AnimatedSection key={item.name} delay={0.1 * idx} className="glass rounded-2xl p-8 flex flex-col">
                  <StarRow />
                  <p className="text-text-secondary leading-relaxed mb-6 flex-grow text-sm">"{item.quote}"</p>
                  <div className="flex items-center gap-3 border-t border-border-subtle pt-5">
                    <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red font-bold text-xs shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary leading-none mb-0.5">{item.name}</p>
                      <p className="text-xs text-text-secondary">{item.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center">
              <Link to="/testimonials" className="inline-flex items-center gap-2 px-6 py-3 glass border hover:border-brand-red/60 rounded-lg text-text-primary font-semibold transition-all duration-300 group">
                View All Testimonials
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-brand-red" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Technology Stack Section */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-bg-secondary">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection className="text-center mb-16">
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">Full-Stack <span className="text-gradient">Expertise</span></h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Cloud Infrastructure', icon: Cloud, color: 'text-blue-400', desc: 'AWS, Azure, GCP' },
              { name: 'Frontend Eng.', icon: PenTool, color: 'text-pink-400', desc: 'React, Next.js, Vue' },
              { name: 'Backend Systems', icon: Zap, color: 'text-yellow-400', desc: 'Node.js, Go, Python' },
              { name: 'Database Arch.', icon: Database, color: 'text-green-500', desc: 'MongoDB, PostgreSQL' },
              { name: 'Quality Assurance', icon: Terminal, color: 'text-brand-red', desc: 'Cypress, Playwright' },
              { name: 'DevOps & Cloud', icon: Container, color: 'text-cyan-400', desc: 'Docker, Kubernetes' }
            ].map((tech, i) => (
              <AnimatedSection key={tech.name} delay={i * 0.1} className="glass p-6 rounded-2xl border border-border-subtle group hover:border-brand-red/30 transition-all duration-500 text-center">
                <div className={`mb-4 mx-auto w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center border border-border-subtle group-hover:scale-110 transition-transform duration-500 ${tech.color}`}>
                  <tech.icon size={24} />
                </div>
                <h3 className="text-sm font-bold text-text-primary mb-1">{tech.name}</h3>
                <p className="text-[10px] text-text-secondary uppercase tracking-tight font-medium">{tech.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Teaser */}
      <section className="py-16 md:py-20 bg-bg-primary border-y border-border-subtle relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <AnimatedSection className="lg:w-1/2">
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Join The Team</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-8">Build the Future <br />With <span className="text-gradient">True North</span></h2>
              <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                We are looking for visionary developers, QA experts, and strategic consultants who want to push the boundaries of digital engineering.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-3 px-8 py-4 bg-bg-primary text-text-primary border border-border-subtle font-bold rounded-xl hover:border-brand-red/50 hover:text-brand-red transition-all group"
              >
                Explore Careers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection className="lg:w-1/2 grid grid-cols-2 gap-4" delay={0.2}>
              <div className="space-y-4 pt-12">
                <div className="glass p-6 rounded-2xl border border-border-subtle hover:border-brand-red/20 transition-colors">
                  <Cpu size={24} className="text-brand-red mb-4" />
                  <h3 className="text-text-primary font-bold mb-2">Innovation Lab</h3>
                  <p className="text-xs text-text-secondary">Work on cutting-edge SaaS products.</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-border-subtle hover:border-brand-red/20 transition-colors">
                  <Globe size={24} className="text-blue-400 mb-4" />
                  <h3 className="text-text-primary font-bold mb-2">Global Impact</h3>
                  <p className="text-xs text-text-secondary">Deliver solutions to clients worldwide.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass p-6 rounded-2xl border border-border-subtle hover:border-brand-red/20 transition-colors">
                  <Layers size={24} className="text-cyan-400 mb-4" />
                  <h3 className="text-text-primary font-bold mb-2">Modern Stack</h3>
                  <p className="text-xs text-text-secondary">React 19, Node.js, and Cloud-Native.</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-border-subtle hover:border-brand-red/20 transition-colors">
                  <Zap size={24} className="text-yellow-400 mb-4" />
                  <h3 className="text-text-primary font-bold mb-2">Rapid Growth</h3>
                  <p className="text-xs text-text-secondary">Accelerated career progression tracks.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-t border-b border-border-subtle bg-bg-secondary transition-colors relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Frequently Asked Questions</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Accordion title="What makes True North's approach different?" defaultOpen>
              Unlike traditional agencies, True North embeds with your team to understand precise business bottlenecks. Our structured Consult → Build → Test → Implement methodology ensures every solution is engineered for your specific operational needs — not delivered off a template.
            </Accordion>
            <Accordion title="What industries do you serve?">
              We serve clients across technology, retail, e-commerce, healthcare administration, and professional services. Rooted in India with delivery standards built for international markets — serving clients across the UK, Europe, and North America.
            </Accordion>
            <Accordion title="Do you provide ongoing maintenance and SLA support?">
              Yes. We offer robust SLA-backed maintenance contracts with 24/7 monitoring, rapid issue resolution, and regular performance optimisation cycles — ensuring continuous reliability long after launch.
            </Accordion>
            <Accordion title="Can you build and support SaaS products?">
              Absolutely. True North is focused on architecting and exporting SaaS products that solve real-world business challenges — with scalable multi-tenant systems, payment integration, and comprehensive monitoring built in from day one.
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-red" />
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-px h-40 bg-white/20 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <AnimatedSection>
            <span className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Ready to scale?</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Let's Build Something<br />Exceptional Together.
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join businesses worldwide that trust True North to power their digital infrastructure — from strategy to execution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black text-lg font-black rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
            >
              Start Your Project <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;
