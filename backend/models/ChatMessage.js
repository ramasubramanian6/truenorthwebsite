const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId:  { type: String, required: true, index: true },
    role:       { type: String, enum: ['user', 'bot'], required: true },
    message:    { type: String, required: true, trim: true },
    userAgent:  { type: String, default: '' },
    ip:         { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
