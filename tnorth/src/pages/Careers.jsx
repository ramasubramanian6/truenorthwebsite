import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Cpu, Users, Zap, Code, Shield, Activity, X, Copy, Mail, Paperclip } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { API_URL } from '../config/api';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/careers`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            setJobs(data);
            setIsLive(true);
        } else {
            setJobs([]);
            setIsLive(false);
        }
      } catch (err) {
        setIsLive(false);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    setExpandedJobId(prev => prev === jobId ? null : jobId);
  };

  return (
    <div className="pt-10 pb-24">
      <Helmet>
        <title>Careers | True North IT Consultancy</title>
        <meta name="description" content="Join True North and help us build the next generation of digital infrastructure and SaaS products." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-border-subtle">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedSection className="max-w-3xl">
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Join Our Mission</span>
            <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-8 tracking-tight leading-tight">
              Shape the Future of <br />
              <span className="text-gradient">Digital Engineering</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-10">
              At True North, we don't just write code — we architect solutions that power businesses worldwide. We're looking for thinkers, builders, and innovators to join our growing global team.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#positions" className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                View Open Positions
              </a>
              <div className="flex items-center gap-2 px-6 py-4 glass rounded-xl border border-border-subtle text-text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Hiring globally for remote & hybrid roles
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-bg-secondary/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Cpu,   title: 'Modern Stack', desc: 'Work with React 19, Node.js, Go, and the latest cloud-native architectures.' },
              { icon: Globe, title: 'Global Exposure', desc: 'Collaborate with international clients and teams across different timezones.' },
              { icon: Zap,   title: 'Fast Growth', desc: 'We value meritocracy. Performance leads directly to ownership and leadership roles.' }
            ].map((prop, i) => (
              <AnimatedSection key={prop.title} delay={i * 0.1} className="glass p-8 rounded-2xl border border-border-subtle">
                <div className="w-12 h-12 bg-bg-primary rounded-xl flex items-center justify-center text-brand-red mb-6 border border-border-subtle shadow-sm">
                  <prop.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{prop.title}</h3>
                <p className="text-text-secondary leading-relaxed">{prop.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Perks / Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-4xl font-black text-text-primary tracking-tight mb-8">Work that feels like <span className="text-gradient">True North</span></h2>
              <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                We believe in providing an environment where engineers can thrive. Our benefits are designed to support your professional growth and personal well-being.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Competitive Global Salary',
                  'Performance Bonuses',
                  'Flexible Working Hours',
                  'Learning & Dev Budget',
                  'Premium Health Coverage',
                  'Company Retreats'
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-text-secondary py-2 border-b border-border-subtle/30">
                    <CheckCircle2 size={18} className="text-brand-red" />
                    <span className="text-sm font-medium">{perk}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="lg:w-1/2 grid grid-cols-2 gap-4" delay={0.2}>
               <div className="bg-bg-secondary rounded-3xl p-8 border border-border-subtle aspect-square flex flex-col justify-center items-center text-center">
                  <Users size={48} className="text-brand-red mb-6" />
                  <h4 className="text-2xl font-bold text-text-primary mb-2">12+</h4>
                  <p className="text-sm text-text-secondary uppercase tracking-widest font-bold">Nationalities</p>
               </div>
               <div className="bg-bg-primary rounded-3xl p-8 border border-border-subtle aspect-square flex flex-col justify-center items-center text-center mt-8">
                  <Code size={48} className="text-blue-400 mb-6" />
                  <h4 className="text-2xl font-bold text-text-primary mb-2">95%</h4>
                  <p className="text-sm text-text-secondary uppercase tracking-widest font-bold">Engineering Culture</p>
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-24 bg-bg-secondary border-t border-border-subtle relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-black text-text-primary tracking-tight">Open Engineering <span className="text-gradient">Positions</span></h2>
            <p className="text-text-secondary mt-4">We're always looking for exceptional talent. Don't see a fit? Reach out anyway.</p>
            
            {isLive && (
              <div className="inline-flex items-center gap-2 mt-6 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] uppercase font-black tracking-widest rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Backend Synchronized
              </div>
            )}
          </AnimatedSection>

          {!loading && jobs.length === 0 && (
            <AnimatedSection className="glass rounded-2xl border border-border-subtle p-12 text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-bg-primary border border-border-subtle flex items-center justify-center text-brand-red">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">No Current Openings</h3>
              <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                We don't have any open positions at this time. If a suitable opportunity arises in the future, we'll be sure to post it here — stay tuned!
              </p>
            </AnimatedSection>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><Activity className="animate-spin text-brand-red" /></div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, i) => {
                const jobId = job._id || i;
                const isExpanded = expandedJobId === jobId;
                
                return (
                  <AnimatedSection key={jobId} delay={i * 0.1} className="glass rounded-2xl border border-border-subtle group hover:border-brand-red/50 transition-all duration-300 overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-red transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-text-secondary font-medium uppercase tracking-widest">
                          <span>{job.team}</span>
                          <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center gap-4 w-full md:w-auto">
                        <span className="px-3 py-1 bg-bg-primary text-text-secondary text-[10px] uppercase font-bold rounded-full tracking-widest border border-border-subtle">{job.type}</span>
                        <button 
                          onClick={() => handleApply(jobId)}
                          className={`flex-grow md:flex-grow-0 px-6 py-3 text-sm font-bold rounded-xl border transition-all text-center ${
                            isExpanded 
                              ? 'bg-bg-secondary text-text-secondary border-border-subtle hover:bg-bg-primary hover:text-text-primary'
                              : 'bg-bg-primary text-text-primary border-border-subtle hover:bg-brand-red hover:text-white hover:border-brand-red'
                          }`}
                        >
                          {isExpanded ? 'Cancel' : 'Apply Now'}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-bg-secondary/50 border-t border-border-subtle"
                        >
                          <div className="p-6 md:p-8 space-y-4 max-w-3xl">
                            <p className="text-text-secondary text-sm mb-6">To submit your application, please send us an email using the exact details below.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1.5">Send To</p>
                                <div className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-border-subtle">
                                  <span className="font-mono text-text-primary text-xs">support@truenorth.com</span>
                                  <button 
                                    onClick={() => navigator.clipboard.writeText('support@truenorth.com')}
                                    className="text-brand-red hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs font-bold"
                                  >
                                    <Copy size={14} /> Copy
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1.5">Required Subject Line</p>
                                <div className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-border-subtle">
                                  <span className="font-mono text-text-primary text-xs truncate mr-3">Application for {job.title}</span>
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(`Application for ${job.title} - ${job.team}`)}
                                    className="text-brand-red hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
                                  >
                                    <Copy size={14} /> Copy
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                              <div className="p-3 border border-brand-red/30 bg-brand-red/5 rounded-lg flex items-center gap-2 text-brand-red w-full sm:w-auto">
                                <Paperclip size={16} />
                                <p className="font-black text-[10px] uppercase tracking-widest">* PLEASE ATTACH YOUR RESUME (PDF)</p>
                              </div>
                              
                              <div className="flex gap-2 w-full sm:w-auto">
                                <a 
                                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=support@truenorth.com&su=${encodeURIComponent('Application for ' + job.title + ' - ' + job.team)}&body=${encodeURIComponent('Please find my resume attached.')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 sm:flex-none px-4 py-3 bg-bg-primary text-text-primary text-xs font-bold rounded-lg border border-border-subtle hover:border-brand-red transition-all flex justify-center items-center gap-2"
                                >
                                  <Mail size={16} /> Gmail
                                </a>
                                <a 
                                  href={`mailto:support@truenorth.com?subject=${encodeURIComponent('Application for ' + job.title + ' - ' + job.team)}&body=${encodeURIComponent('Please find my resume attached.')}`}
                                  className="flex-1 sm:flex-none px-4 py-3 bg-brand-red text-white text-xs font-bold rounded-lg border border-brand-red hover:bg-red-700 transition-all flex justify-center items-center gap-2"
                                >
                                  Mail App
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </AnimatedSection>
                );
              })}
            </div>
          )}

          <AnimatedSection className="mt-16 glass p-8 rounded-2xl border border-border-subtle text-center" delay={0.4}>
             <h4 className="text-xl font-bold text-text-primary mb-4">Spontaneous Application?</h4>
             <p className="text-text-secondary mb-8">Send your CV and a brief note on how you can help us scale to <a href="mailto:support@truenorth.com" className="text-brand-red font-bold hover:underline">support@truenorth.com</a></p>
             <div className="inline-flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
                Average Response Time <span className="text-brand-red">48 Hours</span>
             </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Careers;
