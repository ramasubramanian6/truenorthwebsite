export const blogData = [
  {
    id: "b1",
    slug: 'future-of-qa-testing',
    title: 'The Future of QA Testing in Agile Development',
    excerpt: 'Automated testing is no longer a luxury — it is a necessity for modern CI/CD pipelines and agile delivery workflows.',
    date: 'April 20, 2026',
    category: 'QA Testing',
    readTime: '5 min read',
    content: `## The Shift to Automated Testing

In recent years, the acceleration of agile development cycles has placed immense pressure on QA teams. Manual testing simply cannot keep pace with continuous integration and continuous deployment (CI/CD) pipelines. Automated testing has emerged as the clear solution, allowing teams to run thousands of test cases in minutes rather than days.

At True North, we leverage tools like Cypress and Playwright to build robust end-to-end testing frameworks that integrate directly into your CI/CD pipeline — ensuring every push to production is battle-tested.

### The Role of AI in QA

Looking ahead, AI-powered testing tools will start predicting where code breaks before developers even push to production. At True North, we stay ahead of this curve by continuously evolving our QA methodologies.`,
  },
  {
    id: "b2",
    slug: 'scaling-react-applications',
    title: 'Scaling React Applications: Best Practices for 2026',
    excerpt: 'A deep dive into state management, code splitting, and React Server Components for production-grade applications.',
    date: 'April 12, 2026',
    category: 'Development',
    readTime: '8 min read',
    content: `## Beyond the Basics

As React applications grow, performance often degrades. The most common culprit? Unnecessary re-renders and bloated client bundles. By strategically implementing React 19 features like Server Components and fine-grained Suspense boundaries, we can achieve near-instant TTI (Time to Interactive).

### Code Splitting Strategically

Route-based code splitting is standard, but component-based lazy loading is where true performance gains lie. Combined with edge caching on Vercel or Cloudflare, this approach ensures your users always get the fastest possible experience regardless of geography.`,
  },
  {
    id: "b3",
    slug: 'saas-product-development-guide',
    title: 'Building Export-Ready SaaS Products: A Practical Guide',
    excerpt: 'Discover the architecture decisions, business model considerations, and technical standards that separate a local tool from a global SaaS product.',
    date: 'April 5, 2026',
    category: 'SaaS',
    readTime: '10 min read',
    content: `## From Local Tool to Global Product

The difference between a custom internal tool and a marketable SaaS product lies in three pillars: multi-tenancy, billing integration, and observability. At True North, every digital product we build is architected with these pillars in mind from day one.

### Multi-Tenancy Architecture

A well-designed multi-tenant database strategy allows you to serve thousands of customers from a single codebase while maintaining data isolation and compliance. We use a hybrid approach — shared infrastructure with row-level security — to balance cost efficiency with security.

### Billing and Monetization

Integrating Stripe or Razorpay correctly the first time saves months of rework. We design subscription flows, usage-based billing, and trial management as core features, not afterthoughts.`,
  },
];
