import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, Minimize2, Loader2, ChevronDown } from 'lucide-react';
import { API_URL } from '../config/api';

/* ─── Session ID ──────────────────────────────────────────────────────── */
function getSessionId() {
  const key = 'tn_chat_session';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

/* ─── Knowledge Base (client-side) ───────────────────────────────────── */
const KB = [
  {
    tags: ['hello', 'hi', 'hey', 'greet', 'morning', 'evening', 'start', 'good day'],
    reply: "👋 Hi there! Welcome to **True North IT Consultancy**.\n\nI'm TrueBot — I can help you explore our services, answer questions, or connect you with our team. What can I help you with today?",
  },
  {
    tags: ['service', 'offer', 'provide', 'solution', 'what do you do', 'capabilities'],
    reply: "True North offers four core service pillars:\n\n🚀 **Software Engineering** — Custom web & SaaS platforms\n🔐 **Cybersecurity & QA** — Penetration testing & test automation\n☁️ **Cloud & DevOps** — AWS, Azure, GCP, Docker, Kubernetes\n📊 **IT Consulting** — Digital strategy & managed IT support\n\nWant to dive deeper into any of these?",
  },
  {
    tags: ['software', 'development', 'web', 'app', 'saas', 'platform', 'build', 'custom', 'react', 'node', 'frontend', 'backend'],
    reply: "Our **Software Engineering** team builds:\n\n• Custom web apps & portals\n• SaaS products with multi-tenant architecture\n• API design, integration & microservices\n• React, Next.js, Node.js, Go & Python stacks\n\nEvery solution is engineered code-first — no bloated builders. 💡 Ready to discuss your project? [Get in touch](/contact).",
  },
  {
    tags: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci', 'cd', 'deploy', 'infrastructure', 'pipeline'],
    reply: "Our **Cloud & DevOps** practice covers:\n\n☁️ Multi-cloud architecture (AWS / Azure / GCP)\n🐳 Containerisation with Docker & Kubernetes\n⚙️ CI/CD pipeline automation\n📈 Infrastructure as Code (Terraform, Pulumi)\n\nWe design for **99.9% uptime** and zero-downtime deployments.",
  },
  {
    tags: ['security', 'cyber', 'pentest', 'penetration', 'qa', 'quality', 'test', 'audit', 'vulnerability', 'assurance', 'bug'],
    reply: "Our **Cybersecurity & QA** services include:\n\n🔐 Penetration testing & vulnerability assessments\n🧪 Automated & manual QA (Cypress, Playwright, Selenium)\n📋 Security audits on every production release\n🔍 Performance & regression testing\n\nWe catch critical issues before your users do.",
  },
  {
    tags: ['consult', 'strategy', 'advice', 'plan', 'digital', 'transform', 'manage', 'it consulting', 'roadmap'],
    reply: "Our **IT Consulting** team helps you:\n\n📐 Define digital transformation roadmaps\n🏗️ Architect scalable infrastructure\n📊 Build BI dashboards & data pipelines\n🤝 Provide SLA-backed managed IT support\n\nWe embed with your team to understand your exact business needs — not just deliver off a template.",
  },
  {
    tags: ['experience', 'expertise', 'year', 'history', 'how long', 'background', 'senior', 'team'],
    reply: "True North is backed by **60+ years of combined hands-on IT experience** across our leadership team.\n\nWe're a **founder-led engineering consultancy** — meaning senior engineers are involved in every project, not just in oversight. Quality is non-negotiable at every layer.",
  },
  {
    tags: ['price', 'cost', 'rate', 'quote', 'pricing', 'budget', 'charge', 'fee', 'how much', 'invoice'],
    reply: "Pricing depends on scope, team size, and duration. We offer:\n\n• **Project-based** — fixed-price engagements\n• **Retainer / SLA** — monthly support packages\n• **Staff augmentation** — hourly or daily rates\n\nFor an accurate quote, please 📬 [contact our team](/contact) — we respond within **24 business hours**.",
  },
  {
    tags: ['contact', 'reach', 'email', 'phone', 'talk', 'speak', 'human', 'person', 'team', 'get in touch', 'enquire'],
    reply: "You can reach us via our 📬 **[Contact page](/contact)**.\n\nFill in your details and a consultant will respond within **24 business hours**.\n\nOr explore:\n• 🛠️ [Services](/services)\n• 📖 [Blog](/blog)\n• 💼 [Case Studies](/case-studies)",
  },
  {
    tags: ['industry', 'sector', 'client', 'who', 'serve', 'work with', 'domain', 'vertical'],
    reply: "We work with clients across:\n\n🛒 Retail & e-commerce\n🏥 Healthcare administration\n💼 Professional services\n💻 Technology companies\n🌍 Startups to established enterprises\n\nWe serve clients **globally** — UK, Europe, North America, and beyond.",
  },
  {
    tags: ['uptime', 'sla', 'support', 'maintenance', 'reliability', 'available', '24/7', 'monitoring', 'downtime'],
    reply: "True North offers **SLA-backed support** with:\n\n✅ **99.9% uptime** guarantee\n⚡ Rapid issue resolution\n🔄 24/7 monitoring on critical systems\n📋 Regular performance optimisation cycles\n\nWe stay engaged long after launch — not just at delivery.",
  },
  {
    tags: ['career', 'job', 'hire', 'join', 'position', 'vacancy', 'work', 'employment', 'apply', 'opening', 'recruitment'],
    reply: "We're always looking for exceptional talent! True North welcomes:\n\n💻 Full-stack engineers\n🔐 Security & QA specialists\n☁️ DevOps / cloud architects\n📊 IT consultants\n\nCheck out our 🚀 **[Careers page](/careers)** for current openings.",
  },
  {
    tags: ['testimonial', 'review', 'feedback', 'client said', 'trust', 'story', 'rating'],
    reply: "Our clients speak for us!\n\n⭐ *\"True North delivered our platform ahead of schedule and above quality expectations.\"*\n— Arjun Mehta, CTO NovaSoft Technologies\n\n⭐ *\"Six months, zero downtime. Their SLA-backed support has been a game-changer.\"*\n— Ravi Shankar, Director of Operations, Pinnacle Retail\n\nRead all reviews on our **[Testimonials page](/testimonials)**.",
  },
  {
    tags: ['blog', 'article', 'read', 'insight', 'news', 'post', 'guide', 'tutorial'],
    reply: "We publish engineering insights, industry commentary, and practical tech guides on our **[Blog](/blog)**.\n\nWorth a read if you're exploring cloud, DevOps, or software architecture trends. 📖",
  },
  {
    tags: ['case study', 'portfolio', 'project', 'example', 'work done', 'past', 'showcase', 'result'],
    reply: "Browse our **[Case Studies](/case-studies)** to see real-world results we've delivered — from SaaS platforms to enterprise infrastructure overhauls.\n\nEach study includes scope, tech stack, and measurable outcomes. 📊",
  },
  {
    tags: ['location', 'where', 'based', 'office', 'india', 'uk', 'global', 'remote', 'timezone'],
    reply: "True North is a **global consultancy** with delivery standards built for international markets.\n\nWe serve clients across **India, the UK, Europe, and North America** — working remotely and on-site as required. 🌍",
  },
  {
    tags: ['process', 'methodology', 'approach', 'how', 'step', 'workflow', 'delivery', 'method'],
    reply: "Our proven delivery methodology:\n\n1️⃣ **Consult** — Understand your goals & bottlenecks\n2️⃣ **Build** — Engineer scalable, production-ready solutions\n3️⃣ **Test** — Rigorous QA before every release\n4️⃣ **Implement** — Smooth deployment & knowledge transfer\n\nNo templates — every engagement is tailored to your specific needs.",
  },
  {
    tags: ['technology', 'tech stack', 'tools', 'framework', 'language', 'programming', 'stack'],
    reply: "Our full-stack technology expertise:\n\n☁️ **Cloud** — AWS, Azure, GCP\n⚛️ **Frontend** — React, Next.js, Vue\n⚡ **Backend** — Node.js, Go, Python\n🗄️ **Database** — MongoDB, PostgreSQL\n🧪 **QA** — Cypress, Playwright, Selenium\n🐳 **DevOps** — Docker, Kubernetes, Terraform",
  },
  {
    tags: ['about', 'who are you', 'company', 'true north', 'what is', 'overview'],
    reply: "**True North IT Consultancy** is a global, founder-led engineering firm with **60+ years of combined hands-on IT experience**.\n\nWe specialise in:\n• Software Engineering\n• Cloud & DevOps\n• Cybersecurity & QA\n• Strategic IT Consulting\n\nWe serve clients in the UK, Europe, North America, and beyond — delivering world-class digital infrastructure. 🌐",
  },
  {
    tags: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'good', 'excellent', 'bye', 'goodbye', 'helpful', 'cheers'],
    reply: "Thank you for chatting with us! 😊\n\nIf you have more questions or are ready to start a project, visit our **[Contact page](/contact)**.\n\nHave a great day! 🚀",
  },
];

