import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading for code splitting
const Home         = lazy(() => import('./pages/Home'));
const Services     = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const About        = lazy(() => import('./pages/About'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Blog         = lazy(() => import('./pages/Blog'));
const BlogPost     = lazy(() => import('./pages/BlogPost'));
const Careers      = lazy(() => import('./pages/Careers'));
const AdminLogin   = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Contact      = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/SitePolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CaseStudies  = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// Inner component so it can consume the settings context
const AppRoutes = () => {
  const { settings } = useSiteSettings();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index             element={<Home />} />
        <Route path="services"   element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="about"      element={<About />} />
        <Route
          path="testimonials"
          element={settings.testimonialsVisible ? <Testimonials /> : <Navigate to="/" replace />}
        />
        <Route path="blog"       element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="careers"    element={<Careers />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="contact"    element={<Contact />} />
        <Route path="privacy"    element={<PrivacyPolicy />} />
        <Route path="terms"      element={<TermsOfService />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:id" element={<CaseStudyDetail />} />
        <Route path="*"          element={<NotFound />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <SiteSettingsProvider>
      <ThemeProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
                <AppRoutes />
              </Suspense>
            </BrowserRouter>
          </ErrorBoundary>
        </HelmetProvider>
      </ThemeProvider>
    </SiteSettingsProvider>
  );
}

export default App;
