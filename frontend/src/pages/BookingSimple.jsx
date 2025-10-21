import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Alert from '../components/Alert';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const [transport, setTransport] = useState(null);
  const [seats, setSeats] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState('info');
  const [booking, setBooking] = useState(null);
  const [bankName, setBankName] = useState('SBI');
  const [isPaying, setIsPaying] = useState(false);
  const [payMethod, setPayMethod] = useState('Online Banking');
  const [upiId, setUpiId] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (type && id) {
      API.get(`/${type}s`)
        .then(res => {
          const item = res.data.find(x => x._id === id);
          setTransport(item);
        })
        .catch(console.error);
    }
  }, [type, id]);

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
    setSeats(seats + 1);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;
    const updated = passengers.filter((_, i) => i !== index);
    setPassengers(updated);
    setSeats(seats - 1);
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        type,
        seatsBooked: seats,
        passengerDetails: passengers
      };

      if (type === 'train') payload.trainId = id;
      if (type === 'bus') payload.busId = id;
      if (type === 'flight') payload.flightId = id;

      const res = await API.post('/bookings', payload);
      setMsgType('success');
      setMessage('Booking confirmed! Your PNR: ' + res.data.pnr);
      setBooking(res.data);
      setCurrentStep(3);
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  const handlePayNow = async () => {
    if (!booking) return;
    try {
      setIsPaying(true);
      const payload = payMethod === 'UPI' ? { method: 'UPI', upiId } : { method: 'Online Banking', bankName };
      const res = await API.post(`/bookings/${booking._id}/pay`, payload);
      setBooking(res.data.booking);
      setMsgType('success');
      setMessage(`Payment successful via ${res.data.booking.paymentMethod}. Ref: ${res.data.booking.paymentReference}`);
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Payment failed');
    } finally {
      setIsPaying(false);
    }
  };

  const canProceedToStep2 = () => {
    return passengers.every(p => p.name && p.age);
  };

  if (!transport) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg">Loading ticket details...</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-secondary mb-2">🎫 Easy Ticket Booking</h2>
        <p className="text-gray-600 text-lg">Follow the simple steps below to book your ticket</p>
      </div>

      {/* Progress Steps */}
      {!booking && (
        <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl mb-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}>
                1
              </div>
              <p className="text-sm mt-2 font-semibold">Journey Details</p>
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'} mx-2`}></div>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}>
                2
              </div>
              <p className="text-sm mt-2 font-semibold">Confirm Booking</p>
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'} mx-2`}></div>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`}>
                3
              </div>
              <p className="text-sm mt-2 font-semibold">Payment</p>
            </div>
          </div>
        </div>
      )}

      {message && <Alert type={msgType} message={message} onClose={() => setMessage(null)} />}

      {/* Step 1: Journey & Passenger Details */}
      {currentStep === 1 && !booking && (
        <>
          {/* Journey Details Card */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <span className="text-4xl">
                  {type === 'train' && '🚂'}
                  {type === 'bus' && '🚌'}
                  {type === 'flight' && '✈️'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  {type === 'train' && `${transport.name} (${transport.trainNumber})`}
                  {type === 'bus' && `${transport.name} (${transport.busNumber})`}
                  {type === 'flight' && `${transport.airline} (${transport.flightNumber})`}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">From → To</p>
                    <p className="font-bold text-lg">{transport.source} → {transport.destination}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Departure → Arrival</p>
                    <p className="font-bold">{transport.departureTime} → {transport.arrivalTime}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Price per seat</p>
                    <p className="font-bold text-primary text-2xl">₹{transport.fare}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Available Seats</p>
                    <p className="font-bold text-green-600 text-2xl">{transport.availableSeats}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Details Form */}
          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }} className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold text-secondary">👥 Passenger Information</h4>
              <div className="bg-primary/10 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-600">Total Passengers</p>
                <p className="font-bold text-primary text-xl text-center">{passengers.length}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 bg-blue-50 p-3 rounded-lg">
              ℹ️ Please enter the name, age, and gender for each passenger traveling
            </p>

            {passengers.map((passenger, index) => (
              <div key={index} className="mb-6 p-4 border-2 border-primary/20 rounded-xl bg-gradient-to-r from-blue-50/50 to-orange-50/50">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-lg text-secondary">Passenger {index + 1}</p>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition"
                    >
                      ❌ Remove
                    </button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Rajesh Kumar"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Age *</label>
                    <input
                      type="number"
                      placeholder="e.g., 25"
                      value={passenger.age}
                      onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Gender *</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                    >
                      <option value="Male">👨 Male</option>
                      <option value="Female">👩 Female</option>
                      <option value="Other">🧑 Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPassenger}
              className="mb-6 px-8 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold text-lg w-full md:w-auto"
            >
              ➕ Add Another Passenger
            </button>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-lg">Total Seats:</p>
                  <p className="font-bold text-3xl text-secondary">{seats}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-lg">Total Amount:</p>
                  <p className="font-bold text-4xl text-primary">₹{transport.fare * seats}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canProceedToStep2()}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xl hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {canProceedToStep2() ? '➡️ Continue to Review' : '⚠️ Please fill all passenger details'}
            </button>
          </form>
        </>
      )}

      {/* Step 2: Review & Confirm */}
      {currentStep === 2 && !booking && (
        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-secondary mb-6">✅ Review Your Booking</h3>
          
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <p className="font-semibold text-lg mb-2">📍 Journey Details:</p>
            <p>{type === 'train' && `${transport.name} (${transport.trainNumber})`}
               {type === 'bus' && `${transport.name} (${transport.busNumber})`}
               {type === 'flight' && `${transport.airline} (${transport.flightNumber})`}</p>
            <p>{transport.source} → {transport.destination}</p>
            <p>Departure: {transport.departureTime} | Arrival: {transport.arrivalTime}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl mb-4">
            <p className="font-semibold text-lg mb-2">👥 Passengers ({passengers.length}):</p>
            {passengers.map((p, i) => (
              <p key={i} className="ml-4">
                {i + 1}. {p.name}, {p.age} years, {p.gender}
              </p>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl mb-6">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-xl">💰 Total Amount:</p>
              <p className="font-bold text-3xl text-primary">₹{transport.fare * seats}</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">({seats} seat(s) × ₹{transport.fare})</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-gray-300 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-400 transition"
            >
              ⬅️ Go Back
            </button>
            <button
              onClick={handleBooking}
              className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
            >
              ✅ Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {booking && (
        <div className="bg-green-50/90 backdrop-blur p-6 rounded-2xl shadow-xl border-4 border-green-500">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-4">
              ✓
            </div>
            <h3 className="text-3xl font-bold text-green-700 mb-2">🎉 Booking Successful!</h3>
            <p className="text-lg text-gray-700">Your ticket has been booked</p>
          </div>

          <div className="bg-white p-6 rounded-xl mb-4 border-2 border-green-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">PNR Number</p>
                <p className="font-bold text-2xl text-primary">{booking.pnr}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Booking Status</p>
                <p className="font-bold text-xl text-green-600">{booking.status.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Fare</p>
                <p className="font-bold text-2xl">₹{booking.totalFare}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className={`font-bold text-xl ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {booking.paymentStatus?.toUpperCase?.() || 'UNPAID'}
                </p>
              </div>
            </div>
          </div>

          {booking.paymentStatus !== 'paid' && booking.status !== 'cancelled' && (
            <div className="bg-white p-6 rounded-xl border-2 border-primary/30 mb-4">
              <h4 className="text-xl font-bold mb-4">💳 Complete Your Payment</h4>
              <p className="text-gray-600 mb-4 bg-yellow-50 p-3 rounded-lg">
                ⚠️ Please complete the payment to confirm your booking
              </p>

              <div className="mb-4">
                <label className="block font-semibold mb-2 text-lg">Choose Payment Method:</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                >
                  <option value="Online Banking">🏦 Online Banking</option>
                  <option value="UPI">📱 UPI</option>
                </select>
              </div>

              {payMethod === 'Online Banking' && (
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-lg">Select Your Bank:</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                  >
                    <option value="SBI">State Bank of India (SBI)</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis">Axis Bank</option>
                    <option value="PNB">Punjab National Bank (PNB)</option>
                  </select>
                </div>
              )}

              {payMethod === 'UPI' && (
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-lg">Enter UPI ID:</label>
                  <input
                    type="text"
                    placeholder="yourname@paytm or yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 text-lg focus:border-primary outline-none"
                  />
                </div>
              )}

              <button
                disabled={isPaying || (payMethod === 'UPI' && !upiId)}
                onClick={handlePayNow}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg"
              >
                {isPaying ? '⏳ Processing Payment...' : `💳 Pay ₹${booking.totalFare} Now`}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center bg-gray-100 p-2 rounded">
                🔒 This is a demo payment. No real money will be charged.
              </p>
            </div>
          )}

          {booking.paymentStatus === 'paid' && (
            <div className="bg-white p-6 rounded-xl border-2 border-green-500 mb-4">
              <h4 className="text-xl font-bold text-green-700 mb-3">✅ Payment Successful!</h4>
              <div className="space-y-2">
                <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                <p><strong>Reference Number:</strong> {booking.paymentReference}</p>
                {booking.paidAt && (
                  <p><strong>Paid On:</strong> {new Date(booking.paidAt).toLocaleString()}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/my-bookings')}
              className="flex-1 bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary transition"
            >
              📋 View All My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-300 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-400 transition"
            >
              🏠 Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