/* ─── Client-side KB matcher ──────────────────────────────────────────── */
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

  return "I'm not sure I have the perfect answer for that right now — but our team definitely does! 😊\n\nPlease visit our **[Contact page](/contact)** and a consultant will respond within 24 hours.\n\nOr explore:\n• 🛠️ [Services](/services)\n• 📖 [Blog](/blog)\n• 💼 [Case Studies](/case-studies)";
}

/* ─── Save conversation to backend (fire-and-forget) ─────────────────── */
async function saveToBackend(userMsg, botReply, sid) {
  try {
    await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg, reply: botReply, sessionId: sid }),
    });
  } catch {
    // Silent — backend is optional; chatbot always works
  }
}

/* ─── Quick-reply chips ──────────────────────────────────────────────── */
const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does it cost?',
  'Tell me about your process',
  'How can I contact you?',
  "I'm looking for a job",
];

/* ─── Typing bubble ──────────────────────────────────────────────────── */
function TypingBubble() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="w-7 h-7 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
        <Bot size={13} className="text-brand-red" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-bg-secondary border border-border-subtle max-w-[75%]">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-text-secondary"
              style={{ animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Rich text renderer (bold + internal/external links) ────────────── */
function RichText({ text }) {
  const lines = text.split('\n');
  return (
    <span>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {renderInline(line)}
        </React.Fragment>
      ))}
    </span>
  );
}

