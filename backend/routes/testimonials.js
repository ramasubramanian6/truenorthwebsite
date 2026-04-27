const express = require('express');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/testimonials — returns all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    return res.json({ success: true, data: testimonials });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ADMIN ROUTES
router.get('/admin/all', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/admin', auth, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/admin/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testimonial);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/admin/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
