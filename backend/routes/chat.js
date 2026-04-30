const express = require('express');
const router  = express.Router();
const ChatMessage = require('../models/ChatMessage');
const auth = require('../middleware/auth');

/* ─────────────────────────────────────────────────────────────────────── */
/* Knowledge base — True North IT Consultancy                              */
/* ─────────────────────────────────────────────────────────────────────── */
const KB = [
  {
    tags: ['hello', 'hi', 'hey', 'greet', 'morning', 'evening', 'start'],
    reply: "Hi there! 👋 Welcome to **True North IT Consultancy**. I'm here to help you explore our services, answer questions, or connect you with our team. What can I help you with today?"
  },
  {
    tags: ['services', 'offer', 'do', 'what', 'provide', 'solutions'],
    reply: "True North offers four core service pillars:\n\n🚀 **Software Engineering** — Custom web & SaaS platforms\n🔐 **Cybersecurity & QA** — Penetration testing & test automation\n☁️ **Cloud & DevOps** — AWS, Azure, GCP, Docker, Kubernetes\n📊 **IT Consulting** — Digital strategy & managed IT support\n\nWould you like to dive deeper into any of these?"
  },
  {
    tags: ['software', 'development', 'web', 'app', 'saas', 'platform', 'build', 'custom'],
    reply: "Our **Software Engineering** team builds:\n\n• Custom web applications & portals\n• SaaS products with multi-tenant architecture\n• API design, integration & microservices\n• React, Next.js, Node.js, Go & Python stacks\n\nEvery solution is engineered code-first — no bloated builders. Want to discuss your project?"
  },
  {
    tags: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci', 'cd', 'deploy'],
    reply: "Our **Cloud & DevOps** practice covers:\n\n☁️ Multi-cloud architecture (AWS / Azure / GCP)\n🐳 Containerisation with Docker & Kubernetes\n⚙️ CI/CD pipeline automation\n📈 Infrastructure as Code (Terraform, Pulumi)\n\nWe design for 99.9% uptime and zero-downtime deployments."
  },
  {
    tags: ['security', 'cyber', 'pentest', 'penetration', 'qa', 'quality', 'test', 'audit', 'vulnerability'],
    reply: "Our **Cybersecurity & QA** services include:\n\n🔐 Penetration testing & vulnerability assessments\n🧪 Automated & manual QA (Cypress, Playwright, Selenium)\n📋 Security audits on every production release\n🔍 Performance & regression testing\n\nWe catch critical issues before your users do. Interested?"
  },
  {
    tags: ['consult', 'strategy', 'advice', 'plan', 'digital', 'transform', 'manage'],
    reply: "Our **IT Consulting** team helps you:\n\n📐 Define digital transformation roadmaps\n🏗️ Architect scalable infrastructure\n📊 Build BI dashboards & data pipelines\n🤝 Provide SLA-backed managed IT support\n\nWe embed with your team to understand your exact business needs."
  },
  {
    tags: ['experience', 'expertise', 'year', 'history', 'how long', 'background'],
    reply: "True North is backed by **60+ years of combined hands-on IT experience** across our leadership team. We're an emerging high-performance consultancy with founder-led engineering — meaning senior engineers are involved in every project, not just oversight."
  },
  {
    tags: ['price', 'cost', 'rate', 'quote', 'pricing', 'budget', 'charge', 'fee'],
    reply: "Pricing varies based on scope, team size, and duration. We offer:\n\n• **Project-based** fixed-price engagements\n• **Retainer/SLA** monthly support packages\n• **Staff augmentation** hourly rates\n\nFor an accurate quote, please 📬 [contact our team](/contact) or drop your details and we'll be in touch within 24 hours."
  },
  {
    tags: ['contact', 'reach', 'email', 'phone', 'talk', 'speak', 'human', 'person', 'team'],
    reply: "You can reach us through our 📬 **[Contact page](/contact)** — fill in your details and a consultant will respond within **24 business hours**.\n\nAlternatively, you can explore our work on the [Services page](/services) or browse [Case Studies](/case-studies)."
  },
  {
    tags: ['industry', 'sector', 'client', 'who', 'serve', 'work with'],
    reply: "We work with clients across:\n\n🛒 Retail & e-commerce\n🏥 Healthcare administration\n💼 Professional services\n💻 Technology companies\n🌍 Startups to established enterprises\n\nWe serve clients **globally** — UK, Europe, North America and beyond."
  },
  {
    tags: ['uptime', 'sla', 'support', 'maintenance', 'reliability', 'available', '24/7'],
    reply: "True North offers **SLA-backed support** with:\n\n✅ 99.9% uptime guarantee\n⚡ Rapid issue resolution\n🔄 24/7 monitoring on critical systems\n📋 Regular performance optimisation cycles\n\nWe stay engaged long after launch — not just delivery."
  },
  {
    tags: ['career', 'job', 'hire', 'join', 'position', 'vacancy', 'work', 'employment'],
    reply: "We're always looking for exceptional talent! True North welcomes:\n\n💻 Full-stack engineers\n🔐 Security & QA specialists\n☁️ DevOps / cloud architects\n📊 IT consultants\n\nCheck out our 🚀 **[Careers page](/careers)** for current openings and to submit your application."
  },
  {
    tags: ['testimonial', 'review', 'feedback', 'client said', 'trust', 'story'],
    reply: "Our clients speak for us! Here's a quick snapshot:\n\n⭐ *\"True North delivered our platform ahead of schedule and above quality expectations.\"* — Arjun Mehta, CTO NovaSoft\n\n⭐ *\"Six months, zero downtime. Their SLA-backed support has been a game-changer.\"* — Ravi Shankar, Director of Operations\n\nRead all stories on our **[Testimonials page](/testimonials)**."
  },
  {
    tags: ['blog', 'article', 'read', 'insight', 'news', 'post'],
    reply: "We publish engineering insights, industry commentary, and practical tech guides on our **[Blog](/blog)**. Worth a read if you're exploring cloud, DevOps, or software architecture trends."
  },
  {
    tags: ['case study', 'portfolio', 'project', 'example', 'work done', 'past'],
    reply: "Browse our **[Case Studies](/case-studies)** to see real-world results we've delivered — from SaaS platforms to enterprise infrastructure overhauls. Each study includes scope, tech stack, and measurable outcomes."
  },
  {
    tags: ['location', 'where', 'based', 'office', 'india', 'uk', 'global'],
    reply: "True North is a **global consultancy** with delivery standards built for international markets. We serve clients across **India, the UK, Europe, and North America** — working remotely and on-site as required."
  },
  {
    tags: ['process', 'methodology', 'approach', 'how', 'step', 'workflow'],
    reply: "Our proven delivery methodology:\n\n1️⃣ **Consult** — Understand your goals & bottlenecks\n2️⃣ **Build** — Engineer scalable, production-ready solutions\n3️⃣ **Test** — Rigorous QA before every release\n4️⃣ **Implement** — Smooth deployment & knowledge transfer\n\nNo templates — every engagement is tailored to your specific needs."
  },
  {
    tags: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'good', 'excellent', 'bye', 'goodbye'],
    reply: "Thank you for chatting with us! 😊 If you have more questions or are ready to start a project, head over to our **[Contact page](/contact)**. Have a great day! 🚀"
  },
];

