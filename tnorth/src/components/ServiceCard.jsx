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
      className="glass rounded-xl p-8 group hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(229,9,20,0.15)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="mb-6 w-14 h-14 bg-brand-red/10 text-brand-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <IconComponent size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3" aria-label={`Service: ${title}`}>
        {title}
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">
        {short}
      </p>
      
      <Link 
        to={`/services/${id}`}
        className="inline-flex items-center text-brand-red font-medium hover:text-white transition-colors"
        aria-label={`Learn more about ${title}`}
      >
        Learn more <LucideIcons.ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
