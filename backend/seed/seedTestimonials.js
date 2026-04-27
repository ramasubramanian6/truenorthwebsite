require('dotenv').config();
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Chief Technology Officer',
    company: 'NovaSoft Technologies',
    content:
      'True North delivered our entire web platform ahead of schedule and significantly above our quality expectations. Their code-first methodology and transparent communication made the engagement seamless from discovery to deployment.',
    rating: 5,
    initials: 'AM',
    color: '#3B82F6',
    isApproved: true,
    order: 1,
  },
  {
    name: 'Sarah Collins',
    role: 'Product Manager',
    company: 'GreenVault UK',
    content:
      'The QA process True North implemented caught critical production issues we would never have found on our own. Their systematic, cross-device testing approach gave us complete confidence before our go-live date.',
    rating: 5,
    initials: 'SC',
    color: '#8B5CF6',
    isApproved: true,
    order: 2,
  },
  {
    name: 'Ravi Shankar',
    role: 'Director of Operations',
    company: 'Pinnacle Retail Group',
    content:
      'Six months of zero downtime speaks for itself. True North\'s ongoing support and maintenance SLA has been a genuine game-changer for our business continuity planning. Highly recommended.',
    rating: 5,
    initials: 'RS',
    color: '#E50914',
    isApproved: true,
    order: 3,
  },
  {
    name: 'Leila Foster',
    role: 'Founder & CEO',
    company: 'StartPath Digital',
    content:
      'We approached True North as an early-stage startup with just an idea and a deadline. They consulted, built, tested, and deployed our entire SaaS platform within two weeks. The results have been extraordinary.',
    rating: 5,
    initials: 'LF',
    color: '#10B981',
    isApproved: true,
    order: 4,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials successfully!`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Testimonial seeding error:', err.message);
    process.exit(1);
  });
