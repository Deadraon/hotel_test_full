const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  roomId: { type: Number, required: true },
  roomName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  specialRequests: { type: String },
  status: { type: String, default: 'Confirmed' },
  bookingRef: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
