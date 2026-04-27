import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { blogData } from '../data/blogData';
import { BookOpen, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <Helmet>
        <title>Blog | True North Insights</title>
        <meta name="description" content="Read our latest insights, case studies, and thought leadership articles on digital transformation." />
      </Helmet>

      <AnimatedSection className="py-20 text-center max-w-3xl mx-auto border-b border-border-subtle mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our <span className="text-brand-red">Insights</span></h1>
        <p className="text-lg md:text-xl text-text-secondary">
          Discover the latest trends, strategies, and engineering deep-dives from the experts at True North.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {blogData.map((post, idx) => (
          <AnimatedSection key={post.id} delay={0.1 * idx}>
            <Link to={`/blog/${post.slug}`} className="block bento-card h-full group">
              <span className="px-3 py-1 bg-brand-red/10 text-brand-red font-semibold text-xs rounded-full uppercase tracking-wider mb-4 inline-block">
                {post.category}
              </span>
              <h2 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-brand-red transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-xs text-text-secondary space-x-4 border-t border-border-subtle pt-4 mt-auto">
                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Blog;
