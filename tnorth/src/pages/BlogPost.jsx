import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import { blogData } from '../data/blogData';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container mx-auto px-6 max-w-4xl py-10 pb-24">
      <Helmet>
        <title>{post.title} | True North Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <AnimatedSection>
        <Link to="/blog" className="inline-flex items-center text-text-secondary hover:text-brand-red transition-colors mb-10 text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to all articles
        </Link>
        
        <span className="px-3 py-1 bg-brand-red/10 text-brand-red font-semibold text-xs rounded-full uppercase tracking-wider mb-6 inline-block">
          {post.category}
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center text-sm text-text-secondary space-x-6 border-b border-border-subtle pb-8 mb-12">
          <span className="flex items-center"><Calendar size={16} className="mr-2 text-brand-red" /> {post.date}</span>
          <span className="flex items-center"><Clock size={16} className="mr-2 text-brand-red" /> {post.readTime}</span>
        </div>

        {/* Lightweight markdown renderer mock using prose classes */}
        <div className="prose prose-lg prose-invert max-w-none text-text-secondary leading-loose">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-3xl font-bold text-text-primary mt-12 mb-6">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={i} className="mb-6">{paragraph}</p>;
          })}
        </div>
        
      </AnimatedSection>
    </div>
  );
};

export default BlogPost;
