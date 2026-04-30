import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { blogData } from '../data/blogData';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { API_URL } from '../config/api';
import SmartImage from '../components/SmartImage';

const Blog = () => {
  /* Initialise with static data — site works even when backend is offline */
  const [posts, setPosts] = useState(blogData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${API_URL}/api/blog`, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setPosts(data.data); // replace with live data
          }
        }
      } catch {
        console.info('[Blog] Backend unavailable — using static data');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Insights & Blog | True North IT Consultancy</title>
        <meta
          name="description"
          content="Insights on software development, QA testing, SaaS architecture, and digital transformation from the True North team."
        />
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto border-b border-border-subtle mb-16">
        <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Knowledge Hub
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Our <span className="text-gradient">Insights</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary">
          Trends, strategies, and engineering deep-dives from the True North team.
        </p>
      </AnimatedSection>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-72 glass rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {posts.map((post, idx) => (
            <AnimatedSection key={post._id || post.id} delay={0.1 * idx}>
              <Link
                to={`/blog/${post.slug}`}
                className="block bento-card h-full group flex flex-col"
              >
                {/* Cover image: CDN first, then fallback to local bundled asset */}
                {post.coverImage && (
                  <SmartImage
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                <span className="px-3 py-1 bg-brand-red/10 text-brand-red font-semibold text-xs rounded-full uppercase tracking-wider mb-4 inline-block self-start">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-red transition-colors line-clamp-2 flex-grow">
                  {post.title}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-5 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-text-secondary border-t border-border-subtle pt-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <ArrowRight size={14} className="text-brand-red group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
