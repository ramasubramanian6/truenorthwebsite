const BASE_URL = 'https://truenorthitc.com';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'True North IT Consultancy',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'True North IT Consultancy – World-class IT consulting, software development, QA testing, and managed IT support serving global clients.',
  foundingDate: '1999',
  sameAs: [
    'https://www.linkedin.com/company/truenorth-it',
    'https://twitter.com/truenorth_it',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-95665-56056',
    email: 'support@truenorth.com',
    contactType: 'customer service',
    areaServed: ['IN', 'AE', 'GB', 'US', 'SG'],
    availableLanguage: ['English', 'Tamil'],
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Global' },
  ],
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'True North IT Consultancy',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  description:
    'True North IT Consultancy provides expert IT consulting, software development, QA testing, and managed support globally.',
  telephone: '+91-95665-56056',
  email: 'support@truenorth.com',
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, AED',
  areaServed: 'Worldwide',
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'True North IT Consultancy',
  alternateName: ['True North', 'True North IT', 'True North IT Consultancy'],
  url: BASE_URL,
  description:
    'IT Consultant & Software Development Company – Serving global clients with 60+ years of combined hands-on IT experience.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.path}`,
  })),
});

export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  serviceType: service.title,
  description: service.metaDescription || service.short,
  url: `${BASE_URL}/services/${service.id}`,
  provider: {
    '@type': 'LocalBusiness',
    name: 'True North IT Consultancy',
    url: BASE_URL,
    telephone: '+91-95665-56056',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Global' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} Features`,
    itemListElement: (service.features || []).map((f, i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: f },
    })),
  },
});
