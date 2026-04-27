import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';

const NotFound = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>404 Not Found | True North</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.h1 
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-8xl md:text-9xl font-bold text-brand-dark mb-4 drop-shadow-[0_0_15px_rgba(229,9,20,0.3)] select-none pointer-events-none"
      >
        404
      </motion.h1>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Page Not Found</h2>
      
      <p className="text-gray-400 max-w-lg mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link 
        to="/"
        className="px-8 py-3 bg-brand-red text-white font-medium rounded hover:bg-red-700 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-all duration-300"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
