import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { useSiteSettings } from '../context/SiteSettingsContext';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { settings } = useSiteSettings();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary pt-20 pb-10 border-t border-border-subtle transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 select-none mb-6 group" aria-label="True North Home">
              <img
                src={logo}
                alt="True North Logo"
                className={`h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${theme === 'dark' ? 'brightness-0 invert' : ''
                  }`}
              />
              <div className="flex flex-col leading-tight">
                <span className="font-black uppercase tracking-[0.1em] text-base text-brand-red">
                  True North
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-text-secondary font-medium">
                  IT Consultant
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            {/* LinkedIn only — real, working link */}
            <a
              href="https://www.linkedin.com/company/truenorth-it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 w-10 h-10 rounded glass items-center justify-center text-text-secondary hover:text-brand-red transition-all duration-300 hover:-translate-y-1 shadow-sm"
              aria-label="True North on LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase text-sm">
              {t('nav.services')}
            </h4>
            <ul className="space-y-3">
              <li><Link to="/services/development" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Development</Link></li>
              <li><Link to="/services/qa-testing" className="text-text-secondary hover:text-brand-red transition-colors text-sm">QA Testing</Link></li>
              <li><Link to="/services/support" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Ongoing Support</Link></li>
              <li><Link to="/services/implementation" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Implementation & Consulting</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase text-sm">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-text-secondary hover:text-brand-red transition-colors text-sm">About Us</Link></li>
              <li><Link to="/case-studies" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Case Studies</Link></li>
              {settings.testimonialsVisible && (
                <li><Link to="/testimonials" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Testimonials</Link></li>
              )}
              <li><Link to="/blog" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Insights & Blog</Link></li>
              <li><Link to="/careers" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase text-sm">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start text-text-secondary text-sm">
                <MapPin size={16} className="mr-3 text-brand-red shrink-0 mt-0.5" />
                <span>Tirunelveli, Tamil Nadu<br />India</span>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <Mail size={16} className="mr-3 text-brand-red shrink-0" />
                <a
                  href="mailto:admin@truenorthitc.com"
                  className="hover:text-text-primary transition-colors"
                >
                  admin@truenorthitc.com
                </a>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <Phone size={16} className="mr-3 text-brand-red shrink-0" />
                <a
                  href="tel:+919566556056"
                  className="hover:text-text-primary transition-colors"
                >
                  +91 95665 56056
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <p className="text-text-secondary text-sm text-center md:text-left">
            &copy; {currentYear} True North IT Consultant. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <Link to="/privacy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
