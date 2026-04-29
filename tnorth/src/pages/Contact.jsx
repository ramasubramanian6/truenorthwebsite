import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import {
  MapPin, Mail, Phone, MessageCircle, Send,
  CheckCircle2, AlertCircle, WifiOff,
  Globe, Zap, Shield, Clock, ArrowRight, ExternalLink
} from 'lucide-react';
import { API_URL } from '../config/api';
import { generateBreadcrumbSchema } from '../utils/seoSchema';

/* ──────────────────────────────────────────────────────────── */
const DIRECT_UPLINKS = [
  {
    id: 'whatsapp',
    title: 'Instant Uplink',
    desc: 'Rapid support via WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500',
    hover: 'hover:border-green-500/50',
    link: 'https://wa.me/919566556056?text=Hello%2C%20I%20am%20interested%20in%20your%20services.'
  },
  {
    id: 'email',
    title: 'Protocol Entry',
    desc: 'Formal project boarding',
    icon: Mail,
    color: 'bg-brand-red',
    hover: 'hover:border-brand-red/50',
    link: '#briefing'
  }
];

/* ──────────────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', message: '',
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subject = params.get('subject');
    if (subject) {
      setFormData(prev => ({ ...prev, message: subject + '\n\n' }));
    }
  }, [location.search]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ state: 'success', message: data.message || 'Mission brief received. We will respond within 24 hours.' });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus({ state: 'error', message: data.message || 'System error. Please retry or use direct uplink.' });
      }
    } catch {
      setStatus({ state: 'offline', message: 'Backend systems unreachable. Please use immediate uplinks.' });
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen pb-24 overflow-x-hidden relative">
      <Helmet>
        <title>Contact & Support | True North IT Consultant Mission Control</title>
        <meta name="description" content="Reach our global engineering headquarters. Connect with True North for project inquiries, technical support, and partnership opportunities." />
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' }
          ]))}
        </script>
      </Helmet>

      {/* ── BACKGROUND ORNAMENT ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(229,9,20,0.05)_0%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-screen bg-gradient-to-b from-border-subtle to-transparent" />
      </div>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-border-subtle mb-16">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-brand-red text-xs font-black uppercase tracking-[0.4em]">Uplink Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-8 tracking-tighter leading-[0.9]">
              COMMUNICATE WITH <br />
              <span className="text-gradient">THE CORE.</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              Dispatch your requirements directly to our engineering teams. We operate on a global clock, ensuring responses within a 24-hour cycle.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── TOP ACTION GRID ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {DIRECT_UPLINKS.map((link, i) => (
            <AnimatedSection key={link.id} delay={i * 0.1}>
              {link.link.startsWith('#') ? (
                <a
                  href={link.link}
                  className={`group glass p-8 rounded-2xl flex items-center justify-between border border-border-subtle transition-all duration-500 cursor-pointer ${link.hover}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110`}>
                      <link.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{link.title}</h3>
                      <p className="text-sm text-text-secondary font-medium tracking-tight">{link.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <ArrowRight size={18} />
                  </div>
                </a>
              ) : (
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group glass p-8 rounded-2xl flex items-center justify-between border border-border-subtle transition-all duration-500 cursor-pointer ${link.hover}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110`}>
                      <link.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{link.title}</h3>
                      <p className="text-sm text-text-secondary font-medium tracking-tight">{link.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <ArrowRight size={18} />
                  </div>
                </a>
              )}
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* ── SYSTEM STATUS (SIDEBAR) ─────────────────────────── */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="glass p-8 rounded-2xl border border-border-subtle">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-red mb-8">System Metrics</h3>

                <div className="space-y-6">
                  {[
                    { icon: Globe, label: 'Global Coverage', value: '24/7 Deployment' },
                    { icon: Clock, label: 'Avg. Response', value: ' < 4 Hours' },
                    { icon: Shield, label: 'Security Level', value: 'Enterprise Grade' },
                    { icon: Zap, label: 'Efficiency', value: '99.9% Resolved' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center text-brand-red border border-border-subtle">
                        <stat.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">{stat.label}</p>
                        <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass p-8 rounded-2xl border border-border-subtle relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Globe size={40} className="text-brand-red" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary mb-4">Command Center</h3>
                <p className="text-sm text-text-primary font-bold mb-1">Global Operations Hub</p>
                <p className="text-xs text-text-secondary mb-2">Central Engineering | Distributed Teams</p>
                <p className="text-xs text-text-secondary mb-4">We operate with a decentralized, global-first model, ensuring 24/7 availability and seamless collaboration across all time zones.</p>
                <p className="text-xs text-text-secondary">Official Channel: support@truenorth.com</p>

                <div className="mt-8 pt-8 border-t border-border-subtle">
                  <Link to="/about" className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest hover:underline">
                    Learn about our reach <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ── MISSION BRIEF FORM (MAIN) ───────────────────────── */}
          <AnimatedSection delay={0.4} className="lg:col-span-2" id="briefing">
            <div className="glass p-8 md:p-12 rounded-3xl border border-border-subtle shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-black text-text-primary mb-2">Project Briefing</h2>
                <p className="text-text-secondary">Initialize your deployment sequence below.</p>
              </div>

              {status.state === 'success' ? (
                <div className="bg-bg-secondary border border-green-500/20 p-10 rounded-2xl text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Protocol Successful</h3>
                  <p className="text-text-secondary mb-8">{status.message}</p>
                  <button
                    onClick={() => setStatus({ state: 'idle', message: '' })}
                    className="px-8 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-all"
                  >
                    New Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status.state === 'offline' && (
                    <div className="p-4 bg-bg-secondary border border-red-500/20 rounded-xl flex items-center gap-3 text-sm text-brand-red font-bold">
                      <WifiOff size={18} /> {status.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-text-secondary tracking-[0.2em] mb-3">Operator Name</label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="w-full h-14 bg-bg-secondary border border-border-subtle rounded-xl px-4 outline-none focus:border-brand-red transition-colors text-text-primary font-medium"
                        placeholder="ID Search..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-text-secondary tracking-[0.2em] mb-3">Dispatch Node (Email)</label>
                      <input
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="w-full h-14 bg-bg-secondary border border-border-subtle rounded-xl px-4 outline-none focus:border-brand-red transition-colors text-text-primary font-medium"
                        placeholder="protocol@node.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-[0.2em] mb-3">Entity / Organisation (Optional)</label>
                    <input
                      type="text" name="company"
                      value={formData.company} onChange={handleChange}
                      className="w-full h-14 bg-bg-secondary border border-border-subtle rounded-xl px-4 outline-none focus:border-brand-red transition-colors text-text-primary font-medium"
                      placeholder="Corporate Domain"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary tracking-[0.2em] mb-3">Mission Objectives (Message)</label>
                    <textarea
                      name="message" required rows={5}
                      value={formData.message} onChange={handleChange}
                      className="w-full bg-bg-secondary border border-border-subtle rounded-xl p-4 outline-none focus:border-brand-red transition-colors text-text-primary font-medium resize-none"
                      placeholder="Detail your operational requirements..."
                    />
                  </div>

                  {status.state === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-brand-red text-xs font-bold rounded-xl flex items-center gap-2">
                      <AlertCircle size={16} /> {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="w-full h-16 bg-brand-red text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-red-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(229,9,20,0.2)] disabled:opacity-50"
                  >
                    {status.state === 'loading' ? 'Transmitting Data...' : (
                      <>Initiate Deployment Sequence <Send size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
};

export default Contact;
