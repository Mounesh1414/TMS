import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['train', 'bus', 'flight'], required: true },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  seatsBooked: { type: Number, required: true },
  totalFare: { type: Number, required: true },
  pnr: { type: String, required: true, unique: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  passengerDetails: [{
    name: String,
    age: Number,
    gender: String
  }],
  // Payment fields
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'failed'], default: 'unpaid' },
  paymentMethod: { type: String }, // e.g., 'Online Banking'
  paymentReference: { type: String }, // mock transaction/UTR number
  paidAt: { type: Date }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
