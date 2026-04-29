import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { blogData } from '../data/blogData';
import { Calendar, Clock, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { API_URL } from '../config/api';
import SmartImage from '../components/SmartImage';

/* Simple markdown-to-JSX renderer for h2, h3, paragraphs */
const renderContent = (content) =>
  content.split('\n\n').map((block, i) => {
    if (block.startsWith('## '))
      return (
        <h2 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">
          {block.replace('## ', '')}
        </h2>
      );
    if (block.startsWith('### '))
      return (
        <h3 key={i} className="text-xl font-bold text-text-primary mt-8 mb-3">
          {block.replace('### ', '')}
        </h3>
      );
    return (
      <p key={i} className="text-text-secondary leading-relaxed mb-4">
        {block}
      </p>
    );
  });

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      /* 1 — Try backend (5 s timeout) */
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${API_URL}/api/blog/${slug}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setPost(data.data);
            setLoading(false);
            return; // done
          }
        }
      } catch {
        console.info('[BlogPost] Backend unavailable — falling back to static data');
      }

      /* 2 — Backend failed: fallback to bundled static data */
      const staticPost = blogData.find((b) => b.slug === slug);
      if (staticPost) {
        setPost(staticPost);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="container mx-auto px-6 max-w-3xl pt-40 pb-20">
        <div className="space-y-4 animate-pulse">
          <div className="h-5 bg-bg-secondary rounded w-24" />
          <div className="h-12 bg-bg-secondary rounded" />
          <div className="h-12 bg-bg-secondary rounded w-3/4" />
          <div className="h-4 bg-bg-secondary rounded w-1/3 mt-4" />
          <div className="h-4 bg-bg-secondary rounded mt-8" />
          <div className="h-4 bg-bg-secondary rounded" />
          <div className="h-4 bg-bg-secondary rounded w-4/5" />
        </div>
      </div>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  return (
    <div className="pt-10 pb-24">
      <Helmet>
        <title>{post.title} | True North IT Consultant</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatedSection className="mb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-red transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={15} /> Back to Insights
          </Link>

          {/* Cover image: CDN first, handles error with skeleton */}
          {post.coverImage && (
            <SmartImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover rounded-2xl mb-8"
            />
          )}

          <span className="px-3 py-1 bg-brand-red/10 text-brand-red font-semibold text-xs rounded-full uppercase tracking-wider mb-5 inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-sm text-text-secondary pb-8 border-b border-border-subtle mb-10 flex-wrap">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> True North Insights</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mb-16 leading-relaxed">
          {renderContent(post.content)}
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            Ready to apply these insights?
          </h3>
          <p className="text-text-secondary mb-6 text-sm">
            Let's discuss how True North can implement this for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPost;
