import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';

/* ──────────────────────────────────────────────────────────── */
/* Static fallback — shown when backend is offline              */
/* ──────────────────────────────────────────────────────────── */
const STATIC_TESTIMONIALS = [
  {
    _id: '1', name: 'Arjun Mehta', role: 'Chief Technology Officer',
    company: 'NovaSoft Technologies', initials: 'AM', color: '#3B82F6', rating: 5,
    content: 'True North delivered our entire web platform ahead of schedule and significantly above our quality expectations. Their code-first methodology and transparent communication made the engagement seamless from discovery to deployment.',
  },
  {
    _id: '2', name: 'Sarah Collins', role: 'Product Manager',
    company: 'GreenVault UK', initials: 'SC', color: '#8B5CF6', rating: 5,
    content: 'The QA process True North implemented caught critical production issues we would never have found on our own. Their systematic, cross-device testing approach gave us complete confidence before our go-live date.',
  },
  {
    _id: '3', name: 'Ravi Shankar', role: 'Director of Operations',
    company: 'Pinnacle Retail Group', initials: 'RS', color: '#E50914', rating: 5,
    content: 'Six months of zero downtime speaks for itself. True North\'s SLA-backed support has been a genuine game-changer for our business continuity planning. Highly recommended.',
  },
  {
    _id: '4', name: 'Leila Foster', role: 'Founder & CEO',
    company: 'StartPath Digital', initials: 'LF', color: '#10B981', rating: 5,
    content: 'We approached True North as an early-stage startup with just an idea and a deadline. They consulted, built, tested, and deployed our entire SaaS platform within two weeks. Extraordinary results.',
  },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

/* ──────────────────────────────────────────────────────────── */
const Testimonials = () => {
  /* Initialise with static data — visible immediately, even offline */
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 s timeout

        const res = await fetch(`${API_URL}/api/testimonials`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setTestimonials(data.data); // live data from MongoDB
          }
          // else: backend returned empty → keep static fallback
        }
      } catch {
        // Backend offline, unreachable, or timed out → static fallback already loaded
        console.info('[Testimonials] Backend unavailable — using static data');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Client Testimonials | True North IT Consultancy</title>
        <meta
          name="description"
          content="Read what clients say about working with True North IT Consultancy — from SaaS delivery to QA testing, deployment, and ongoing support."
        />
      </Helmet>

      {/* Header */}
      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto border-b border-border-subtle mb-20">
        <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Client Voices
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Trusted by Teams <span className="text-gradient">Worldwide</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary">
          From startups to established enterprises — here's what our clients say about working with True North.
        </p>
      </AnimatedSection>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 glass rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {testimonials.map((item, idx) => (
            <AnimatedSection
              key={item._id || idx}
              delay={0.1 * idx}
              className="glass rounded-2xl p-8 flex flex-col relative overflow-hidden group hover:border-brand-red/30 transition-all duration-300"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-red/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-red/10 transition-colors" />
              <Quote size={28} className="text-brand-red/20 mb-4" />
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow text-sm">
                "{item.content}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-border-subtle">
                <div className="flex items-center gap-3">
                  {/* Avatar: Cloudinary image first, initials fallback */}
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{
                      backgroundColor: item.color || '#E50914',
                      display: item.avatarUrl ? 'none' : 'flex',
                    }}
                  >
                    {item.initials || item.name?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary text-sm leading-none mb-0.5">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.role}</p>
                    <p className="text-xs font-medium text-brand-red">{item.company}</p>
                  </div>
                </div>
                <StarRow count={item.rating || 5} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}

      {/* CTA */}
      <AnimatedSection className="text-center mb-24 py-14 glass rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/5 via-transparent to-transparent pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 relative z-10">
          Ready to become our next <span className="text-gradient">success story?</span>
        </h2>
        <p className="text-text-secondary mb-8 max-w-xl mx-auto relative z-10 text-sm">
          Let's discuss your project, understand your goals, and chart a clear digital path forward.
        </p>
        <Link
          to="/contact"
          className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_var(--color-red-glow)]"
        >
          Start a Conversation <ArrowRight size={16} />
        </Link>
      </AnimatedSection>
    </div>
  );
};

export default Testimonials;
