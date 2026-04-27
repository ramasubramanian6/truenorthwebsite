import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const StatBadge = ({ title, value, className = "", delay = 0 }) => {
  const [hasViewed, setHasViewed] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  // Parse string values like "150+", "99.9%"
  let parsedValue = 0;
  let suffix = "";
  let decimals = 0;

  if (typeof value === "string") {
    if (value.includes(".")) {
      decimals = 1;
    }
    const match = value.match(/[\d.]+/);
    if (match) {
      parsedValue = parseFloat(match[0]);
    }
    const suffixMatch = value.match(/[^\d.]+$/);
    if (suffixMatch) {
      suffix = suffixMatch[0];
    }
  } else {
    parsedValue = value;
  }

  useEffect(() => {
    if (hasViewed) {
      const controls = animate(0, parsedValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(latest);
        }
      });
      return () => controls.stop();
    }
  }, [hasViewed, parsedValue]);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasViewed(true)}
      transition={{ type: "spring", stiffness: 200, delay }}
      className={`absolute glass p-4 rounded-xl flex items-center space-x-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform cursor-default z-20 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
        <TrendingUp size={20} />
      </div>
      <div>
        <div className="text-2xl font-black text-text-primary leading-none">
          <span className="inline-block">
            {displayValue.toFixed(decimals)}{suffix}
          </span>
        </div>
        <div className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">{title}</div>
      </div>
    </motion.div>
  );
};

export default StatBadge;
