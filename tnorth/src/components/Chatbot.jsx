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

/* ─── Knowledge Base (client-side, 35+ topics) ───────────────────────── */
const KB = [
  {
    tags: ['hello', 'hi', 'hey', 'greet', 'morning', 'evening', 'start', 'good day'],
    reply: "👋 Hi there! Welcome to **True North IT Consultancy**.\n\nI'm TrueBot. What can I help you with today?",
    suggestions: ['What services do you offer?', 'How much does it cost?', 'Contact Sales']
  },
  {
    tags: ['service', 'offer', 'provide', 'solution', 'what do you do', 'capabilities'],
    reply: "We offer **Software Engineering**, **Cybersecurity & QA**, **Cloud & DevOps**, and **IT Consulting**. Which area interests you?",
    suggestions: ['Software Engineering', 'Cloud & DevOps', 'Cybersecurity', 'IT Consulting']
  },
  {
    tags: ['software engineering', 'web development', 'app development', 'saas', 'custom software', 'react', 'node', 'build app', 'custom app'],
    reply: "We build custom web apps, SaaS products, and APIs using modern stacks (React, Node, Go). Ready to discuss a project?",
    suggestions: ['Get a Quote', 'View Case Studies']
  },
  {
    tags: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'cloud migration', 'infrastructure'],
    reply: "Our Cloud & DevOps team handles multi-cloud architecture, CI/CD, and infrastructure as code. Want to know about our SLAs?",
    suggestions: ['SLA Details', 'Consulting Services']
  },
  {
    tags: ['security', 'cybersecurity', 'pentest', 'penetration testing', 'qa', 'automated testing', 'audit', 'vulnerability', 'test'],
    reply: "We provide penetration testing, security audits, and automated QA to ensure your platform is rock solid and secure.",
    suggestions: ['Security Audits', 'Pricing']
  },
  {
    tags: ['consulting', 'digital strategy', 'it consulting', 'transformation roadmap', 'advice', 'strategy'],
    reply: "Our IT Consulting helps you define digital roadmaps and architect scalable infrastructure. How can we advise you today?",
    suggestions: ['How does the process work?', 'Contact Us']
  },
  {
    tags: ['price', 'cost', 'rate', 'quote', 'pricing', 'budget', 'charge', 'how much', 'estimate'],
    reply: "Pricing depends on scope and engagement model (Project, Retainer, or Staff Augmentation). Would you like a custom quote?",
    suggestions: ['Get a Quote', 'Contact Sales']
  },
  {
    tags: ['contact', 'reach', 'email', 'phone', 'speak to a human', 'support team', 'get in touch'],
    reply: "You can reach us directly via our **[Contact page](/contact)**, or I can take your details right now to have someone call you back.",
    suggestions: ['Leave details here', 'Go to Contact page']
  },
  {
    tags: ['leave details here', 'connect me', 'get a quote', 'contact sales', 'start project', 'hire you'],
    reply: "Great! Please fill out this short form and our sales team will reach out within 24 hours.",
    type: 'lead_form',
    suggestions: []
  },
  {
    tags: ['career', 'job', 'hiring', 'vacancy', 'apply', 'work for', 'openings'],
    reply: "We're always looking for top talent! Check our **[Careers page](/careers)** for current openings in Engineering and Consulting.",
    suggestions: ['Company Culture', 'Our Services']
  },
  {
    tags: ['testimonial', 'review', 'client feedback', 'ratings', 'success story'],
    reply: "Our clients love us! Check out our **[Testimonials page](/testimonials)** to see how we've helped companies scale seamlessly.",
    suggestions: ['Case Studies', 'What services do you offer?']
  },
  {
    tags: ['blog', 'articles', 'news', 'insights'],
    reply: "Our engineering **[Blog](/blog)** covers industry trends, technical guides, and company news.",
    suggestions: ['Software Engineering', 'Cloud & DevOps']
  },
  {
    tags: ['case study', 'portfolio', 'past work', 'examples', 'showcase'],
    reply: "We've delivered everything from SaaS platforms to enterprise cloud migrations. Browse our **[Case Studies](/case-studies)** for details.",
    suggestions: ['Get a Quote', 'Services']
  },
  {
    tags: ['location', 'where are you', 'office', 'headquarters', 'global', 'based'],
    reply: "We are a global consultancy, serving clients across the UK, Europe, North America, and India. 🌍",
    suggestions: ['Contact Us', 'About Us']
  },
  {
    tags: ['process', 'methodology', 'how you work', 'agile', 'waterfall', 'approach'],
    reply: "We use an Agile, consultative approach:\n\n1️⃣ **Consult**\n2️⃣ **Build**\n3️⃣ **Test**\n4️⃣ **Implement**\n\nNo templates — everything is tailored.",
    suggestions: ['Technology Stack', 'Pricing']
  },
  {
    tags: ['tech stack', 'technology', 'tools', 'languages', 'frameworks'],
    reply: "We specialize in React, Next.js, Node.js, Python, Go, AWS, Azure, Docker, and Kubernetes.",
    suggestions: ['Software Engineering', 'Cloud & DevOps']
  },
  {
    tags: ['about', 'company history', 'who are you', 'experience'],
    reply: "True North IT is a founder-led consultancy with **60+ years of combined experience** delivering enterprise solutions.",
    suggestions: ['Leadership Team', 'Our Services']
  },
  {
    tags: ['thank', 'thanks', 'bye', 'goodbye', 'appreciate it', 'cheers'],
    reply: "You're welcome! Feel free to ask if anything else comes up. Have a great day! 🚀",
    suggestions: ['Start over']
  },
  {
    tags: ['start over', 'reset', 'menu', 'main menu'],
    reply: "Back to the start! What can I help you with?",
    suggestions: ['What services do you offer?', 'How much does it cost?', 'Contact Sales']
  },
  {
    tags: ['managed services', 'maintenance', 'ongoing support'],
    reply: "We offer SLA-backed managed services to keep your systems updated, secure, and performant 24/7.",
    suggestions: ['SLA Details', 'Pricing']
  },
  {
    tags: ['data', 'analytics', 'bi', 'business intelligence', 'data pipeline'],
    reply: "Our data engineers build robust pipelines and BI dashboards to help you make data-driven decisions.",
    suggestions: ['IT Consulting', 'Case Studies']
  },
  {
    tags: ['mobile app', 'ios', 'android', 'react native', 'flutter'],
    reply: "We build high-performance cross-platform mobile applications using React Native and Flutter.",
    suggestions: ['Software Engineering', 'Get a Quote']
  },
  {
    tags: ['ui', 'ux', 'design', 'user interface', 'user experience'],
    reply: "Our UI/UX team creates intuitive, beautiful, and highly responsive digital experiences.",
    suggestions: ['Web Development', 'Mobile Apps']
  },
  {
    tags: ['startup', 'mvp', 'seed stage', 'early stage'],
    reply: "We help startups accelerate their MVP development with scalable architectures so they can pitch and pivot faster.",
    suggestions: ['Get a Quote', 'Process']
  },
  {
    tags: ['enterprise', 'corporate', 'large scale', 'b2b solutions'],
    reply: "We partner with enterprises to modernize legacy systems and manage large-scale cloud deployments securely.",
    suggestions: ['Legacy Modernization', 'Security Audits']
  },
  {
    tags: ['api', 'integration', 'microservices', 'rest', 'graphql'],
    reply: "We design and build secure, scalable APIs (REST & GraphQL) and microservices to integrate your systems seamlessly.",
    suggestions: ['Tech Stack', 'Cloud & DevOps']
  },
  {
    tags: ['legacy modernization', 'tech debt', 'refactoring', 'upgrade system'],
    reply: "We safely modernize legacy applications, migrating them to cloud-native architectures with zero downtime.",
    suggestions: ['Cloud Migration', 'Enterprise Solutions']
  },
  {
    tags: ['compliance', 'iso', 'gdpr', 'hipaa', 'soc2'],
    reply: "We build systems compliant with global standards including GDPR, HIPAA, and SOC2, backed by rigorous security audits.",
    suggestions: ['Security Audits', 'Cloud Infrastructure']
  },
  {
    tags: ['team size', 'how many people', 'employees'],
    reply: "We have a curated team of senior engineers, architects, and consultants dedicated to high-quality delivery. We don't offshore to juniors.",
    suggestions: ['Company Culture', 'Careers']
  },
  {
    tags: ['culture', 'values', 'work environment'],
    reply: "Our culture is rooted in engineering excellence, transparency, and a flat hierarchy that empowers our team to innovate.",
    suggestions: ['Careers', 'About Us']
  },
  {
    tags: ['partnership', 'partner with us', 'vendor', 'outsource'],
    reply: "We act as strategic technology partners, embedding deeply with your team rather than just acting as external vendors.",
    suggestions: ['Consulting', 'Process']
  },
  {
    tags: ['sla details', 'service level agreement', 'uptime guarantee', 'response time', 'sla'],
    reply: "Our standard SLA includes a **99.9% uptime guarantee**, 24/7 monitoring, and rapid response times for critical issues.",
    suggestions: ['Managed Services', 'Contact Sales']
  },
  {
    tags: ['security audits', 'vulnerability scan', 'penetration testing details'],
    reply: "Our security audits encompass automated scanning, manual penetration testing, and code-level vulnerability reviews.",
    suggestions: ['Compliance', 'Cybersecurity']
  },
  {
    tags: ['cloud migration', 'move to cloud', 'aws migration', 'azure migration'],
    reply: "We handle seamless migrations from on-premise to AWS, Azure, or GCP, minimizing risk and maximizing cost efficiency.",
    suggestions: ['Cloud & DevOps', 'Case Studies']
  },
  {
    tags: ['performance optimization', 'speed up app', 'load time', 'scaling issue', 'slow'],
    reply: "If your app is slow or crashing under load, our engineers can profile, optimize, and scale your infrastructure.",
    suggestions: ['Tech Stack', 'Get a Quote']
  },
  {
    tags: ['seo', 'digital marketing', 'search engine', 'ranking'],
    reply: "While our core is engineering, we ensure all web platforms are technically optimized for maximum SEO performance (Core Web Vitals).",
    suggestions: ['Web Development', 'Performance Optimization']
  },
  {
    tags: ['leadership', 'founders', 'management', 'directors'],
    reply: "Our leadership team comprises veteran technologists with decades of experience who actively participate in architecture and project oversight.",
    suggestions: ['About Us', 'Contact Us']
  }
];

