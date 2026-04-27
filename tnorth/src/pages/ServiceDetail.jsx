import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { servicesData } from '../data/servicesData';
import * as LucideIcons from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const IconComponent = LucideIcons[service.icon] || LucideIcons.Briefcase;

  return (
    <div className="pt-10 pb-24">
      <Helmet>
        <title>{service.title} | True North IT Solutions</title>
        <meta name="description" content={service.short} />
      </Helmet>

      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection className="mb-16 border-b border-border-subtle pb-12">
          <div className="flex items-center text-brand-red mb-6 space-x-2 text-xs font-bold uppercase tracking-widest leading-none">
            <Link to="/services" className="hover:text-text-primary transition-colors">Services</Link>
            <span className="text-text-secondary/40 font-normal">/</span>
            <span className="text-text-secondary">{service.title}</span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-bg-secondary text-brand-red rounded-xl flex items-center justify-center shrink-0 border border-border-subtle shadow-sm">
              <IconComponent size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight">{service.title}</h1>
          </div>
          
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl">
            {service.overview}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <AnimatedSection delay={0.1} className="glass p-8 rounded-2xl border border-border-subtle">
            <h3 className="text-xl font-bold mb-8 flex items-center text-text-primary">
              <LucideIcons.CheckSquare className="text-brand-red mr-3" size={24} /> 
              Service Features
            </h3>
            <ul className="space-y-4">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start text-text-secondary group">
                  <div className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center mt-0.5 mr-4 shrink-0 group-hover:bg-brand-red/20 transition-colors">
                    <LucideIcons.Check size={12} className="text-brand-red" />
                  </div>
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="glass p-8 rounded-2xl border border-border-subtle">
            <h3 className="text-xl font-bold mb-8 flex items-center text-text-primary">
              <LucideIcons.TrendingUp className="text-brand-red mr-3" size={24} /> 
              Primary Benefits
            </h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-text-secondary group">
                  <div className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center mt-0.5 mr-4 shrink-0 group-hover:bg-brand-red/20 transition-colors">
                    <LucideIcons.ArrowUpRight size={12} className="text-brand-red" />
                  </div>
                  <span className="text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="bg-bg-secondary p-10 md:p-16 rounded-3xl border border-border-subtle relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-12">
             <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Process</span>
             <h3 className="text-3xl font-black text-text-primary tracking-tight">Structured Implementation</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {service.process.map((step, i) => (
              <div key={i} className="glass p-6 rounded-xl text-center group border border-border-subtle hover:border-brand-red/30 transition-all duration-300">
                <div className="text-3xl font-black text-brand-red/10 mb-4 group-hover:text-brand-red transition-all duration-500">
                  0{i + 1}
                </div>
                <p className="text-text-primary font-bold text-sm tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-24 text-center">
          <h3 className="text-3xl font-black text-text-primary mb-4">Ready to start?</h3>
          <p className="text-text-secondary mb-10 max-w-lg mx-auto">Let's discuss how {service.title} can be implemented for your specific business requirements.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-10 py-5 bg-brand-red text-white text-lg font-black rounded-xl hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_var(--color-red-glow)]"
          >
            Start Project <LucideIcons.ArrowRight className="ml-3" size={20} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ServiceDetail;
