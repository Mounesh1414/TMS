import React from 'react';
import { Link } from 'react-router-dom';

export default function TrainSchedule() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">Train Schedule Information</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Access complete train schedules including departure times, arrival times, stoppage details, 
              and running days for all trains across India. Plan your journey with accurate timetable information.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">What You Can Find:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">⏰ Timing Details</h3>
                <ul className="text-sm space-y-1">
                  <li>Departure time from source station</li>
                  <li>Arrival time at destination</li>
                  <li>Stop duration at each station</li>
                  <li>Total journey time</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚉 Station Information</h3>
                <ul className="text-sm space-y-1">
                  <li>All intermediate stations</li>
                  <li>Platform numbers</li>
                  <li>Halt duration</li>
                  <li>Distance covered</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">📅 Running Days</h3>
                <ul className="text-sm space-y-1">
                  <li>Days of operation</li>
                  <li>Weekly schedule</li>
                  <li>Special holiday schedules</li>
                  <li>Cancelled dates (if any)</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary mb-2">🚂 Train Details</h3>
                <ul className="text-sm space-y-1">
                  <li>Train name and number</li>
                  <li>Type (Express/Mail/Passenger)</li>
                  <li>Available classes</li>
                  <li>Pantry/catering availability</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Train Types:</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-secondary">Rajdhani Express</h4>
                <p className="text-sm">Premium trains connecting state capitals to Delhi, all AC, limited stops</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-secondary">Shatabdi Express</h4>
                <p className="text-sm">High-speed day trains, all AC, return same day</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-secondary">Duronto Express</h4>
                <p className="text-sm">Non-stop or few-stop trains between major cities</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-secondary">Superfast Express</h4>
                <p className="text-sm">Faster than regular express with fewer stops</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-secondary">Mail/Express</h4>
                <p className="text-sm">Regular long-distance trains with multiple stops</p>
              </div>
              <div className="border-l-4 border-gray-500 pl-4">
                <h4 className="font-semibold text-secondary">Passenger Trains</h4>
                <p className="text-sm">Local trains stopping at all stations, lowest fares</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">How to Check Train Schedule:</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Enter train number or name in the search box</li>
              <li>View complete route with all stations</li>
              <li>Check arrival and departure times</li>
              <li>Verify running days (Mon-Sun)</li>
              <li>Note halt duration at your boarding station</li>
              <li>Calculate total journey time</li>
            </ol>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">⚠️ Important Notes:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Train schedules are subject to change; always verify before booking</li>
                <li>✅ Delays can occur due to weather, track maintenance, or other factors</li>
                <li>✅ Reach station at least 20-30 minutes before departure</li>
                <li>✅ Check platform number on arrival for your train</li>
                <li>✅ Keep track of real-time train status on journey day</li>
                <li>✅ Some trains may have different schedules on different days</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Sample Schedule Format:</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg text-sm">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Station</th>
                    <th className="px-4 py-2 text-left">Arrival</th>
                    <th className="px-4 py-2 text-left">Departure</th>
                    <th className="px-4 py-2 text-left">Halt</th>
                    <th className="px-4 py-2 text-left">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">New Delhi (NDLS)</td>
                    <td className="px-4 py-2">--</td>
                    <td className="px-4 py-2">16:55</td>
                    <td className="px-4 py-2">Source</td>
                    <td className="px-4 py-2">0 km</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-4 py-2">Kota Junction (KOTA)</td>
                    <td className="px-4 py-2">22:05</td>
                    <td className="px-4 py-2">22:10</td>
                    <td className="px-4 py-2">5 min</td>
                    <td className="px-4 py-2">465 km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Mumbai Central (BCT)</td>
                    <td className="px-4 py-2">08:35</td>
                    <td className="px-4 py-2">--</td>
                    <td className="px-4 py-2">Destination</td>
                    <td className="px-4 py-2">1384 km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
            <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
              ← Back to Home
            </Link>
            <Link to="/trains" className="inline-block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition font-semibold">
              View All Trains →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
