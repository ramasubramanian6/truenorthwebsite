import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Mail, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending message...' });
    
    // Formspree Integration Setup
    try {
      const response = await fetch("https://formspree.io/f/xbjnqqlg", { // Replace with actual Formspree ID later
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus({ state: 'success', message: 'Thank you! Your message has been sent.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ state: 'error', message: 'Oops! There was a problem sending your form.' });
      }
    } catch (error) {
      setStatus({ state: 'error', message: 'Network error. Please try again later.' });
    }
  };

  const contactInfo = [
    { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: Mail, text: "admin@truenorth.com", href: "mailto:admin@truenorth.com" },
    { icon: MapPin, text: "Tirunelveli, Tamil Nadu, India", href: null }
  ];

  const whatsappLink = "https://wa.me/919876543210?text=Hello%20I%20am%20interested%20in%20your%20services";

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Contact Us | True North</title>
        <meta name="description" content="Get in touch with True North for your robust, scaling web application needs. Serving clients worldwide." />
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Let's <span className="text-brand-red">Connect</span></h1>
        <p className="text-lg md:text-xl text-gray-400 mb-2">
          Serving clients worldwide.
        </p>
        <p className="text-gray-500">
          Reach out for a quote, consultation, or just to say hello.
        </p>
      </AnimatedSection>

      <div className="flex flex-col lg:flex-row gap-16 mb-24">
        {/* Contact Info Sidebar */}
        <AnimatedSection className="w-full lg:w-1/3 space-y-8">
          <div className="glass p-8 rounded-2xl border-l-[3px] border-l-brand-red">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <ul className="space-y-6">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-start text-gray-300">
                  <info.icon size={24} className="text-brand-red mr-4 shrink-0 mt-0.5" />
                  {info.href ? (
                    <a href={info.href} className="hover:text-white transition-colors">{info.text}</a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl bg-gradient-to-br from-[#080808] to-[#121212]">
            <h3 className="text-xl font-bold text-white mb-4">Fast Response</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Prefer instant messaging? Reach out to us directly on WhatsApp and our global support team will get right back to you.
            </p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white font-bold rounded flex items-center justify-center hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={20} className="mr-2" /> Message on WhatsApp
            </a>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection delay={0.2} className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-2xl border-white/5 border relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
            <p className="text-gray-400 mb-8">We usually respond within 24 hours.</p>

            {status.state === 'success' ? (
              <div className="p-6 bg-brand-red/10 border border-brand-red/20 rounded-xl flex items-center text-brand-red font-medium">
                <CheckCircle size={24} className="mr-3 shrink-0" />
                {status.message}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-[#0A0A0A] border border-white/10 rounded outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 text-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-[#0A0A0A] border border-white/10 rounded outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 text-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">How can we help?</label>
                  <textarea 
                    id="message"
                    name="message" 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-[#0A0A0A] border border-white/10 rounded outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 text-white transition-all resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                {status.state === 'error' && (
                  <p className="text-red-500 text-sm mt-2">{status.message}</p>
                )}

                <button 
                  type="submit" 
                  disabled={status.state === 'loading'}
                  className="w-full py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {status.state === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>Send Message <Send size={18} className="ml-2" /></>
                  )}
                </button>
              </div>
            )}
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
