import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Alert from '../components/Alert';
import { useSearchParams } from 'react-router-dom';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState('info');
  const [payingId, setPayingId] = useState(null);
  const [selectedBank, setSelectedBank] = useState('SBI');
  const [payMethods, setPayMethods] = useState({}); // bookingId -> 'Online Banking' | 'UPI'
  const [upiInputs, setUpiInputs] = useState({});   // bookingId -> upiId
  const [searchParams] = useSearchParams();
  const highlightRef = useRef(null);
  const navigate = useNavigate();
  const [highlightPNR, setHighlightPNR] = useState('');

  useEffect(() => {
    API.get('/bookings/my')
      .then(res => setBookings(res.data))
      .catch(console.error);
    // Load recent searches from localStorage
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  useEffect(() => {
    const pnr = searchParams.get('pnr') || '';
    setHighlightPNR(pnr);
  }, [searchParams]);

  useEffect(() => {
    if (!highlightPNR) return;
    const el = highlightRef.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const original = el.className;
      el.className = original + ' ring-4 ring-primary/50';
      const t = setTimeout(() => { el.className = original; }, 2000);
      return () => clearTimeout(t);
    }
  }, [highlightPNR, bookings]);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await API.post(`/bookings/${id}/cancel`);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      setMsgType('success');
      setMessage('Booking cancelled successfully');
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Cancellation failed');
    }
  };

  const handlePay = async (id) => {
    try {
      setPayingId(id);
      const method = payMethods[id] || 'Online Banking';
      const payload = method === 'UPI'
        ? { method: 'UPI', upiId: upiInputs[id] }
        : { method: 'Online Banking', bankName: selectedBank };
      const res = await API.post(`/bookings/${id}/pay`, payload);
      setBookings(prev => prev.map(b => b._id === id ? res.data.booking : b));
      setMsgType('success');
      setMessage(`Payment successful. Ref: ${res.data.booking.paymentReference}`);
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Payment failed');
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      <h2 className="text-4xl font-bold mb-6 text-secondary">📋 My Bookings</h2>

      {/* Recent Searches & Quick Rebooking */}
      {recentSearches.length > 0 && (
        <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Recent Searches & Quick Rebooking</h3>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((search, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-blue-100 via-orange-100 to-yellow-100 px-4 py-2 rounded-xl shadow">
                <span className="font-medium text-gray-700">
                  {search.from} → {search.to} | {search.date} | {search.mode.charAt(0).toUpperCase() + search.mode.slice(1)}
                </span>
                <button
                  className="ml-2 px-3 py-1 bg-primary text-white rounded-lg hover:bg-accent transition text-sm font-bold"
                  onClick={() => {
                    // Navigate to search page with params
                    navigate(`/${search.mode}?from=${encodeURIComponent(search.from)}&to=${encodeURIComponent(search.to)}&date=${encodeURIComponent(search.date)}`);
                  }}
                >
                  Quick Rebook
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && <Alert type={msgType} message={message} onClose={() => setMessage(null)} />}

      <div className="grid gap-4">
        {bookings.length === 0 ? (
          <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl text-center">
            <p className="text-gray-500 text-lg">No bookings found. Start booking your journey!</p>
          </div>
        ) : (
          bookings.map(booking => {
            const transport = booking.trainId || booking.busId || booking.flightId;
            return (
              <div
                key={booking._id}
                ref={highlightPNR && booking.pnr === highlightPNR ? highlightRef : null}
                className={`p-6 rounded-2xl shadow-xl transition ${booking.status === 'cancelled' ? 'bg-gray-100/90 backdrop-blur' : 'bg-white/90 backdrop-blur'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">PNR: {booking.pnr}</p>
                    <h3 className="text-xl font-bold">
                      {booking.type === 'train' && `${transport?.name} (${transport?.trainNumber})`}
                      {booking.type === 'bus' && `${transport?.name} (${transport?.busNumber})`}
                      {booking.type === 'flight' && `${transport?.airline} (${transport?.flightNumber})`}
                    </h3>
                    <p className="text-gray-600">{transport?.source} → {transport?.destination}</p>
                    <p className="mt-2">Seats: <span className="font-semibold">{booking.seatsBooked}</span></p>
                    <p className="text-lg font-bold text-primary">Total Fare: ₹{booking.totalFare}</p>
                    <p className={`mt-2 font-semibold ${booking.status === 'cancelled' ? 'text-red-600' : 'text-green-600'}`}>
                      Status: {booking.status.toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm"><strong>Payment:</strong> {(booking.paymentStatus || 'unpaid').toUpperCase()}</p>
                    {booking.paymentStatus === 'paid' && (
                      <p className="text-sm text-gray-600">Ref: {booking.paymentReference} • {booking.paymentMethod}</p>
                    )}

                    {booking.passengerDetails && booking.passengerDetails.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold text-sm">Passengers:</p>
                        <ul className="text-sm text-gray-600">
                          {booking.passengerDetails.map((p, i) => (
                            <li key={i}>{p.name}, {p.age} years, {p.gender}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold"
                    >
                      ❌ Cancel Booking
                    </button>
                  )}

                  {booking.status === 'confirmed' && booking.paymentStatus !== 'paid' && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <select
                          value={payMethods[booking._id] || 'Online Banking'}
                          onChange={(e) => setPayMethods(prev => ({ ...prev, [booking._id]: e.target.value }))}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        >
                          <option>Online Banking</option>
                          <option>UPI</option>
                        </select>
                        {(payMethods[booking._id] || 'Online Banking') === 'Online Banking' && (
                          <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                          >
                            <option value="SBI">SBI</option>
                            <option value="HDFC">HDFC</option>
                            <option value="ICICI">ICICI</option>
                            <option value="Axis">Axis</option>
                            <option value="PNB">PNB</option>
                          </select>
                        )}
                        {(payMethods[booking._id] || 'Online Banking') === 'UPI' && (
                          <input
                            type="text"
                            placeholder="yourname@upi"
                            value={upiInputs[booking._id] || ''}
                            onChange={(e) => setUpiInputs(prev => ({ ...prev, [booking._id]: e.target.value }))}
                            className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                          />
                        )}
                      </div>
                      <div>
                        <button
                          disabled={payingId === booking._id || ((payMethods[booking._id] === 'UPI') && !upiInputs[booking._id])}
                          onClick={() => handlePay(booking._id)}
                          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent disabled:opacity-60 transition font-bold"
                        >
                          {payingId === booking._id ? 'Processing…' : `💳 Pay ₹${booking.totalFare}`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
