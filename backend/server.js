require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// MongoDB Connection (Serverless Optimized)
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    throw err;
  }
};

// Middleware to ensure DB is connected for data routes
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(503).json({ error: 'Database unavailable' });
  }
};

// Routes
app.use('/api/bookings', ensureDB, require('./routes/bookings'));
app.use('/api/contact', ensureDB, require('./routes/contact'));
app.use('/api/auth', ensureDB, require('./routes/auth'));

app.get('/api/status', async (req, res) => {
  try {
    const status = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
      server: 'Running',
      database: status,
      error: isConnected ? null : 'Check Vercel Logs for details',
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Taj View Residency API is running...');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
