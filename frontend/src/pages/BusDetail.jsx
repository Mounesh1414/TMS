import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function BusDetail() {
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/buses/${id}`)
      .then(res => setBus(res.data))
      .catch(() => navigate('/buses'));
  }, [id, navigate]);

  if (!bus) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="flex gap-8 flex-col md:flex-row items-center md:items-start">
          <img
            src={bus.imageUrl || '/images/bus-placeholder.svg'}
            alt={bus.name}
            className="w-64 h-40 object-cover rounded-xl border"
            onError={e => (e.currentTarget.src = '/images/bus-placeholder.svg')}
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-secondary mb-2">{bus.name}</h2>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{bus.busNumber}</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{bus.type}</span>
              <span className={`${bus.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>{bus.operatorType}</span>
              {bus.operatorName && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{bus.operatorName}</span>}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Route:</span> {bus.source} → {bus.destination}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Departure:</span> {bus.departureTime} &nbsp;|&nbsp;
              <span className="font-semibold">Arrival:</span> {bus.arrivalTime}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Available Seats:</span> <span className="text-green-600 font-bold">{bus.availableSeats}</span> / {bus.totalSeats}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fare per Seat:</span> <span className="text-primary font-bold">₹{bus.fare}</span>
            </div>
            {bus.amenities && (
              <div className="mb-2">
                <span className="font-semibold">Amenities:</span> {Object.entries(bus.amenities).filter(([k,v])=>v).map(([k]) => (
                  <span key={k} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs ml-2">{k.toUpperCase()}</span>
                ))}
              </div>
            )}
            <div className="mt-4">
              {bus.availableSeats > 0 ? (
                <Link to={`/booking?type=bus&id=${bus._id}`} className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-accent transition font-bold">Book Now</Link>
              ) : (
                <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed">Fully Booked</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/buses" className="text-primary underline">← Back to Buses</Link>
      </div>
    </div>
  );
}
