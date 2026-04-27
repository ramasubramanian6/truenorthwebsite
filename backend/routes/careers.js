const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const Application = require('../models/Application');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/careers
// @desc    Get all active job postings
router.get('/', async (req, res) => {
  try {
    const jobs = await Career.find({ active: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/careers/apply
// @desc    Submit a job application
router.post('/apply', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('jobId', 'Job ID is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json({ msg: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin Routes (CRUD)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const jobs = await Career.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/admin', auth, async (req, res) => {
  try {
    const newJob = new Career(req.body);
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/admin/:id', auth, async (req, res) => {
    try {
      const job = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(job);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

router.delete('/admin/:id', auth, async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
