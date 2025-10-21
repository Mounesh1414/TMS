import Booking from '../models/Booking.js';
import Train from '../models/Train.js';
import Bus from '../models/Bus.js';
import Flight from '../models/Flight.js';
import { pnrGenerator } from '../utils/pnrGenerator.js';
import { createUserNotification } from './notificationController.js';

export const createBooking = async (req, res) => {
  try {
    const { type, trainId, busId, flightId, seatsBooked, passengerDetails } = req.body;
    
    let transport, fare;
    
    if (type === 'train') {
      transport = await Train.findById(trainId);
      if (!transport || transport.availableSeats < seatsBooked) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
      transport.availableSeats -= seatsBooked;
      await transport.save();
      fare = transport.fare;
    } else if (type === 'bus') {
      transport = await Bus.findById(busId);
      if (!transport || transport.availableSeats < seatsBooked) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
      transport.availableSeats -= seatsBooked;
      await transport.save();
      fare = transport.fare;
    } else if (type === 'flight') {
      transport = await Flight.findById(flightId);
      if (!transport || transport.availableSeats < seatsBooked) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
      transport.availableSeats -= seatsBooked;
      await transport.save();
      fare = transport.fare;
    }
    
    const totalFare = fare * seatsBooked;
    const pnr = pnrGenerator();
    
    const booking = new Booking({
      userId: req.user.userId,
      type,
      trainId,
      busId,
      flightId,
      seatsBooked,
      totalFare,
      pnr,
      passengerDetails
    });
    
    await booking.save();
    await booking.populate(type === 'train' ? 'trainId' : type === 'bus' ? 'busId' : 'flightId');

    // Create notification for booking creation
    const title = 'Booking Created';
    const message = `Your ${type} booking is created. PNR: ${pnr}. Total: ₹${totalFare}`;
    await createUserNotification({
      userId: req.user.userId,
      type: 'booking_created',
      title,
      message,
      metadata: { bookingId: booking._id, pnr, transportType: type },
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('trainId')
      .populate('busId')
      .populate('flightId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }
    
    if (booking.type === 'train') {
      const train = await Train.findById(booking.trainId);
      train.availableSeats += booking.seatsBooked;
      await train.save();
    } else if (booking.type === 'bus') {
      const bus = await Bus.findById(booking.busId);
      bus.availableSeats += booking.seatsBooked;
      await bus.save();
    } else if (booking.type === 'flight') {
      const flight = await Flight.findById(booking.flightId);
      flight.availableSeats += booking.seatsBooked;
      await flight.save();
    }
    
    booking.status = 'cancelled';
    await booking.save();

    // Notify cancellation
    await createUserNotification({
      userId: booking.userId,
      type: 'booking_cancelled',
      title: 'Booking Cancelled',
      message: `Your ${booking.type} booking with PNR ${booking.pnr} has been cancelled.`,
      metadata: { bookingId: booking._id, pnr: booking.pnr, transportType: booking.type },
    });

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId')
      .populate('trainId')
      .populate('busId')
      .populate('flightId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const payForBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'Online Banking', bankName, accountNumber, upiId } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (String(booking.userId) !== String(req.user.userId)) {
      return res.status(403).json({ message: 'Not authorized to pay for this booking' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot pay for a cancelled booking' });
    }
    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Booking already paid' });
    }

    // Simulate payment success; in real-world integrate payment gateway
    let mockRef;
    if (method === 'UPI') {
      const upi = (upiId || 'user@upi').replace(/\s+/g, '');
      mockRef = `UPI-${upi}-${Date.now()}`;
    } else {
      mockRef = `UTR${Date.now()}`;
    }
    booking.paymentStatus = 'paid';
    booking.paymentMethod = method;
    booking.paymentReference = method === 'UPI' ? mockRef : (bankName ? `${bankName}-${mockRef}` : mockRef);
    booking.paidAt = new Date();
    await booking.save();

    await booking.populate('trainId');
    await booking.populate('busId');
    await booking.populate('flightId');

    // Notify payment
    await createUserNotification({
      userId: booking.userId,
      type: 'booking_paid',
      title: 'Payment Successful',
      message: `Payment received for PNR ${booking.pnr}. Method: ${booking.paymentMethod}.`,
      metadata: { bookingId: booking._id, pnr: booking.pnr, transportType: booking.type },
    });

    res.json({ message: 'Payment successful', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
