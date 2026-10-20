/* All copy for the True North IT Consulting website.

   House rules: only claims True North can show. No invented clients,
   testimonials, results or metrics. GRIT numbers come from the GRIT
   architecture documents (docs/architecture/data in the GRIT repository,
   verified against the code in October 2026). No em or en dashes; Title
   Case for labels and buttons, sentence case for prose. */

export type Service = {
  slug: string;
  point: "N" | "E" | "S" | "W";
  verb: string;
  name: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  stack: string[];
  steps: { title: string; text: string }[];
  proof: string;
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "software-development",
    point: "N",
    verb: "Build",
    name: "Custom Software Development",
    tagline: "Products that people use every day.",
    summary: "Web applications, SaaS platforms and APIs engineered from the first sketch to production. We design the data model, build the interface and ship software that keeps working as you grow.",
    deliverables: ["Web applications and portals", "Multi-tenant SaaS products", "APIs and third-party integrations", "Admin dashboards and internal tools", "Responsive, mobile-first interfaces", "Design systems for consistent screens"],
    stack: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"],
    steps: [
      { title: "Discover", text: "We map your users, workflows and data before a line of code is written." },
      { title: "Design", text: "Screens and a design system you approve, so there are no surprises later." },
      { title: "Build", text: "Short iterations with working software you can try every week." },
      { title: "Launch", text: "Production rollout, data migration and training for your team." },
    ],
    proof: "GRIT, our school operating system, is 28 modules on one PostgreSQL schema, built and run by our own team.",
    faq: [
      { q: "Can you build a product from scratch?", a: "Yes. We take products from idea to production: discovery, design, engineering, testing, deployment and support." },
      { q: "Can you work on an existing codebase?", a: "Yes. We regularly take over existing systems, stabilise them and redesign them module by module without stopping the business." },
      { q: "Who owns the code?", a: "You do. Source code, designs and documentation are handed over as part of every engagement." },
    ],
  },
  {
    slug: "qa-testing",
    point: "E",
    verb: "Test",
    name: "QA and Test Automation",
    tagline: "Release with confidence, every time.",
    summary: "Functional, regression, performance and security testing, automated wherever it pays. We build test suites that run on every change, so problems are found by us and not by your users.",
    deliverables: ["Test strategy and test plans", "Automated end-to-end suites", "API and integration tests", "Performance and load testing", "Security and access-control reviews", "Accessibility checks"],
    stack: ["Playwright", "pytest", "Cypress", "Postman", "k6", "GitHub Actions"],
    steps: [
      { title: "Assess", text: "We review what you have and where releases tend to break." },
      { title: "Plan", text: "A test strategy that matches your risk, not a generic checklist." },
      { title: "Automate", text: "Suites that run on every change and report in plain language." },
      { title: "Gate", text: "Releases ship only when the gate is green." },
    ],
    proof: "Every GRIT release passes an automated test gate, with a PostgreSQL lane, before it reaches a school.",
    faq: [
      { q: "Can you test software another team built?", a: "Yes. We test independently of who built it, and report findings with clear steps to reproduce." },
      { q: "Do you only do manual testing?", a: "No. We automate the checks worth repeating and keep manual testing for exploration and usability." },
      { q: "Can testing fit into our sprints?", a: "Yes. Our suites run in your pipeline, so every pull request is checked before it merges." },
    ],
  },
  {
    slug: "cloud-and-support",
    point: "S",
    verb: "Run",
    name: "Cloud and Managed Support",
    tagline: "Systems that stay up while you sleep.",
    summary: "Cloud architecture, deployment pipelines and day-to-day support. We set your systems up properly on AWS, automate the releases and keep watch afterwards.",
    deliverables: ["AWS architecture and setup", "Containerised deployments", "CI/CD pipelines", "Backups and disaster recovery", "Monitoring and alerting", "Ongoing support and maintenance"],
    stack: ["AWS ECS Fargate", "Amazon RDS", "Amazon S3", "Docker", "CodeBuild", "CloudWatch"],
    steps: [
      { title: "Review", text: "We look at what you run today, what it costs and what could fail." },
      { title: "Architect", text: "A setup sized for your load, secured and documented." },
      { title: "Automate", text: "Releases that go out the same way every time." },
      { title: "Support", text: "Monitoring, fixes and improvements after go-live." },
    ],
    proof: "GRIT runs on AWS in Hyderabad: containers on ECS Fargate, managed PostgreSQL and encrypted, versioned storage.",
    faq: [
      { q: "Which clouds do you work with?", a: "We work mostly on AWS and can support other providers and private servers as needed." },
      { q: "Can you move us to the cloud?", a: "Yes. We plan migrations so the current system keeps running until the new one is verified." },
      { q: "Do you provide support after launch?", a: "Yes. Support is agreed up front, with response times that match how critical the system is." },
    ],
  },
  {
    slug: "implementation-and-consulting",
    point: "W",
    verb: "Advise",
    name: "Implementation and Consulting",
    tagline: "The right direction, before you spend.",
    summary: "Architecture reviews, UI and UX redesign, digital transformation and rollout. We help you decide what to build, then make sure it lands with the people who use it.",
    deliverables: ["Architecture and code reviews", "UI and UX redesign", "Digital transformation roadmaps", "Security and access reviews", "Data migration", "Rollout and training"],
    stack: ["Architecture reviews", "Design systems", "User research", "Workshops", "Documentation"],
    steps: [
      { title: "Listen", text: "We start with the people who will use the system, not the feature list." },
      { title: "Diagnose", text: "A clear picture of what works, what does not and why." },
      { title: "Recommend", text: "A plan with priorities, costs and trade-offs you can act on." },
      { title: "Deliver", text: "We stay through rollout, so the plan becomes reality." },
    ],
    proof: "Schools move onto GRIT in 2 to 4 days, with their data migrated and every role trained.",
    faq: [
      { q: "Can you review a system we already have?", a: "Yes. We review architecture, code, security and usability, and give you a prioritised list of what to fix." },
      { q: "Do you redesign existing products?", a: "Yes. We redesign interfaces onto a consistent design system, module by module, without a big-bang rewrite." },
      { q: "Do you help with training?", a: "Yes. We train each role on the tasks they do every day, so adoption sticks." },
    ],
  },
];

