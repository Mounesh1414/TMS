import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function TrainDetail() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/trains/${id}`)
      .then(res => setTrain(res.data))
      .catch(() => navigate('/trains'));
  }, [id, navigate]);

  if (!train) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="flex gap-8 flex-col md:flex-row items-center md:items-start">
          <img
            src={train.imageUrl || '/images/train-placeholder.svg'}
            alt={train.name}
            className="w-64 h-40 object-cover rounded-xl border"
            onError={e => (e.currentTarget.src = '/images/train-placeholder.svg')}
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-secondary mb-2">{train.name}</h2>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{train.trainNumber}</span>
              <span className={`${train.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>{train.operatorType}</span>
              {train.operatorName && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{train.operatorName}</span>}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Route:</span> {train.source} → {train.destination}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Departure:</span> {train.departureTime} &nbsp;|&nbsp;
              <span className="font-semibold">Arrival:</span> {train.arrivalTime}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Available Seats:</span> <span className="text-green-600 font-bold">{train.availableSeats}</span> / {train.totalSeats}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Fare per Seat:</span> <span className="text-primary font-bold">₹{train.fare}</span>
            </div>
            {train.classes && train.classes.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Classes:</span> {train.classes.map((cls, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded text-sm ml-2">{cls}</span>
                ))}
              </div>
            )}
            {train.amenities && (
              <div className="mb-2">
                <span className="font-semibold">Amenities:</span> {Object.entries(train.amenities).filter(([k,v])=>v).map(([k]) => (
                  <span key={k} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs ml-2">{k.toUpperCase()}</span>
                ))}
              </div>
            )}
            <div className="mt-4">
              {train.availableSeats > 0 ? (
                <Link to={`/booking?type=train&id=${train._id}`} className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-accent transition font-bold">Book Now</Link>
              ) : (
                <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed">Fully Booked</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/trains" className="text-primary underline">← Back to Trains</Link>
      </div>
    </div>
  );
}
