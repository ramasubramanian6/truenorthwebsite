const express = require('express');
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/blog — returns all published posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .select('-content -__v');
    return res.json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/blog/:slug — returns single published post
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true }).select('-__v');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ADMIN ROUTES
router.get('/admin/all', auth, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/admin', auth, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/admin/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/admin/:id', auth, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
