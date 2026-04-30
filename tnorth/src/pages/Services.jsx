import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Globe2, Users, Award, MapPin } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from '../utils/seoSchema';

const LOCATIONS = ['Tirunelveli', 'Chennai', 'Dubai', 'Worldwide'];

const Services = () => {
  const pageTitle =
    'Engineering Excellence & Digital Transformation Services | True North IT Consultancy';
  const pageDesc =
    'True North IT Consultancy delivers world-class software engineering, QA automation, and strategic IT consulting. Built on 60+ years of combined hands-on IT experience for global enterprises and scaling businesses.';

  return (
    <div className="services-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="IT Consultancy, Software Development, Web Development, Digital Transformation, Managed IT Support, QA Testing, Enterprise Software" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://truenorthitc.com/services" />
        <link rel="canonical" href="https://truenorthitc.com/services" />
        <script type="application/ld+json">{JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]))}</script>
        <script type="application/ld+json">{JSON.stringify(generateOrganizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(generateLocalBusinessSchema())}</script>
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="services-hero">
        <div className="services-hero__inner container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection className="services-hero__content">
            <span className="services-hero__eyebrow">What We Do</span>
            <h1 className="services-hero__title">
              Engineering <span className="text-gradient">Excellence</span>
              <br className="hidden sm:block" />
              <span className="services-hero__title-sub">
                World-Class Digital Infrastructure
              </span>
            </h1>
            <p className="services-hero__desc">
              True North IT Consultancy delivers high-performance technology solutions built on
              60+ years of combined hands-on IT experience. We architect scalable, secure, and future-ready
              systems for enterprises and high-growth companies worldwide.
            </p>
            <div className="services-hero__actions">
              <Link to="/contact" className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-ghost">
                Our Story
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────── */}
      <section className="services-grid-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection className="section-header">
            <span className="section-eyebrow">Our Expertise</span>
            <h2 className="section-title">
              Comprehensive <span className="text-gradient">Service Portfolio</span>
            </h2>
            <p className="section-desc">
              From strategic consulting to hands-on implementation — every service we deliver
              is backed by decades of technology leadership and a commitment to measurable
              impact.
            </p>
          </AnimatedSection>

          <div className="services-grid">
            {servicesData.map((service, idx) => (
              <AnimatedSection key={service.id} delay={idx * 0.08}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Impact Strip ──────────────────────────────────── */}
      <section className="services-locations">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection>
            <div className="services-locations__inner">
              <div className="services-locations__text">
                <Globe2 size={28} className="text-brand-red" />
                <div>
                  <h2 className="services-locations__heading">
                    Enterprise-Grade Solutions for a Global Market
                  </h2>
                  <p className="services-locations__sub">
                    Our engineering model is built for scale — delivering high-performance digital 
                    products across North America, Europe, the Middle East, and Asia.
                  </p>
                </div>
              </div>
              <Link to="/contact" className="btn-primary shrink-0">
                Talk to an Expert <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="services-cta-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatedSection className="services-cta">
            <div className="services-cta__glow" />
            <span className="section-eyebrow">Let's Work Together</span>
            <h2 className="services-cta__title">
              Need a Custom Technology Solution?
            </h2>
            <p className="services-cta__desc">
              Our senior architects and consultants will design the right approach for your
              specific industry, scale, and objectives — wherever you are in the world.
            </p>
            <div className="services-cta__actions">
              <Link to="/contact" className="btn-primary">
                Talk to an Expert <ArrowRight size={18} />
              </Link>
              <Link to="/case-studies" className="btn-ghost">
                See Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Inline Styles ────────────────────────────────────────── */}
      <style>{`
        /* ─── Hero ─── */
        .services-hero {
          padding: 6rem 0 4rem;
          background: linear-gradient(160deg, var(--color-bg-primary) 60%, rgba(var(--color-red-rgb, 220 38 38) / 0.04) 100%);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .services-hero__inner { text-align: center; }
        .services-hero__locations {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 0.5rem; margin-bottom: 1.5rem;
        }
        .services-hero__loc-badge {
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(220,38,38,0.08); color: var(--color-brand-red);
          border: 1px solid rgba(220,38,38,0.2); border-radius: 9999px;
          padding: 4px 12px; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .services-hero__eyebrow {
          display: block; color: var(--color-brand-red);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .services-hero__title {
          font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900;
          line-height: 1.1; letter-spacing: -0.02em;
          color: var(--color-text-primary); margin-bottom: 0.5rem;
        }
        .services-hero__title-sub {
          display: block; font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 500; color: var(--color-text-secondary);
          letter-spacing: 0.01em; margin-top: 0.4rem;
        }
        .services-hero__desc {
          max-width: 680px; margin: 1.5rem auto 2.5rem;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--color-text-secondary); line-height: 1.75;
        }
        .services-hero__actions {
          display: flex; flex-wrap: wrap; gap: 1rem;
          justify-content: center; align-items: center;
        }

        /* ─── Services Grid ─── */
        .services-grid-section { padding: 5rem 0; }
        .section-header {
          text-align: center; max-width: 680px;
          margin: 0 auto 4rem;
        }
        .section-eyebrow {
          display: block; color: var(--color-brand-red);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900; letter-spacing: -0.02em;
          color: var(--color-text-primary); margin-bottom: 1rem;
        }
        .section-desc {
          font-size: 1.05rem; color: var(--color-text-secondary);
          line-height: 1.75;
        }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ─── Locations Strip ─── */
        .services-locations {
          padding: 3rem 0;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .services-locations__inner {
          display: flex; flex-direction: column;
          gap: 1.5rem; align-items: flex-start;
        }
        @media (min-width: 768px) {
          .services-locations__inner {
            flex-direction: row; align-items: center; justify-content: space-between;
          }
        }
        .services-locations__text {
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .services-locations__heading {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 800; color: var(--color-text-primary);
          margin-bottom: 0.4rem;
        }
        .services-locations__sub {
          font-size: 0.9rem; color: var(--color-text-secondary);
          max-width: 520px; line-height: 1.6;
        }

        /* ─── CTA ─── */
        .services-cta-section { padding: 5rem 0 6rem; }
        .services-cta {
          position: relative; overflow: hidden;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 2rem; padding: 4rem 2rem;
          text-align: center;
        }
        @media (min-width: 768px) { .services-cta { padding: 5rem 4rem; } }
        .services-cta__glow {
          position: absolute; top: -80px; right: -80px;
          width: 320px; height: 320px;
          background: rgba(220,38,38,0.06);
          border-radius: 50%; filter: blur(60px);
          pointer-events: none;
        }
        .services-cta__title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900; color: var(--color-text-primary);
          letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .services-cta__desc {
          font-size: 1.05rem; color: var(--color-text-secondary);
          max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.75;
        }
        .services-cta__actions {
          display: flex; flex-wrap: wrap; gap: 1rem;
          justify-content: center; align-items: center;
        }

        /* ─── Shared Buttons ─── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; background: var(--color-brand-red);
          color: #fff; font-weight: 700; border-radius: 0.75rem;
          font-size: 0.95rem; transition: all 0.25s;
          box-shadow: 0 0 24px var(--color-red-glow, rgba(220,38,38,0.3));
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #b91c1c; transform: translateY(-2px) scale(1.02);
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 0.75rem; font-size: 0.95rem; font-weight: 600;
          transition: all 0.25s; text-decoration: none;
        }
        .btn-ghost:hover {
          color: var(--color-text-primary);
          border-color: var(--color-text-secondary);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default Services;
