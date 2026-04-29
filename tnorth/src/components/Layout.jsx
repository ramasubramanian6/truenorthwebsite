import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import SocialBar from './SocialBar';
import NoiseOverlay from './NoiseOverlay';
import { logPageView } from '../utils/analytics';

const Layout = () => {
  const location = useLocation();

  React.useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <NoiseOverlay />
      
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-red z-[60] origin-left shadow-[0_0_15px_rgba(229,9,20,0.8)]"
        style={{ scaleX }}
      />
      
      <SocialBar />
      <Header />
      <main className="flex-grow pt-20 pb-12 relative z-10">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
