const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// @route   POST api/bookings/book
// @desc    Create a new booking
router.post('/book', async (req, res) => {
  try {
    const { roomId, roomName, name, email, phone, checkIn, checkOut, guests, totalAmount, specialRequests } = req.body;
    const arrival = new Date(checkIn);
    const departure = new Date(checkOut);

    if (!roomId || !roomName || !name || !email || !phone || !checkIn || !checkOut || !guests || !totalAmount) {
      return res.status(400).json({ msg: 'Please complete all required booking fields' });
    }

    if (Number.isNaN(arrival.getTime()) || Number.isNaN(departure.getTime()) || arrival >= departure) {
      return res.status(400).json({ msg: 'Please choose valid check-in and check-out dates' });
    }
    
    // Simple availability check (logic can be expanded)
    const existingBookings = await Booking.find({
      roomId,
      $or: [
        { checkIn: { $lt: departure }, checkOut: { $gt: arrival } }
      ]
    });

    if (existingBookings.length > 0) {
      // return res.status(400).json({ msg: 'Room is already booked for selected dates' });
      // For demo purposes, we might allow it or just return a message
    }

    const bookingRef = 'TVR-' + Math.random().toString(36).substr(2, 8).toUpperCase();

    const newBooking = new Booking({
      roomId, roomName, name, email, phone, checkIn, checkOut, guests, totalAmount, specialRequests, bookingRef
    });

    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookings
// @desc    Get all bookings (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bookings/:id
// @desc    Delete a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: 'Invalid booking id' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
