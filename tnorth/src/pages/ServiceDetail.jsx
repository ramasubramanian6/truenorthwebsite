import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, CheckSquare, TrendingUp, Check, ArrowUpRight,
  ChevronDown, ChevronUp, MapPin, BarChart2, Phone, Mail,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { servicesData } from '../data/servicesData';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from '../utils/seoSchema';

/* ── FAQ Accordion ───────────────────────────────────────────── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`sd-faq-item${open ? ' sd-faq-item--open' : ''}`}>
      <button
        className="sd-faq-item__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="sd-faq-item__body">{answer}</div>}
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────── */
const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === id);

  if (!service) return <Navigate to="/404" replace />;

  const IconComponent = LucideIcons[service.icon] || LucideIcons.Briefcase;
  const canonical = `https://truenorthitc.com/services/${service.id}`;

  return (
    <div className="sd-page">
      <Helmet>
        <title>{service.metaTitle || `${service.title} | True North IT Consultancy`}</title>
        <meta name="description" content={service.metaDescription || service.short} />
        <meta
          name="keywords"
          content={`${service.title}, IT Consultancy, True North IT, Enterprise Software, Engineering Excellence`}
        />
        <meta property="og:title" content={service.metaTitle || service.title} />
        <meta property="og:description" content={service.metaDescription || service.short} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.id}` },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateServiceSchema(service))}
        </script>
        {service.faqs && (
          <script type="application/ld+json">
            {JSON.stringify(generateFAQSchema(service.faqs))}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      </Helmet>

      {/* ── Hero / Header ──────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="sd-hero__inner container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection>
            {/* Breadcrumb */}
            <nav className="sd-breadcrumb" aria-label="Breadcrumb">
              <Link to="/services" className="sd-breadcrumb__link">Services</Link>
              <span className="sd-breadcrumb__sep">/</span>
              <span className="sd-breadcrumb__current">{service.title}</span>
            </nav>

            <div className="sd-hero__title-row">
              <div className="sd-hero__icon-wrap">
                <IconComponent size={36} />
              </div>
              <div>
                <h1 className="sd-hero__title">{service.title}</h1>
                <p className="sd-hero__subtitle">{service.short}</p>
              </div>
            </div>

            <p className="sd-hero__overview">{service.overview}</p>

            <div className="sd-hero__actions">
              <Link to="/contact" className="sd-btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="sd-btn-ghost">
                All Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features & Benefits ────────────────────────────────── */}
      <section className="sd-features-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="sd-features-grid">
            {/* Features */}
            <AnimatedSection delay={0.05} className="sd-card">
              <h2 className="sd-card__heading">
                <CheckSquare size={22} className="text-brand-red" />
                Service Features
              </h2>
              <ul className="sd-checklist">
                {service.features.map((feat, i) => (
                  <li key={i} className="sd-checklist__item">
                    <div className="sd-checklist__dot">
                      <Check size={11} className="text-brand-red" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection delay={0.1} className="sd-card">
              <h2 className="sd-card__heading">
                <TrendingUp size={22} className="text-brand-red" />
                Business Benefits
              </h2>
              <ul className="sd-checklist">
                {service.benefits.map((ben, i) => (
                  <li key={i} className="sd-checklist__item">
                    <div className="sd-checklist__dot">
                      <ArrowUpRight size={11} className="text-brand-red" />
                    </div>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Long Description ───────────────────────────────────── */}
      {service.longDescription && (
        <section className="sd-about-section">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <AnimatedSection className="sd-about">
              <div className="sd-about__glow" />
              <span className="sd-eyebrow">Why True North</span>
              <h2 className="sd-about__title">
                Engineering Excellence for {service.title}
              </h2>
              <p className="sd-about__body">{service.longDescription}</p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── Process ────────────────────────────────────────────── */}
      <section className="sd-process-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection delay={0.05} className="sd-process-wrap">
            <div className="sd-process-wrap__glow" />
            <div className="sd-process-wrap__header">
              <span className="sd-eyebrow">Our Process</span>
              <h2 className="sd-process-wrap__title">Structured Implementation</h2>
              <p className="sd-process-wrap__sub">
                A transparent, milestone-driven approach that keeps you informed and in control
                at every stage.
              </p>
            </div>
            <div className="sd-process-grid">
              {service.process.map((step, i) => (
                <div key={i} className="sd-process-step">
                  <div className="sd-process-step__num">0{i + 1}</div>
                  <p className="sd-process-step__label">{step}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="sd-faq-section">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <AnimatedSection>
              <div className="sd-faq-header">
                <span className="sd-eyebrow">FAQ</span>
                <h2 className="sd-faq-title">Frequently Asked Questions</h2>
              </div>
              <div className="sd-faq-list">
                {service.faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── Contact CTA ────────────────────────────────────────── */}
      <section className="sd-cta-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection className="sd-cta">
            <div className="sd-cta__glow" />
            <span className="sd-eyebrow">Let's Get Started</span>
            <h2 className="sd-cta__title">
              Ready to Scale Your Digital Presence?
            </h2>
            <p className="sd-cta__desc">
              Let's discuss how our {service.title} expertise can be tailored for your specific business
              requirements and global objectives.
            </p>
            <div className="sd-cta__actions">
              <Link to="/contact" className="sd-btn-primary">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <a href="tel:+919566556056" className="sd-cta__contact-link">
                <Phone size={16} /> +91 95665 56056
              </a>
              <a href="mailto:support@truenorth.com" className="sd-cta__contact-link">
                <Mail size={16} /> support@truenorth.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Inline Styles ──────────────────────────────────────── */}
      <style>{`
        /* ─── Page ─── */
        .sd-page { padding-bottom: 5rem; }
        .sd-eyebrow {
          display: block; color: var(--color-brand-red);
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        /* ─── Hero ─── */
        .sd-hero {
          padding: 5rem 0 4rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: linear-gradient(160deg, var(--color-bg-primary) 60%, rgba(220,38,38,0.03) 100%);
        }
        .sd-breadcrumb {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
        }
        .sd-breadcrumb__link { color: var(--color-brand-red); text-decoration: none; }
        .sd-breadcrumb__link:hover { text-decoration: underline; }
        .sd-breadcrumb__sep { color: var(--color-text-secondary); opacity: 0.4; }
        .sd-breadcrumb__current { color: var(--color-text-secondary); }
        .sd-hero__locations {
          display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;
        }
        .sd-loc-badge {
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(220,38,38,0.07); color: var(--color-brand-red);
          border: 1px solid rgba(220,38,38,0.18); border-radius: 9999px;
          padding: 3px 10px; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .sd-hero__title-row {
          display: flex; flex-direction: column; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 640px) {
          .sd-hero__title-row { flex-direction: row; align-items: flex-start; gap: 1.5rem; }
        }
        .sd-hero__icon-wrap {
          width: 72px; height: 72px; flex-shrink: 0;
          background: var(--color-bg-secondary);
          color: var(--color-brand-red);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1.25rem;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .sd-hero__title {
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 900; color: var(--color-text-primary);
          letter-spacing: -0.02em; line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .sd-hero__subtitle {
          font-size: 1.05rem; color: var(--color-text-secondary);
          line-height: 1.6; max-width: 680px;
        }
        .sd-hero__overview {
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          color: var(--color-text-secondary); line-height: 1.8;
          max-width: 760px; margin-bottom: 2.5rem;
          padding: 1.25rem 1.5rem;
          border-left: 3px solid var(--color-brand-red);
          background: rgba(220,38,38,0.04); border-radius: 0 0.5rem 0.5rem 0;
        }
        .sd-hero__actions {
          display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;
        }

        /* ─── Features ─── */
        .sd-features-section { padding: 4rem 0; }
        .sd-features-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .sd-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .sd-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1.25rem; padding: 2rem;
          transition: border-color 0.3s;
        }
        .sd-card:hover { border-color: rgba(220,38,38,0.25); }
        .sd-card__heading {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 1.1rem; font-weight: 800;
          color: var(--color-text-primary); margin-bottom: 1.5rem;
        }
        .sd-checklist { display: flex; flex-direction: column; gap: 0.85rem; list-style: none; padding: 0; margin: 0; }
        .sd-checklist__item {
          display: flex; align-items: flex-start; gap: 0.85rem;
          font-size: 0.95rem; color: var(--color-text-secondary);
          line-height: 1.5;
        }
        .sd-checklist__dot {
          width: 22px; height: 22px; flex-shrink: 0;
          background: rgba(220,38,38,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }

        /* ─── About / Long Desc ─── */
        .sd-about-section {
          padding: 4rem 0;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .sd-about {
          position: relative; overflow: hidden;
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1.5rem; padding: 2.5rem;
        }
        @media (min-width: 768px) { .sd-about { padding: 3.5rem; } }
        .sd-about__glow {
          position: absolute; top: -60px; right: -60px;
          width: 250px; height: 250px;
          background: rgba(220,38,38,0.05);
          border-radius: 50%; filter: blur(50px);
          pointer-events: none;
        }
        .sd-about__title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 900; color: var(--color-text-primary);
          margin-bottom: 1.25rem;
        }
        .sd-about__body {
          font-size: 1rem; color: var(--color-text-secondary);
          line-height: 1.85; margin-bottom: 1.5rem; max-width: 740px;
        }
        .sd-about__locations { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        /* ─── Process ─── */
        .sd-process-section { padding: 4rem 0; }
        .sd-process-wrap {
          position: relative; overflow: hidden;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 2rem;
          padding: 3rem 2rem;
        }
        @media (min-width: 768px) { .sd-process-wrap { padding: 4rem; } }
        .sd-process-wrap__glow {
          position: absolute; top: -80px; right: -80px;
          width: 300px; height: 300px;
          background: rgba(220,38,38,0.05);
          border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .sd-process-wrap__header { text-align: center; margin-bottom: 3rem; }
        .sd-process-wrap__title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 900; color: var(--color-text-primary);
          margin-bottom: 0.75rem;
        }
        .sd-process-wrap__sub {
          font-size: 0.95rem; color: var(--color-text-secondary);
          max-width: 500px; margin: 0 auto; line-height: 1.7;
        }
        .sd-process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1rem;
        }
        .sd-process-step {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1rem; padding: 1.5rem 1rem;
          text-align: center;
          transition: border-color 0.3s, transform 0.3s;
        }
        .sd-process-step:hover {
          border-color: rgba(220,38,38,0.3);
          transform: translateY(-4px);
        }
        .sd-process-step__num {
          font-size: 2rem; font-weight: 900;
          color: rgba(220,38,38,0.15);
          margin-bottom: 0.75rem;
          transition: color 0.4s;
        }
        .sd-process-step:hover .sd-process-step__num { color: var(--color-brand-red); }
        .sd-process-step__label {
          font-size: 0.85rem; font-weight: 700;
          color: var(--color-text-primary); line-height: 1.3;
        }

        /* ─── FAQ ─── */
        .sd-faq-section {
          padding: 4rem 0;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .sd-faq-header { text-align: center; margin-bottom: 2.5rem; }
        .sd-faq-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 900; color: var(--color-text-primary);
        }
        .sd-faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .sd-faq-item {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1rem; overflow: hidden;
          transition: border-color 0.3s;
        }
        .sd-faq-item--open { border-color: rgba(220,38,38,0.3); }
        .sd-faq-item__trigger {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: none; border: none; cursor: pointer;
          font-size: 0.95rem; font-weight: 700;
          color: var(--color-text-primary); text-align: left;
          transition: color 0.2s;
        }
        .sd-faq-item__trigger:hover { color: var(--color-brand-red); }
        .sd-faq-item__body {
          padding: 0 1.5rem 1.25rem;
          font-size: 0.92rem; color: var(--color-text-secondary);
          line-height: 1.75;
        }

        /* ─── CTA ─── */
        .sd-cta-section { padding: 5rem 0; }
        .sd-cta {
          position: relative; overflow: hidden;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 2rem; padding: 4rem 2rem; text-align: center;
        }
        @media (min-width: 768px) { .sd-cta { padding: 5rem 4rem; } }
        .sd-cta__glow {
          position: absolute; top: -80px; right: -80px;
          width: 300px; height: 300px;
          background: rgba(220,38,38,0.06);
          border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .sd-cta__title {
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          font-weight: 900; color: var(--color-text-primary);
          margin-bottom: 1rem;
        }
        .sd-cta__desc {
          font-size: 1rem; color: var(--color-text-secondary);
          max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.8;
        }
        .sd-cta__actions {
          display: flex; flex-wrap: wrap; gap: 1rem;
          justify-content: center; align-items: center;
        }
        .sd-cta__contact-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: var(--color-text-secondary);
          font-size: 0.9rem; font-weight: 600; text-decoration: none;
          transition: color 0.2s;
        }
        .sd-cta__contact-link:hover { color: var(--color-brand-red); }

        /* ─── Shared Buttons ─── */
        .sd-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; background: var(--color-brand-red);
          color: #fff; font-weight: 700; border-radius: 0.75rem;
          font-size: 0.95rem; transition: all 0.25s;
          box-shadow: 0 0 24px var(--color-red-glow, rgba(220,38,38,0.3));
          text-decoration: none;
        }
        .sd-btn-primary:hover { background: #b91c1c; transform: translateY(-2px) scale(1.02); }
        .sd-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 0.75rem; font-size: 0.95rem; font-weight: 600;
          transition: all 0.25s; text-decoration: none;
        }
        .sd-btn-ghost:hover {
          color: var(--color-text-primary);
          border-color: var(--color-text-secondary);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
