export const caseStudies = [
  {
    id: "fintech-cloud-migration",
    title: "Enterprise Cloud Migration for Global Fintech",
    clientIndustry: "Financial Technology",
    summary: "Migrated a monolithic legacy banking application to a highly scalable AWS microservices architecture, achieving zero downtime.",
    problem: "The client was struggling with a 15-year-old on-premise monolith that caused severe bottlenecks during peak trading hours. Deployment cycles took 3 weeks, and infrastructure costs were spiraling out of control due to inefficient resource allocation.",
    solution: "True North architected a complete lift-and-shift strategy, ultimately refactoring the core banking modules into AWS EKS (Elastic Kubernetes Service). We implemented an automated CI/CD pipeline using GitHub Actions and Terraform for Infrastructure as Code (IaC).",
    results: [
      "Zero downtime during the final production cutover.",
      "Reduced deployment cycles from 3 weeks to 4 hours.",
      "Decreased infrastructure operational costs by 38%.",
      "Achieved 99.999% uptime across all critical services."
    ],
    techStack: ["AWS EKS", "Terraform", "Node.js", "PostgreSQL", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "ecommerce-scale",
    title: "High-Traffic E-Commerce Platform Scaling",
    clientIndustry: "E-Commerce & Retail",
    summary: "Re-engineered the backend of a major e-commerce retailer to handle 10x traffic spikes during Black Friday sales events.",
    problem: "During major sales events, the client's existing WooCommerce platform was crashing, leading to millions in lost revenue. The database was deadlocking, and the frontend load times exceeded 8 seconds during peak hours.",
    solution: "We transitioned the platform to a headless architecture using Next.js for the frontend and a custom Node.js microservice backend. We implemented aggressive Redis caching strategies for the product catalog and utilized RabbitMQ to handle asynchronous order processing.",
    results: [
      "Successfully handled 50,000 concurrent users with zero degradation.",
      "Improved frontend LCP (Largest Contentful Paint) to under 1.2 seconds.",
      "Increased checkout conversion rate by 18% during peak events.",
      "Eliminated all database deadlock issues."
    ],
    techStack: ["Next.js", "Node.js", "RabbitMQ", "MongoDB", "Redis", "Vercel"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "healthcare-analytics",
    title: "Predictive Analytics SaaS for Healthcare",
    clientIndustry: "Healthcare & Life Sciences",
    summary: "Built a HIPAA-compliant SaaS platform that uses machine learning to predict patient readmission rates.",
    problem: "A healthcare startup needed to build a secure, multi-tenant SaaS application from scratch. They required strict HIPAA compliance, role-based access control, and the ability to process large datasets of anonymized patient records in real-time.",
    solution: "True North developed the platform using React and Python (FastAPI). We engineered a secure data pipeline using AWS HIPAA-eligible services and integrated a custom machine learning model for readmission prediction.",
    results: [
      "Launched MVP 2 months ahead of schedule.",
      "Passed rigorous third-party HIPAA compliance audits.",
      "Platform successfully processes 2M+ patient records daily.",
      "Secured $5M Series A funding based on the platform's success."
    ],
    techStack: ["React", "Python", "FastAPI", "AWS", "TensorFlow", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1000",
  }
];
