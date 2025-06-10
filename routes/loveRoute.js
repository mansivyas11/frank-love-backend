// routes/love.js
const express = require('express');
const router = express.Router();
const Love = require('../models/Love'); // lowercase 'love' to match filename

// POST /api/love - Save a love match
router.post('/', async (req, res) => {
  const { yourName, crushName, score } = req.body;

  try {
    const newLove = new Love({ yourName, crushName, score });
    await newLove.save();
    res.status(201).json({ message: 'Saved successfully', data: newLove });
  } catch (error) {
    console.error('Error saving love result:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET /api/love/secrets - Admin access to all records
router.get('/secrets', async (req, res) => {
  const authHeader = req.headers.authorization;
  const expected = 'Bearer admin123'; // You can use process.env.ADMIN_PASS

  if (authHeader !== expected) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  try {
    const allData = await Love.find().sort({ timestamp: -1 });
    res.status(200).json(allData);
  } catch (err) {
    console.error('Error fetching love secrets:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
