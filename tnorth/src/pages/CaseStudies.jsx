import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { caseStudies } from '../data/caseStudiesData';
import { ArrowRight } from 'lucide-react';

const CaseStudies = () => {
  return (
    <div className="pt-20 pb-24">
      <Helmet>
        <title>Case Studies | True North IT Consultancy</title>
        <meta name="description" content="Explore our portfolio of successful enterprise IT projects, cloud migrations, and custom software development case studies." />
      </Helmet>

      <section className="container mx-auto px-6 max-w-7xl">
        <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6">Case Studies</h1>
          <p className="text-text-secondary text-lg">
            Discover how we have helped global enterprises and startups scale their technology, optimize infrastructure, and launch market-leading products.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.id} delay={index * 0.1} className="glass rounded-3xl border border-border-subtle overflow-hidden flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay z-10"></div>
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest mb-3">
                  {study.clientIndustry}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-4 leading-tight group-hover:text-brand-red transition-colors">
                  {study.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                  {study.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-bg-secondary text-text-secondary text-[10px] uppercase font-bold rounded-full border border-border-subtle">
                      {tech}
                    </span>
                  ))}
                  {study.techStack.length > 3 && (
                    <span className="px-3 py-1 bg-bg-secondary text-text-secondary text-[10px] uppercase font-bold rounded-full border border-border-subtle">
                      +{study.techStack.length - 3}
                    </span>
                  )}
                </div>
                <Link 
                  to={`/case-studies/${study.id}`} 
                  className="inline-flex items-center text-sm font-bold text-text-primary hover:text-brand-red transition-colors mt-auto"
                >
                  Read Full Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
