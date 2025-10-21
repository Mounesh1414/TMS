import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PNRStatus() {
  const [pnr, setPnr] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    // Mock result - in real app, call API
    setResult({
      pnr: pnr,
      status: 'Confirmed',
      train: 'Rajdhani Express',
      from: 'Delhi',
      to: 'Mumbai',
      date: '2025-10-25',
      coach: 'A1',
      seat: '23',
      passengerName: 'Sample Passenger'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">PNR Status Check</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-4 mb-8">
            <p>
              Check your train ticket PNR (Passenger Name Record) status instantly. 
              Enter your 10-digit PNR number to get real-time booking status, seat/berth details, and journey information.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">What is PNR?</h2>
            <p>
              PNR is a unique 10-digit number generated at the time of ticket booking. It contains complete details 
              about your journey including passenger information, coach and seat numbers, boarding station, and current booking status.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">PNR Status Types:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>CNF (Confirmed):</strong> Your seat/berth is confirmed</li>
              <li><strong>RAC (Reservation Against Cancellation):</strong> You have a reserved seat but not a full berth</li>
              <li><strong>WL (Waitlisted):</strong> Your ticket is on waiting list</li>
              <li><strong>PQWL:</strong> Pooled Quota Waiting List</li>
              <li><strong>GNWL:</strong> General Waiting List</li>
              <li><strong>RLWL:</strong> Remote Location Waiting List</li>
            </ul>
          </div>

          {/* PNR Check Form */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-secondary mb-4">Check Your PNR Status</h3>
            <form onSubmit={handleCheck} className="flex gap-3">
              <input
                type="text"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                placeholder="Enter 10-digit PNR number"
                maxLength="10"
                pattern="[0-9]{10}"
                required
                className="flex-1 border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none"
              />
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
                Check Status
              </button>
            </form>
          </div>

          {/* Result Display */}
          {result && (
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">PNR Status Result</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">PNR:</span> {result.pnr}</div>
                <div><span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">{result.status}</span></div>
                <div><span className="font-semibold">Train:</span> {result.train}</div>
                <div><span className="font-semibold">Date:</span> {result.date}</div>
                <div><span className="font-semibold">From:</span> {result.from}</div>
                <div><span className="font-semibold">To:</span> {result.to}</div>
                <div><span className="font-semibold">Coach:</span> {result.coach}</div>
                <div><span className="font-semibold">Seat:</span> {result.seat}</div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-secondary mb-3">Important Notes:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>PNR status is updated in real-time and can change until chart preparation</li>
              <li>Charts are usually prepared 4 hours before train departure</li>
              <li>Keep checking your PNR if you're on waiting list</li>
              <li>RAC tickets allow you to board the train</li>
              <li>Waitlisted tickets do not guarantee travel unless confirmed</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
