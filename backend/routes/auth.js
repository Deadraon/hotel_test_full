const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @route   POST api/auth/login
// @desc    Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { admin: { id: admin.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'tvr_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/auth/setup
// @desc    Create first admin account (Use once)
router.get('/setup', async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin@tajview.com' });
    if (adminExists) {
      return res.json({ msg: 'Admin account already exists. You can log in.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const newAdmin = new Admin({
      username: 'admin@tajview.com',
      password: hashedPassword
    });

    await newAdmin.save();
    res.json({ msg: 'Admin account created successfully! User: admin@tajview.com, Pass: admin123' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Setup Error');
  }
});

module.exports = router;
