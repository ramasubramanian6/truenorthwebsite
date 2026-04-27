const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/contact
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('A valid email address is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const contact = new Contact(req.body);
      await contact.save();
      return res.status(201).json({ success: true, message: 'Message received' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ADMIN ROUTES
router.get('/admin/all', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/admin/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Message deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
