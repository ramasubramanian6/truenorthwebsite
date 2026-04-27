import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', delay = 0, animationType = 'fadeUp' }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6, delay } }
    }
  };

  if (shouldReduceMotion) {
    // If user prefers reduced motion, we apply a simpler fade-in without delays
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className={className}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants[animationType] || variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
