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
        <title>{service.title} | True North</title>
        <meta name="description" content={service.short} />
      </Helmet>

      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection className="mb-16 border-b border-white/5 pb-12">
          <div className="flex items-center text-brand-red mb-6 space-x-2 text-sm font-medium">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-400">{service.title}</span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-xl flex items-center justify-center shrink-0">
              <IconComponent size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">{service.title}</h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
            {service.overview}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <AnimatedSection delay={0.1}>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
              <LucideIcons.CheckSquare className="text-brand-red mr-3" /> Features
            </h3>
            <ul className="space-y-4">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start text-gray-400 glass p-4 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-red mt-2 mr-4 shrink-0" />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
              <LucideIcons.TrendingUp className="text-brand-red mr-3" /> Benefits
            </h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-gray-400 glass p-4 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-red mt-2 mr-4 shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="bg-[#080808] p-10 md:p-16 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-3xl font-bold mb-10 text-center">Implementation Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((step, i) => (
              <div key={i} className="relative z-10 glass p-6 rounded-xl text-center group">
                <div className="text-4xl font-black text-brand-red/20 mb-4 group-hover:text-brand-red transition-colors">
                  0{i + 1}
                </div>
                <p className="text-white font-medium">{step}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-8 py-4 bg-brand-red text-white text-lg font-medium rounded hover:bg-red-700 hover:scale-105 transition-all duration-300"
          >
            Request a Quote <LucideIcons.ArrowRight className="ml-2" />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ServiceDetail;