function renderInline(line) {
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));

    if (match[0].startsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-text-primary">
          {match[2]}
        </strong>
      );
    } else {
      const href = match[4];
      const label = match[3];
      if (href.startsWith('/')) {
        parts.push(
          <Link key={match.index} to={href} className="text-brand-red underline underline-offset-2 hover:opacity-80 transition-opacity">
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-red underline underline-offset-2 hover:opacity-80 transition-opacity">
            {label}
          </a>
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts;
}

/* ─── Main Component ─────────────────────────────────────────────────── */
const Chatbot = () => {
  const [open, setOpen]           = useState(false);
  const [input, setInput]         = useState('');
  const [messages, setMessages]   = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm **TrueBot**, your True North IT assistant.\n\nAsk me about our **services**, **pricing**, **process**, or anything else. How can I help?",
      id: 'welcome',
    },
  ]);
  const [loading, setLoading]     = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [unread, setUnread]       = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const scrollRef  = useRef(null);
  const sessionId  = useRef(getSessionId());

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScroll(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  /* ── Send handler: KB reply is instant, backend save is background ── */
  const send = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    setShowQuick(false);
    setMessages(prev => [...prev, { role: 'user', text: msg, id: Date.now() }]);
    setLoading(true);

    // Simulate a brief typing delay (400–700 ms) so it feels natural
    const delay = 400 + Math.floor(Math.random() * 300);
    await new Promise(res => setTimeout(res, delay));

    // Get reply from local KB — always works, zero network dependency
    const reply = getBotReply(msg);

    setMessages(prev => [...prev, { role: 'bot', text: reply, id: Date.now() + 1 }]);
    if (!open) setUnread(u => u + 1);
    setLoading(false);

    // Persist to backend silently (won't block or error the UI)
    saveToBackend(msg, reply, sessionId.current);
  }, [input, loading, open]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── Injected keyframes ───────────────────────────────────────── */}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes chatPop {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .chat-msg    { animation: chatPop 0.25s ease forwards; }
        .chat-window { animation: chatSlideUp 0.3s cubic-bezier(.34,1.56,.64,1) forwards; }
      `}</style>

      {/* ── Floating trigger button ──────────────────────────────────── */}
      <button
        id="chatbot-trigger"
        aria-label="Open chat assistant"
        onClick={() => { setOpen(o => !o); setUnread(0); }}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-brand-red text-[10px] font-black rounded-full flex items-center justify-center shadow">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat window ─────────────────────────────────────────────── */}
      {open && (
        <div
          className="chat-window fixed bottom-24 right-6 z-[99] w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border-subtle"
          style={{ height: '520px', background: 'var(--color-bg-primary)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-brand-red shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">TrueBot</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <p className="text-white/70 text-[11px]">True North IT Assistant · Online</p>
              </div>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <Minimize2 size={13} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            style={{ overscrollBehavior: 'contain' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-msg flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-brand-red" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[78%] ${
                    msg.role === 'user'
                      ? 'bg-brand-red text-white rounded-br-sm'
                      : 'bg-bg-secondary border border-border-subtle text-text-primary rounded-bl-sm'
                  }`}
                >
                  <RichText text={msg.text} />
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center shrink-0">
                    <User size={13} className="text-text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {loading && <TypingBubble />}

            {/* Quick-reply chips (shown only on first open) */}
            {showQuick && !loading && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold px-1">Quick questions</p>
                {QUICK_REPLIES.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left text-xs px-3 py-2.5 rounded-xl border border-border-subtle bg-bg-secondary hover:border-brand-red/40 hover:bg-brand-red/5 text-text-secondary hover:text-text-primary transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Scroll-down hint */}
          {showScroll && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-20 right-4 w-7 h-7 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center shadow hover:border-brand-red/40 transition-colors"
            >
              <ChevronDown size={14} className="text-text-secondary" />
            </button>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-border-subtle bg-bg-secondary shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                id="chatbot-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                maxLength={500}
                disabled={loading}
                className="flex-1 bg-bg-primary text-text-primary text-sm px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-red/50 transition-colors placeholder:text-text-secondary disabled:opacity-50"
              />
              <button
                id="chatbot-send"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center disabled:opacity-40 hover:bg-red-700 active:scale-95 transition-all duration-200 shrink-0"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="text-[10px] text-text-secondary mt-2 text-center">
              True North IT Consultancy ·{' '}
              <Link to="/privacy" className="underline hover:text-text-primary transition-colors">Privacy</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
