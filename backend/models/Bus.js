import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
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
  type: { type: String, enum: ['AC', 'Non-AC', 'Sleeper'], default: 'Non-AC' },
  amenities: [{ type: String }],
  rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model('Bus', busSchema);
