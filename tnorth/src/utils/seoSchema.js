const BASE_URL = 'https://truenorthitc.com';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'True North IT Consultant',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'True North IT Consultant – World-class IT consulting, software development, QA testing, and managed IT support. Headquartered in Tirunelveli, serving Chennai, Dubai, and global clients.',
  foundingDate: '1999',
  sameAs: [
    'https://www.linkedin.com/company/truenorth-it',
    'https://twitter.com/truenorth_it',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-95665-56056',
    email: 'admin@truenorthitc.com',
    contactType: 'customer service',
    areaServed: ['IN', 'AE', 'GB', 'US', 'SG'],
    availableLanguage: ['English', 'Tamil'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tirunelveli',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Tirunelveli' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Global' },
  ],
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'True North IT Consultant',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  description:
    'True North IT Consultant provides expert IT consulting, software development, QA testing, and managed support in Tirunelveli, Chennai, Dubai, and globally.',
  telephone: '+91-95665-56056',
  email: 'admin@truenorthitc.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tirunelveli',
    addressRegion: 'Tamil Nadu',
    postalCode: '627001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '8.7139',
    longitude: '77.7567',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, AED',
  areaServed: 'Worldwide',
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'True North IT Consultant',
  url: BASE_URL,
  description:
    'IT Consultant & Software Development Company in Tirunelveli – Serving Chennai, Dubai, and global clients with 25+ years of engineering excellence.',
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
    name: 'True North IT Consultant',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tirunelveli',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    telephone: '+91-95665-56056',
  },
  areaServed: [
    { '@type': 'City', name: 'Tirunelveli' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Dubai' },
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
