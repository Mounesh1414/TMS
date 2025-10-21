import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function FlightDetail() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/flights/${id}`)
      .then(res => setFlight(res.data))
      .catch(() => navigate('/flights'));
  }, [id, navigate]);

  if (!flight) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="flex gap-8 flex-col md:flex-row items-center md:items-start">
          <img
            src={flight.imageUrl || '/images/flight-placeholder.svg'}
            alt={flight.airline}
            className="w-64 h-40 object-cover rounded-xl border"
            onError={e => (e.currentTarget.src = '/images/flight-placeholder.svg')}
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-secondary mb-2">{flight.airline}</h2>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{flight.flightNumber}</span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{flight.class}</span>
              <span className={`${flight.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>{flight.operatorType}</span>
              {flight.operatorName && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{flight.operatorName}</span>}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Route:</span> {flight.source} → {flight.destination}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Departure:</span> {flight.departureTime} &nbsp;|&nbsp;
              <span className="font-semibold">Arrival:</span> {flight.arrivalTime}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Available Seats:</span> <span className="text-green-600 font-bold">{flight.availableSeats}</span> / {flight.totalSeats}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fare per Seat:</span> <span className="text-primary font-bold">₹{flight.fare}</span>
            </div>
            {flight.amenities && (
              <div className="mb-2">
                <span className="font-semibold">Amenities:</span> {Object.entries(flight.amenities).filter(([k,v])=>v).map(([k]) => (
                  <span key={k} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs ml-2">{k.toUpperCase()}</span>
                ))}
              </div>
            )}
            <div className="mt-4">
              {flight.availableSeats > 0 ? (
                <Link to={`/booking?type=flight&id=${flight._id}`} className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-accent transition font-bold">Book Now</Link>
              ) : (
                <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed">Fully Booked</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/flights" className="text-primary underline">← Back to Flights</Link>
      </div>
    </div>
  );
}
