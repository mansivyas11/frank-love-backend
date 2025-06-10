const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const loveRoute = require('./routes/loveRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup — allow deployed Vercel frontend
app.use(cors({
  origin: 'https://frank-love-frontend.vercel.app'  // ✅ UPDATED
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ API route
app.use('/api/love', loveRoute);

// ✅ Serve static files (for admin panel, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Serve admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
