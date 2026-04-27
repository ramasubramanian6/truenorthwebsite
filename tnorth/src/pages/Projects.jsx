import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    id: "p1",
    title: "Corporate Website for Retail Company",
    category: "Website Development",
    description: "A fully responsive, high-performance web platform designed to handle thousands of daily visitors with integrated content management.",
    gradient: "from-blue-600/20 to-purple-600/20"
  },
  {
    id: "p2",
    title: "CRM Implementation for Small Business",
    category: "Software Implementation",
    description: "End-to-end integration of a cloud CRM system, automating sales funnels and centralizing client communications.",
    gradient: "from-green-600/20 to-emerald-600/20"
  },
  {
    id: "p3",
    title: "Business Dashboard Application",
    category: "QA Testing & Development",
    description: "A secure, robust internal analytics dashboard. Subjected to extreme load testing and automated QA flows.",
    gradient: "from-orange-600/20 to-brand-red/20"
  }
];

const Projects = () => {
  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Our Projects | True North</title>
        <meta name="description" content="View our portfolio of digital transformations and IT service deliverables." />
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Featured <span className="text-brand-red">Work</span></h1>
        <p className="text-lg md:text-xl text-gray-400">
          Discover how we’ve helped diverse global clients achieve digital excellence.
        </p>
      </AnimatedSection>

      <div className="space-y-16 mb-24">
        {projectsData.map((project, idx) => (
          <AnimatedSection key={project.id} delay={0.1} className="group relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-brand-red/30 transition-colors">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            
            <div className="flex flex-col lg:flex-row p-8 md:p-12 gap-10 lg:items-center relative z-10">
              <div className="w-full lg:w-1/2 aspect-video bg-[#0B0B0B] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-8">
                {/* Simulated Image Placeholder since requirements request no heavy dummy images, we build a sleek structural mockup */}
                <div className="w-full h-full border-2 border-dashed border-gray-800 rounded bg-gray-900/50 flex flex-col items-center justify-center text-gray-600 font-mono text-sm group-hover:border-brand-red/30 transition-colors">
                  <div className="w-16 h-4 bg-gray-800 rounded mb-4 animate-pulse"></div>
                  <div className="w-3/4 h-32 bg-gray-800/50 rounded mb-4"></div>
                  <span>WebP Image Asset [Lazy Loaded]</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <span className="px-3 py-1 bg-brand-red/10 text-brand-red font-semibold text-sm rounded-full tracking-wider uppercase">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
                <Link to="/contact" className="inline-flex items-center text-white font-medium hover:text-brand-red transition-colors group/link mt-4 pt-4 border-t border-white/10">
                  Discuss a similar project <ArrowRight size={20} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      
      <AnimatedSection className="text-center bg-brand-red rounded-2xl p-12 mb-24 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Have a project in mind?</h2>
          <Link to="/contact" className="inline-block px-8 py-4 bg-black text-white font-bold rounded hover:bg-gray-900 transition-colors shadow-lg">
            Start a Conversation
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Projects;
