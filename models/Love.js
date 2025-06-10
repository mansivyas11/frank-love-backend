const mongoose = require('mongoose');

const loveSchema = new mongoose.Schema({
  yourName: {
    type: String,
    required: true,
    trim: true
  },
  crushName: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Love', loveSchema);