/* GRIT, True North's product. */
export const GRIT = {
  name: "GRIT",
  tagline: "Smarter. Faster. Better.",
  promise: "One school. One system.",
  summary: "GRIT is the school operating system we built for Indian schools, with an AI timetable generator, an AI question paper generator and a document generator built in. Admissions, fees, attendance, timetables, exams, HR, payroll, transport and WhatsApp parent communication live in one system, with AI that follows the school's rules.",
  /* The three features schools ask about first. Keep claims to what GRIT does. */
  ai: [
    {
      key: "timetable", tag: "AI Timetable Generator", title: "Clash-free timetables, built for you.",
      text: "Google OR-Tools CP-SAT solves the whole school at once, so no teacher, class or room is ever double booked. When a teacher is absent, GRIT finds the cover.",
      points: ["Clash-free for every class and teacher", "Cover for absent teachers, found for you", "Rebuild whenever plans change"],
    },
    {
      key: "paper", tag: "AI Question Paper Generator", title: "Exam papers from your own syllabus.",
      text: "Upload textbooks, past papers or transcripts. Pick the class, subject and marks, and GRIT writes a paper grounded in what you uploaded, with a quality score on every paper.",
      points: ["Grounded in the school's own material", "Question bank and full paper history", "Quality score on every paper"],
      screen: { src: "/screens/question-paper.jpg", alt: "GRIT question paper generator dashboard" },
    },
    {
      key: "docs", tag: "Document Generator", title: "Certificates and letters, filled in for you.",
      text: "Find a student, pick a document and their details fill in automatically. Bonafide and transfer certificates, participation certificates, consent forms and letters, with approvals where you need them.",
      points: ["Student details filled in automatically", "Approval flow before anything is issued", "Circulars and a complete history"],
      screen: { src: "/screens/documents.jpg", alt: "GRIT document generator" },
    },
  ],
  stats: [
    { value: "28", label: "Modules", hint: "in 7 domains" },
    { value: "11", label: "Roles", hint: "each with its own home" },
    { value: "66", label: "Connections", hint: "between modules" },
    { value: "2 to 4", label: "Days", hint: "to go live" },
  ],
  highlights: [
    { title: "One Database", text: "Students, money, staff and messages share one schema, so nothing is typed twice." },
    { title: "Fees and Payroll", text: "Fee collection, receipts and staff payroll run on the same records as everything else." },
    { title: "WhatsApp-First", text: "Absence alerts, receipts and results reach parents the moment they happen." },
    { title: "Governed AI", text: "Ask GRIT answers inside each person's permissions, and never outside the school's own data." },
  ],
  screens: [
    { src: "/screens/dashboard.jpg", label: "Overview", alt: "GRIT overview dashboard" },
    { src: "/screens/question-paper.jpg", label: "Question Papers", alt: "GRIT AI question paper generator" },
    { src: "/screens/collect.jpg", label: "Fee Desk", alt: "GRIT fee collection desk" },
    { src: "/screens/communications.jpg", label: "WhatsApp Inbox", alt: "GRIT WhatsApp parent inbox" },
    { src: "/screens/transport.jpg", label: "Transport", alt: "GRIT fleet and transport overview" },
    { src: "/screens/marks.jpg", label: "Exams", alt: "GRIT marks and exams" },
    { src: "/screens/documents.jpg", label: "Documents", alt: "GRIT document desk" },
  ],
};

