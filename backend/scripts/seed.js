// Script to seed the database with demo data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Train from '../models/Train.js';
import Bus from '../models/Bus.js';
import Flight from '../models/Flight.js';
import Announcement from '../models/Announcement.js';
import { trains, buses, flights, announcements } from '../utils/seedData.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Train.deleteMany({});
  await Bus.deleteMany({});
  await Flight.deleteMany({});
  await Announcement.deleteMany({});
  await Train.insertMany(trains);
  await Bus.insertMany(buses);
  await Flight.insertMany(flights);
  await Announcement.insertMany(announcements);
  console.log('Seeded trains, buses, flights, and announcements!');
  await mongoose.disconnect();
}

seed();
