export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "True North",
    "url": "https://truenorth.com",
    "logo": "https://truenorth.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "email": "admin@truenorth.com",
      "contactType": "customer support"
    }
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "True North",
    "url": "https://truenorth.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://truenorth.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};
