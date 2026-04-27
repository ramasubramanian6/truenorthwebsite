import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <Helmet>
        <title>404 Not Found | True North IT Solutions</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <motion.div
           initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="text-[10rem] md:text-[15rem] font-black text-bg-secondary select-none pointer-events-none leading-none tracking-tighter"
            style={{ 
              textShadow: '0 0 40px rgba(229,9,20,0.1)',
              WebkitTextStroke: '2px var(--color-border-subtle)'
            }}
          >
            404
          </h1>

          <div className="-mt-16 md:-mt-24">
            <h2 className="text-3xl md:text-5xl font-black text-text-primary mb-6 tracking-tight">Lost Direction?</h2>
            
            <p className="text-text-secondary max-w-lg mx-auto mb-10 text-lg leading-relaxed">
              We couldn't find the page you're searching for. Let's get you back logic — charting a clearer course to the homepage.
            </p>

            <Link 
              to="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-red text-white font-black rounded-xl hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_var(--color-red-glow)]"
            >
              <ArrowLeft size={20} /> Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
