const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    slug:        { type: String, required: true, unique: true, trim: true },
    title:       { type: String, required: true, trim: true },
    excerpt:     { type: String, required: true, trim: true },
    content:     { type: String, required: true },
    category:    { type: String, required: true, trim: true },
    readTime:    { type: String, default: '5 min read' },
    coverImage:  { type: String, default: '' }, // Cloudinary URL
    isPublished: { type: Boolean, default: false },
    date:        { type: String },               // Human-readable date string
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