/* Real feedback only. Add new entries as clients give permission. */
export const TESTIMONIALS = [
  {
    quote: "The new interface is simple and easy to use. Compared to what we had before, it is much clearer and easier to navigate.",
    who: "KenBridge School",
    role: "On the redesigned GRIT, October 2026",
  },
];

export const PROCESS = [
  { point: "N", title: "Consult", text: "We understand the problem, the people and the constraints before proposing anything." },
  { point: "E", title: "Build", text: "Working software every week, designed and engineered to last." },
  { point: "S", title: "Test", text: "Automated checks on every change, so releases are uneventful." },
  { point: "W", title: "Run", text: "Deployment, monitoring and support after go-live." },
];

export const PRINCIPLES = [
  { title: "We Run What We Build", text: "GRIT is our own product, used by a school every day. We know what production asks of software because we live with it." },
  { title: "Correct Before Clever", text: "Sound data models, real tests and honest estimates come before features and buzzwords." },
  { title: "Founder-Led", text: "You work directly with the people who design and build your system, not a chain of account managers." },
  { title: "Rooted in India", text: "With offices in Tirunelveli, Chennai and Coimbatore, building for Indian organisations and for clients beyond." },
];

/* The stack, grouped by what it does for a client. Only tools we use. */
export const STACK = [
  { key: "cloud", title: "Cloud Infrastructure", tools: "AWS, Docker, CI/CD" },
  { key: "web", title: "Web Applications", tools: "React, Next.js, TypeScript" },
  { key: "api", title: "APIs and Services", tools: "Python, FastAPI, Node.js" },
  { key: "data", title: "Data Platforms", tools: "PostgreSQL, Redis" },
  { key: "ai", title: "AI and Optimisation", tools: "LLMs, RAG, OR\u2011Tools" },
  { key: "quality", title: "Quality Engineering", tools: "Playwright, pytest, GitHub Actions" },
];

export const FAQ = [
  { q: "What does True North do?", a: "We build, test and run software for organisations, and we build our own products. GRIT, our school operating system, is the best example of how we work." },
  { q: "Where are you based?", a: "We have offices in Tirunelveli, Chennai and Coimbatore, in Tamil Nadu, India. We work with clients in person and remotely." },
  { q: "How do engagements start?", a: "With a short call about the problem. We follow up with a written proposal covering scope, timeline and cost." },
  { q: "Do you work with small organisations?", a: "Yes. We work with organisations of every size and match the engagement to what you need." },
  { q: "Who owns what you build for us?", a: "You do. Code, designs and documentation are handed over as part of the engagement." },
];

export const NAV = [
  { label: "Services", href: "/services/" },
  { label: "GRIT", href: "/grit/" },
  { label: "How We Work", href: "/#process" },
  { label: "About", href: "/about/" },
];