/* ─── Client-side KB matcher (Smarter multi-word scoring) ────────────── */
function getBotReply(userMsg) {
  const lower = userMsg.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const tag of entry.tags) {
      if (lower.includes(tag)) {
        const words = tag.split(' ').length;
        // Phrase matching gets exponentially higher points
        score += words === 1 ? 1 : words * 5; 
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch;

  return {
    reply: "I'm not completely sure about that. Would you like me to connect you with our team so they can help?",
    suggestions: ['Leave details here', 'Go to Contact page', 'What services do you offer?']
  };
}

/* ─── Save conversation to backend (fire-and-forget) ─────────────────── */
async function saveToBackend(userMsg, botReplyText, sid) {
  try {
    await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg, reply: botReplyText, sessionId: sid }),
    });
  } catch {
    // Silent
  }
}

/* ─── Lead Form Component ────────────────────────────────────────────── */
function LeadForm({ onSubmit, disabled }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form 
      onSubmit={(e) => { 
        e.preventDefault(); 
        if (!disabled) onSubmit({name, email, message}); 
      }} 
      className="flex flex-col gap-2 mt-2 w-full max-w-[240px] bg-bg-primary p-3 rounded-xl border border-border-subtle shadow-sm"
    >
      <p className="text-xs font-semibold text-text-primary mb-1">Contact Details</p>
      <input 
        required 
        disabled={disabled}
        className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red text-text-primary placeholder:text-text-secondary disabled:opacity-60" 
        placeholder="Your Name" 
        value={name} onChange={e => setName(e.target.value)} 
      />
      <input 
        required 
        type="email"
        disabled={disabled}
        className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red text-text-primary placeholder:text-text-secondary disabled:opacity-60" 
        placeholder="Email Address" 
        value={email} onChange={e => setEmail(e.target.value)} 
      />
      <textarea 
        required 
        disabled={disabled}
        className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red text-text-primary resize-none placeholder:text-text-secondary disabled:opacity-60" 
        rows={2}
        placeholder="Brief Message" 
        value={message} onChange={e => setMessage(e.target.value)} 
      />
      <button 
        disabled={disabled}
        type="submit" 
        className="w-full mt-1 bg-brand-red text-white rounded-lg px-3 py-2 text-xs font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:bg-gray-500"
      >
        {disabled ? 'Submitted ✓' : 'Submit Details'}
      </button>
    </form>
  );
}

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
      suggestions: ['What services do you offer?', 'How much does it cost?', 'Leave details here']
    },
  ]);
  const [loading, setLoading]     = useState(false);
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

  /* ── Lead Submission Handler ───────────────────────────────────────── */
  const handleLeadSubmit = async (msgId, data) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, formSubmitted: true } : m));
    
    // Simulate sending lead data
    try {
      await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Silent
    }

    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Thanks, ${data.name}! Our team will review your message and reach out to you at ${data.email} shortly.`, 
        id: Date.now(),
        suggestions: ['Start over', 'View Services'] 
      }]);
      setLoading(false);
      if (!open) setUnread(u => u + 1);
    }, 800);
  };

  /* ── Send handler ──────────────────────────────────────────────────── */
  const send = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg, id: Date.now() }]);
    setLoading(true);

    const delay = 400 + Math.floor(Math.random() * 300);
    await new Promise(res => setTimeout(res, delay));

    const replyData = getBotReply(msg);

    setMessages(prev => [...prev, { 
      role: 'bot', 
      text: replyData.reply, 
      id: Date.now() + 1,
      suggestions: replyData.suggestions,
      type: replyData.type
    }]);
    
    if (!open) setUnread(u => u + 1);
    setLoading(false);

    saveToBackend(msg, replyData.reply, sessionId.current);
  }, [input, loading, open]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
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

      {open && (
        <div
          className="chat-window fixed bottom-24 right-6 z-[99] w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border-subtle"
          style={{ height: '520px', background: 'var(--color-bg-primary)' }}
        >
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

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            style={{ overscrollBehavior: 'contain' }}
          >
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <div key={msg.id} className="flex flex-col">
                  <div className={`chat-msg flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                        <Bot size={13} className="text-brand-red" />
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-1 max-w-[78%]">
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-brand-red text-white rounded-br-sm'
                            : 'bg-bg-secondary border border-border-subtle text-text-primary rounded-bl-sm'
                        }`}
                      >
                        <RichText text={msg.text} />
                      </div>
                      
                      {msg.role === 'bot' && msg.type === 'lead_form' && (
                        <LeadForm 
                          disabled={msg.formSubmitted} 
                          onSubmit={(data) => handleLeadSubmit(msg.id, data)} 
                        />
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center shrink-0">
                        <User size={13} className="text-text-secondary" />
                      </div>
                    )}
                  </div>

                  {/* Contextual Suggestions */}
                  {isLast && msg.role === 'bot' && msg.suggestions && msg.suggestions.length > 0 && !loading && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pl-9 chat-msg" style={{ animationDelay: '0.1s' }}>
                      {msg.suggestions.map(s => (
                        <button 
                          key={s} 
                          onClick={() => send(s)} 
                          className="text-[11px] px-3 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/5 text-brand-red hover:bg-brand-red hover:text-white transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {loading && <TypingBubble />}
            <div ref={bottomRef} />
          </div>

          {showScroll && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-20 right-4 w-7 h-7 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center shadow hover:border-brand-red/40 transition-colors"
            >
              <ChevronDown size={14} className="text-text-secondary" />
            </button>
          )}

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
