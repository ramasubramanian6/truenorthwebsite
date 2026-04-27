import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <footer className="bg-bg-secondary pt-20 pb-10 border-t border-border-subtle transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-3 select-none mb-6 group" aria-label="True North Home">
              <img
                src={logo}
                alt="True North Logo"
                className={`h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${theme && 'filter'} ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
              />
              <div className="flex flex-col leading-tight">
                <span className={`font-black uppercase tracking-[0.1em] text-lg transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  True North Co.
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded glass flex items-center justify-center text-text-secondary hover:text-brand-red border-border-subtle transition-colors shadow-sm cursor-pointer hover:-translate-y-1" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded glass flex items-center justify-center text-text-secondary hover:text-brand-red border-border-subtle transition-colors shadow-sm cursor-pointer hover:-translate-y-1" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded glass flex items-center justify-center text-text-secondary hover:text-brand-red border-border-subtle transition-colors shadow-sm cursor-pointer hover:-translate-y-1" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase">{t('nav.services')}</h4>
            <ul className="space-y-4">
              <li><Link to="/services/development" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Website Development</Link></li>
              <li><Link to="/services/qa-testing" className="text-text-secondary hover:text-brand-red transition-colors text-sm">QA Testing</Link></li>
              <li><Link to="/services/implementation" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Software Implementation</Link></li>
              <li><Link to="/services/consulting" className="text-text-secondary hover:text-brand-red transition-colors text-sm">IT Consulting</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase">{t('footer.company')}</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-text-secondary hover:text-brand-red transition-colors text-sm">{t('nav.about')} Us</Link></li>
              <li><Link to="/projects" className="text-text-secondary hover:text-brand-red transition-colors text-sm">Our Work</Link></li>
              <li><Link to="/blog" className="text-text-secondary hover:text-brand-red transition-colors text-sm">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider uppercase">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-text-secondary text-sm">
                <MapPin size={18} className="mr-3 text-brand-red shrink-0 mt-0.5" />
                <span>Tirunelveli, Tamil Nadu<br />India</span>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <Mail size={18} className="mr-3 text-brand-red shrink-0" />
                <a href="mailto:admin@truenorth.com" className="hover:text-text-primary transition-colors">admin@truenorth.com</a>
              </li>
              <li className="flex items-center text-text-secondary text-sm">
                <Phone size={18} className="mr-3 text-brand-red shrink-0" />
                <a href="tel:+919876543210" className="hover:text-text-primary transition-colors">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center transition-colors">
          <p className="text-text-secondary text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} True North Corporate. {t('footer.rights')}
          </p>
          <div className="flex space-x-6 text-sm text-text-secondary">
            <Link to="#" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
