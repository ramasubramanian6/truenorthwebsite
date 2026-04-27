const BASE_URL = 'https://truenorthitc.com';

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "True North IT Solutions",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": [
      "https://www.linkedin.com/company/truenorth-it",
      "https://twitter.com/truenorth_it"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-95665-56056",
      "email": "admin@truenorthitc.com",
      "contactType": "customer service"
    }
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "True North IT Solutions",
    "url": BASE_URL,
    "description": "Global digital infrastructure and software engineering excellence.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.path}`
    }))
  };
};

export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "Organization",
      "name": "True North IT Solutions"
    },
    "description": service.description,
    "areaServed": "Global"
  };
};
