import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const SocialBar = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed right-0 top-1/3 z-50 hidden lg:flex flex-col gap-2"
    >
      <a href="#" className="bg-bg-glass backdrop-blur-md p-4 text-text-secondary hover:text-brand-red border border-border-subtle border-r-0 rounded-l-xl hover:-translate-x-2 transition-all shadow-lg group">
        <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="bg-bg-glass backdrop-blur-md p-4 text-text-secondary hover:text-brand-red border border-border-subtle border-r-0 rounded-l-xl hover:-translate-x-2 transition-all shadow-lg group">
        <FaTwitter size={24} className="group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="bg-bg-glass backdrop-blur-md p-4 text-text-secondary hover:text-brand-red border border-border-subtle border-r-0 rounded-l-xl hover:-translate-x-2 transition-all shadow-lg group">
        <FaFacebook size={24} className="group-hover:scale-110 transition-transform" />
      </a>
    </motion.div>
  );
};

export default SocialBar;
