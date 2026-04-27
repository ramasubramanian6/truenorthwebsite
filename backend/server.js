require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blog');
const careerRoutes = require('./routes/careers');
const adminRoutes = require('./routes/admin');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://truenorthitc.com',
    'https://truenorthwebsite-fjxoxhejw-truenorthspaces-8691s-projects.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/admin', adminRoutes);

// Root health check
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'True North IT Solutions API is live',
    timestamp: new Date()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'True North IT Solutions API', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Database & Server Start ──────────────────────────────────
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 True North API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
