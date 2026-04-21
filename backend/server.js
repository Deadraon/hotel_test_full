require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Serverless Optimized)
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Models
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
const Admin = require('./models/Admin');

// Routes
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));

// Direct Setup Route (Emergency fallback)
app.get('/api/auth/setup', async (req, res) => {
  try {
    const Admin = require('./models/Admin');
    const bcrypt = require('bcryptjs');
    
    const adminExists = await Admin.findOne({ username: 'admin@tajview.com' });
    if (adminExists) return res.json({ msg: 'Admin already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const newAdmin = new Admin({ username: 'admin@tajview.com', password: hashedPassword });
    await newAdmin.save();
    
    res.json({ msg: 'Admin created!', user: 'admin@tajview.com', pass: 'admin123' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
