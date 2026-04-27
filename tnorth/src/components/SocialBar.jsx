import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa6';

const SocialBar = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
    >
      <a 
        href="https://www.linkedin.com/company/truenorth-it" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-bg-secondary/80 backdrop-blur-md p-4 text-text-secondary hover:text-brand-red border border-border-subtle border-r-0 rounded-l-xl hover:-translate-x-2 transition-all shadow-lg group"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
      </a>
    </motion.div>
  );
};

export default SocialBar;
