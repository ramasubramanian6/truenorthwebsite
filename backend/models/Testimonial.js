const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    role:       { type: String, required: true, trim: true },
    company:    { type: String, required: true, trim: true },
    content:    { type: String, required: true, trim: true },
    rating:     { type: Number, default: 5, min: 1, max: 5 },
    avatarUrl:  { type: String, default: '' },  // Cloudinary URL
    initials:   { type: String, default: '' },  // e.g. "AM"
    color:      { type: String, default: 'bg-brand-red' }, // tailwind class
    isApproved: { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
