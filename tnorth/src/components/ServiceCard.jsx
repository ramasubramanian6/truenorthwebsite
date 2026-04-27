import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const ServiceCard = ({ id, title, short, icon }) => {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = LucideIcons[icon] || LucideIcons.Briefcase;

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotateX: 2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass rounded-xl p-8 group border border-border-subtle hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(229,9,20,0.1)] transition-all duration-500 relative overflow-hidden"
    >
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="mb-6 w-14 h-14 bg-bg-secondary text-brand-red rounded-xl flex items-center justify-center border border-border-subtle group-hover:border-brand-red/30 group-hover:scale-110 transition-all duration-500 shadow-sm">
        <IconComponent size={26} />
      </div>
      
      <h3 className="text-xl font-bold text-text-primary mb-3 transition-colors duration-300" aria-label={`Service: ${title}`}>
        {title}
      </h3>
      <p className="text-text-secondary mb-6 leading-relaxed text-sm">
        {short}
      </p>
      
      <Link 
        to={`/services/${id}`}
        className="inline-flex items-center text-brand-red font-bold text-sm tracking-tight hover:text-brand-red/80 transition-colors group/link"
        aria-label={`Learn more about ${title}`}
      >
        <span>Learn more</span>
        <LucideIcons.ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
