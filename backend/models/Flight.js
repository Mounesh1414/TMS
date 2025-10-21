import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  operatorType: { type: String, enum: ['government', 'private'], default: 'private' },
  operatorName: { type: String },
  imageUrl: { type: String },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare: { type: Number, required: true },
  class: { type: String, enum: ['Economy', 'Business', 'First'], default: 'Economy' },
  amenities: [{ type: String }],
  rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model('Flight', flightSchema);
