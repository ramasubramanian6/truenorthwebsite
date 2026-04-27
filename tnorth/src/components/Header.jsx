import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('en') ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 glass shadow-2xl shadow-black/10' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-3 z-50 group" aria-label="True North Home">
          <div className="relative">
            <img 
              src={logo} 
              alt="True North Logo" 
              className={`h-18 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${theme === 'dark' ? 'brightness-0 invert' : ''}`} 
            />
            <motion.div 
              layoutId="logo-glow"
              className={`absolute inset-0 bg-brand-red/10 blur-2xl rounded-full -z-10 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} ${theme === 'dark' ? 'bg-white/10' : ''}`}
            />
          </div>
          <div className="hidden sm:flex flex-col leading-none select-none">
            <span className={`font-black uppercase tracking-[0.15em] text-xl transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              True North Co.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <nav className="flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-[15px] tracking-wide font-semibold relative transition-all duration-300 ${
                    isActive ? 'text-brand-red' : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="relative py-1">
                    {link.name}
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-0.5 bg-brand-red transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                      layoutId={isActive ? "nav-underline" : undefined}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6 border-l border-border-subtle pl-10">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-brand-red hover:bg-red-glow transition-all duration-300"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-text-secondary hover:text-brand-red transition-colors text-[13px] font-bold uppercase tracking-wider"
                aria-label="Toggle Language"
              >
                <Globe size={16} />
                <span>{i18n.language.substring(0, 2)}</span>
              </button>
            </div>

            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 hover:shadow-lg hover:shadow-brand-red/20 transition-all duration-300 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-bg-primary backdrop-blur-3xl border-b border-border-subtle py-8 px-8 flex flex-col space-y-8 shadow-2xl md:hidden z-40"
            >
              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-2xl font-bold tracking-tight transition-colors ${isActive ? 'text-brand-red' : 'text-text-primary'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="flex flex-col space-y-6 pt-6 border-t border-border-subtle">
                <Link 
                  to="/contact" 
                  className="w-full py-4 bg-brand-red text-white text-center rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-brand-red/20"
                >
                  Get Started
                </Link>

                <div className="flex justify-between items-center">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-3 text-text-secondary font-medium"
                  >
                    <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center">
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </div>
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-3 text-text-secondary font-bold uppercase tracking-widest"
                  >
                    <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center">
                      <Globe size={18} />
                    </div>
                    <span>{i18n.language.substring(0, 2)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
