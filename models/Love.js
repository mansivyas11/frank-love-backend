// models/love.js
const mongoose = require('mongoose');

const loveSchema = new mongoose.Schema({
  yourName: String,
  crushName: String,
  score: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Love', loveSchema);
