import React from 'react';
import { Link } from 'react-router-dom';

export default function SeatAvailability() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">Seat Availability</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Check real-time seat and berth availability for trains, buses, and flights before booking. 
              Our system provides up-to-date information to help you plan your journey better.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Train Seat Classes:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚂 AC Classes</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>1A:</strong> First AC (most premium)</li>
                  <li><strong>2A:</strong> Two-tier AC</li>
                  <li><strong>3A:</strong> Three-tier AC</li>
                  <li><strong>EC/CC:</strong> Executive/Chair Car</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚃 Non-AC Classes</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>SL:</strong> Sleeper Class</li>
                  <li><strong>2S:</strong> Second Sitting</li>
                  <li><strong>GEN:</strong> General (unreserved)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Bus Seat Types:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚌 AC Buses</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>Volvo AC:</strong> Premium AC buses</li>
                  <li><strong>Sleeper AC:</strong> Overnight sleeper coaches</li>
                  <li><strong>Semi-Sleeper AC:</strong> Reclining seats</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚐 Non-AC Buses</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>Sleeper:</strong> Non-AC sleeper</li>
                  <li><strong>Seater:</strong> Regular seats</li>
                  <li><strong>Express:</strong> Fast non-AC service</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Flight Seat Classes:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">✈️ Economy</h3>
                <p className="text-sm">Standard seating, most affordable option</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">💼 Business</h3>
                <p className="text-sm">Premium seats with extra legroom</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">👑 First Class</h3>
                <p className="text-sm">Luxury seating with full service</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">How to Check Availability:</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Select your travel mode (Train/Bus/Flight)</li>
              <li>Enter source and destination</li>
              <li>Choose your travel date</li>
              <li>Click "Search" to see available options</li>
              <li>View real-time seat availability for each option</li>
              <li>Select your preferred class and book instantly</li>
            </ol>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">💡 Pro Tips:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Book early during peak seasons (festivals, holidays)</li>
                <li>✅ Check Tatkal quota if normal seats are full (trains)</li>
                <li>✅ Consider nearby stations for more availability</li>
                <li>✅ Set alerts for seat availability notifications</li>
                <li>✅ Check RAC/waitlist chances before booking</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Availability Indicators:</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span><strong>Available:</strong> Seats are readily available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span><strong>Limited:</strong> Few seats remaining</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span><strong>RAC:</strong> Reservation Against Cancellation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span><strong>Waitlist:</strong> Waiting list available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span><strong>Not Available:</strong> Fully booked</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
            <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
              ← Back to Home
            </Link>
            <Link to="/trains" className="inline-block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition font-semibold">
              Search Trains →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