/* ─────────────────────────────────────────────────────────────────────── */
/* Helper: pick best response                                               */
/* ─────────────────────────────────────────────────────────────────────── */
function getBotReply(userMsg) {
  const lower = userMsg.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KB) {
    const score = entry.tags.filter(tag => lower.includes(tag)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.reply;

  return "I'm not sure I have the perfect answer for that right now, but our team definitely does! 😊\n\nPlease visit our **[Contact page](/contact)** and a consultant will get back to you within 24 hours. You can also explore:\n\n• 🛠️ [Services](/services)\n• 📖 [Blog](/blog)\n• 💼 [Case Studies](/case-studies)";
}

/* ─────────────────────────────────────────────────────────────────────── */
/* POST /api/chat  — persistence endpoint                                   */
/* Frontend computes replies client-side; backend just stores them.         */
/* ─────────────────────────────────────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { message, reply: clientReply, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId is required' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Persist user message
    await ChatMessage.create({
      sessionId,
      role: 'user',
      message: message.trim(),
      ip,
      userAgent,
    });

    const reply = clientReply || getBotReply(message.trim());

    // Persist bot reply
    await ChatMessage.create({
      sessionId,
      role: 'bot',
      message: reply,
      ip,
      userAgent,
    });

    return res.json({ success: true, reply });
  } catch (err) {
    console.error('[Chat] Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

/* ─────────────────────────────────────────────────────────────────────── */
/* GET /api/chat/admin/sessions — admin: list session IDs                  */
/* ─────────────────────────────────────────────────────────────────────── */
router.get('/admin/sessions', auth, async (req, res) => {
  try {
    const sessions = await ChatMessage.aggregate([
      { $group: { _id: '$sessionId', lastMessage: { $max: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { lastMessage: -1 } },
      { $limit: 100 },
    ]);
    res.json({ success: true, data: sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/* ─────────────────────────────────────────────────────────────────────── */
/* GET /api/chat/admin/session/:id — admin: full conversation               */
/* ─────────────────────────────────────────────────────────────────────── */
router.get('/admin/session/:id', auth, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.id }).sort({ createdAt: 1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/* ─────────────────────────────────────────────────────────────────────── */
/* DELETE /api/chat/admin/session/:id — admin: delete a session             */
/* ─────────────────────────────────────────────────────────────────────── */
router.delete('/admin/session/:id', auth, async (req, res) => {
  try {
    await ChatMessage.deleteMany({ sessionId: req.params.id });
    res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
