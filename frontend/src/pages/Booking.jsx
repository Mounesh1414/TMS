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
  const [payMethod, setPayMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [walletType, setWalletType] = useState('Paytm');
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Review, Step 2: Passengers, Step 3: Confirm

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
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  const handlePayNow = async () => {
    if (!booking) return;
    try {
      setIsPaying(true);
      let payload = { method: payMethod };
      
      if (payMethod === 'UPI') {
        if (!upiId) {
          setMsgType('error');
          setMessage('Please enter UPI ID');
          setIsPaying(false);
          return;
        }
        payload.upiId = upiId;
      } else if (payMethod === 'Credit/Debit Card') {
        if (!cardNumber || !cardExpiry || !cardCvv) {
          setMsgType('error');
          setMessage('Please fill all card details');
          setIsPaying(false);
          return;
        }
        payload.cardNumber = cardNumber;
      } else if (payMethod === 'Net Banking') {
        payload.bankName = bankName;
      } else if (payMethod === 'Wallet') {
        payload.walletType = walletType;
      }
      
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

  if (!transport) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      <h2 className="text-4xl font-bold mb-6 text-secondary">🎫 Book Your Ticket</h2>

      {message && <Alert type={msgType} message={message} onClose={() => setMessage(null)} />}

      <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl mb-6">
        <h3 className="text-xl font-bold mb-4">
          {type === 'train' && `${transport.name} (${transport.trainNumber})`}
          {type === 'bus' && `${transport.name} (${transport.busNumber})`}
          {type === 'flight' && `${transport.airline} (${transport.flightNumber})`}
        </h3>
        <p className="text-gray-600">{transport.source} → {transport.destination}</p>
        <p className="text-sm text-gray-500">Departure: {transport.departureTime} | Arrival: {transport.arrivalTime}</p>
        <p className="text-lg font-bold text-primary mt-2">₹{transport.fare} per seat</p>
        <p className="text-sm text-gray-500 mt-1">Available: {transport.availableSeats} seats</p>
      </div>

      {!booking && (
        <form onSubmit={handleBooking} className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
          <h4 className="text-xl font-bold mb-4">👥 Passenger Details</h4>

          {passengers.map((passenger, index) => (
            <div key={index} className="mb-4 p-4 border-2 border-primary/20 rounded-lg">
              <p className="font-semibold mb-2">Passenger {index + 1}</p>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                  required
                />
                <select
                  value={passenger.gender}
                  onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPassenger}
            className="mb-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            ➕ Add Passenger
          </button>

          <div className="mb-4">
            <p className="font-semibold">Total Seats: {seats}</p>
            <p className="font-semibold text-primary text-xl">Total Fare: ₹{transport.fare * seats}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent transition"
          >
            Confirm Booking
          </button>
        </form>
      )}

      {booking && (
        <div className="bg-green-50/90 backdrop-blur p-6 rounded-2xl shadow-xl border-2 border-green-500">
          <h3 className="text-3xl font-bold text-green-700 mb-4">✅ Booking Confirmed!</h3>
          <p className="text-lg"><strong>PNR:</strong> {booking.pnr}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
          <p><strong>Payment:</strong> {booking.paymentStatus?.toUpperCase?.() || 'UNPAID'}</p>

          {booking.paymentStatus !== 'paid' && booking.status !== 'cancelled' && (
            <div className="mt-6 p-6 bg-white rounded-xl border-2 border-primary/30 shadow-lg">
              <h4 className="font-bold text-xl mb-4 text-secondary">💳 Complete Your Payment</h4>
              <p className="text-2xl font-bold text-primary mb-6">Total Amount: ₹{booking.totalFare}</p>
              
              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <button
                  onClick={() => setPayMethod('UPI')}
                  className={`p-3 rounded-lg font-semibold transition ${
                    payMethod === 'UPI' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  � UPI
                </button>
                <button
                  onClick={() => setPayMethod('Credit/Debit Card')}
                  className={`p-3 rounded-lg font-semibold transition ${
                    payMethod === 'Credit/Debit Card' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💳 Card
                </button>
                <button
                  onClick={() => setPayMethod('Net Banking')}
                  className={`p-3 rounded-lg font-semibold transition ${
                    payMethod === 'Net Banking' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏦 Banking
                </button>
                <button
                  onClick={() => setPayMethod('Wallet')}
                  className={`p-3 rounded-lg font-semibold transition ${
                    payMethod === 'Wallet' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  👛 Wallet
                </button>
              </div>

              {/* Payment Form Based on Method */}
              <div className="mb-6">
                {payMethod === 'UPI' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@paytm / yourname@oksbi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="flex gap-2 items-center text-sm text-gray-600">
                      <span>Popular UPI Apps:</span>
                      <span className="px-2 py-1 bg-purple-100 rounded">Google Pay</span>
                      <span className="px-2 py-1 bg-blue-100 rounded">PhonePe</span>
                      <span className="px-2 py-1 bg-green-100 rounded">Paytm</span>
                    </div>
                  </div>
                )}

                {payMethod === 'Credit/Debit Card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/25"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-600">
                      <span>💳 We accept:</span>
                      <span className="font-semibold">Visa</span>
                      <span className="font-semibold">Mastercard</span>
                      <span className="font-semibold">RuPay</span>
                      <span className="font-semibold">Amex</span>
                    </div>
                  </div>
                )}

                {payMethod === 'Net Banking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Select Your Bank</label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
                      >
                        <option value="SBI">State Bank of India (SBI)</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                        <option value="Kotak">Kotak Mahindra Bank</option>
                        <option value="BOB">Bank of Baroda</option>
                        <option value="Canara">Canara Bank</option>
                        <option value="IDBI">IDBI Bank</option>
                        <option value="Yes">Yes Bank</option>
                      </select>
                    </div>
                    <p className="text-sm text-gray-600">
                      🔒 You will be redirected to your bank's secure payment page
                    </p>
                  </div>
                )}

                {payMethod === 'Wallet' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Choose Wallet</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik', 'Freecharge', 'Airtel Money'].map(wallet => (
                          <button
                            key={wallet}
                            onClick={() => setWalletType(wallet)}
                            className={`p-3 rounded-lg font-semibold transition border-2 ${
                              walletType === wallet 
                                ? 'border-primary bg-primary/10 text-primary' 
                                : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30'
                            }`}
                          >
                            {wallet}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      💰 You will be redirected to {walletType} to complete payment
                    </p>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span className="text-lg">🔒</span>
                  <span><strong>Secure Payment:</strong> 256-bit SSL Encryption | PCI-DSS Compliant</span>
                </p>
              </div>

              {/* Pay Button */}
              <button
                disabled={isPaying || 
                  (payMethod === 'UPI' && !upiId) ||
                  (payMethod === 'Credit/Debit Card' && (!cardNumber || !cardExpiry || !cardCvv))
                }
                onClick={handlePayNow}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition font-bold text-lg"
              >
                {isPaying ? '⏳ Processing Payment...' : `💳 Pay ₹${booking.totalFare}`}
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                🛡️ This is a demo payment system. No real money will be charged.
              </p>
            </div>
          )}

          {booking.paymentStatus === 'paid' && (
            <div className="mt-4">
              <p><strong>Method:</strong> {booking.paymentMethod}</p>
              <p><strong>Reference:</strong> {booking.paymentReference}</p>
              {booking.paidAt && (
                <p><strong>Paid At:</strong> {new Date(booking.paidAt).toLocaleString()}</p>
              )}
            </div>
          )}
          <button
            onClick={() => navigate('/my-bookings')}
            className="mt-4 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-primary transition font-bold"
          >
            📋 View My Bookings
          </button>
        </div>
      )}
    </div>
  );
}
