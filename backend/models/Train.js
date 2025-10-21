import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  operatorType: { type: String, enum: ['government', 'private'], default: 'government' },
  operatorName: { type: String },
  imageUrl: { type: String },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare: { type: Number, required: true },
  classes: [{ type: String, enum: ['Sleeper', 'AC', '3A', '2A', '1A'], default: 'Sleeper' }],
  amenities: [{ type: String }],
  rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model('Train', trainSchema);
