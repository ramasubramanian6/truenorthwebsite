import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Our Services | True North</title>
        <meta name="description" content="Explore our premium digital services: Website Development, QA Testing, Implementation, and Consulting." />
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Digital <span className="text-brand-red">Services</span></h1>
        <p className="text-lg md:text-xl text-gray-400">
          We provide end-to-end technology solutions tailored to modernize your business and drive growth.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {servicesData.map((service, idx) => (
          <AnimatedSection key={service.id} delay={idx * 0.1}>
            <ServiceCard {...service} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Services;
