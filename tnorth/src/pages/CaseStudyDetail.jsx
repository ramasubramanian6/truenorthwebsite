import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { caseStudies } from '../data/caseStudiesData';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id === id);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="pt-20 pb-24">
      <Helmet>
        <title>{study.title} | Case Studies | True North</title>
        <meta name="description" content={study.summary} />
      </Helmet>

      <section className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection className="mb-12">
          <Link to="/case-studies" className="inline-flex items-center text-xs font-bold text-text-secondary hover:text-brand-red uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
          </Link>
          
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            {study.clientIndustry}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-8 leading-tight">
            {study.title}
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-12">
            {study.techStack.map(tech => (
              <span key={tech} className="px-4 py-1.5 bg-bg-secondary text-text-primary text-xs font-bold rounded-full border border-border-subtle">
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 relative border border-border-subtle">
          <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay z-10"></div>
          <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-16">
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold text-text-primary mb-6">The Problem</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{study.problem}</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <h2 className="text-2xl font-bold text-text-primary mb-6">Our Solution</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{study.solution}</p>
            </AnimatedSection>
          </div>

          <div className="md:col-span-1">
            <AnimatedSection delay={0.4} className="glass p-8 rounded-3xl border border-border-subtle sticky top-24">
              <h3 className="text-lg font-bold text-text-primary mb-6 uppercase tracking-wider text-xs">The Results</h3>
              <ul className="space-y-6">
                {study.results.map((result, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 size={20} className="text-brand-red mr-3 shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{result}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
