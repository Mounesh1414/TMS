import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';


const RECENT_KEY = 'recentSearches';

export default function Home() {
  const [mode, setMode] = useState('train');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [topTrains, setTopTrains] = useState([]);
  const [topBuses, setTopBuses] = useState([]);
  const [topFlights, setTopFlights] = useState([]);
  const navigate = useNavigate();

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Save to recent searches
    const newSearch = { mode, source, destination, date };
    let updated = [newSearch, ...recent.filter(s => JSON.stringify(s) !== JSON.stringify(newSearch))];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    navigate(`/${mode}s?source=${source}&destination=${destination}&date=${date}`);
  };

  useEffect(() => {
    // Fetch top budget picks
    API.get('/trains?sortBy=fare&order=asc&limit=3').then(r => setTopTrains(r.data)).catch(() => {});
    API.get('/buses?sortBy=fare&order=asc&limit=3').then(r => setTopBuses(r.data)).catch(() => {});
    API.get('/flights?sortBy=fare&order=asc&limit=3').then(r => setTopFlights(r.data)).catch(() => {});
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-hero bg-hero-home bg-hero-fixed rounded-2xl shadow-xl mb-16">
          <div className="hero-overlay"></div>
          <div className="relative z-10 py-16 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white text-shadow-lg mb-4 tracking-tight">Book Your Journey</h1>
            <p className="text-2xl text-white/90 font-medium mb-6">Trains, Buses & Flights — All in One Place</p>
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <button
                onClick={() => setMode('train')}
                className={`px-6 py-3 rounded-full font-semibold shadow ${mode === 'train' ? 'bg-primary text-white' : 'bg-white/80 text-primary border border-primary'}`}
              >
                🚂 Trains
              </button>
              <button
                onClick={() => setMode('bus')}
                className={`px-6 py-3 rounded-full font-semibold shadow ${mode === 'bus' ? 'bg-primary text-white' : 'bg-white/80 text-primary border border-primary'}`}
              >
                🚌 Buses
              </button>
              <button
                onClick={() => setMode('flight')}
                className={`px-6 py-3 rounded-full font-semibold shadow ${mode === 'flight' ? 'bg-primary text-white' : 'bg-white/80 text-primary border border-primary'}`}
              >
                ✈️ Flights
              </button>
            </div>
            <form onSubmit={handleSearch} className="bg-white/90 rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col gap-4 items-center">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="text"
                  placeholder="From (Source)"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="To (Destination)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none w-full"
                  required
                />
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={e => setDate(e.target.value)}
                  className="border-2 border-primary/30 rounded-lg px-4 py-3 focus:border-primary outline-none w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-accent transition"
              >
                Search {mode.charAt(0).toUpperCase() + mode.slice(1)}s
              </button>
            </form>
          </div>
        </div>

        {/* Recent Searches */}
        {recent.length > 0 && (
          <div className="max-w-xl mx-auto mb-10">
            <h3 className="text-xl font-bold text-secondary mb-2">Recent Searches</h3>
            <div className="flex flex-col gap-2">
              {recent.map((s, idx) => (
                <button
                  key={idx}
                  className="bg-white/80 backdrop-blur px-4 py-3 rounded-xl shadow flex items-center justify-between hover:bg-primary/10 transition"
                  onClick={() => navigate(`/${s.mode}s?source=${s.source}&destination=${s.destination}&date=${s.date}`)}
                >
                  <span className="font-semibold text-secondary">{s.source} → {s.destination}</span>
                  <span className="text-sm text-gray-600 mx-2">{s.date}</span>
                  <span className="text-xs px-2 py-1 rounded bg-primary text-white">{s.mode.charAt(0).toUpperCase() + s.mode.slice(1)}</span>
                  <span className="ml-3 text-primary font-bold">Rebook</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🎫</div>
            <h3 className="font-bold text-lg mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book your tickets in just a few clicks</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">Best Prices</h3>
            <p className="text-gray-600">Get the best deals on all routes</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% safe and secure transactions</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="max-w-6xl mx-auto mt-16 grid gap-10">
          <section>
            <h3 className="text-2xl font-bold text-secondary mb-4">Top Budget Trains</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topTrains.map(t => (
                <Link key={t._id} to={`/booking?type=train&id=${t._id}`} className="bg-white/80 backdrop-blur p-4 rounded-lg shadow hover:shadow-lg transition block">
                  <img src={t.imageUrl || '/images/train-placeholder.svg'} alt={t.name} className="w-full h-32 object-cover rounded" onError={(e)=>e.currentTarget.src='/images/train-placeholder.svg'} />
                  <div className="mt-3">
                    <p className="font-bold text-secondary">{t.name} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{t.trainNumber}</span></p>
                    <p className="text-sm text-gray-600">{t.source} → {t.destination}</p>
                    <p className="text-primary font-bold">₹{t.fare}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-2xl font-bold text-secondary mb-4">Top Budget Buses</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topBuses.map(b => (
                <Link key={b._id} to={`/booking?type=bus&id=${b._id}`} className="bg-white/80 backdrop-blur p-4 rounded-lg shadow hover:shadow-lg transition block">
                  <img src={b.imageUrl || '/images/bus-placeholder.svg'} alt={b.name} className="w-full h-32 object-cover rounded" onError={(e)=>e.currentTarget.src='/images/bus-placeholder.svg'} />
                  <div className="mt-3">
                    <p className="font-bold text-secondary">{b.name} <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{b.busNumber}</span></p>
                    <p className="text-sm text-gray-600">{b.source} → {b.destination}</p>
                    <p className="text-primary font-bold">₹{b.fare}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-2xl font-bold text-secondary mb-4">Top Budget Flights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topFlights.map(f => (
                <Link key={f._id} to={`/booking?type=flight&id=${f._id}`} className="bg-white/80 backdrop-blur p-4 rounded-lg shadow hover:shadow-lg transition block">
                  <img src={f.imageUrl || '/images/flight-placeholder.svg'} alt={f.airline} className="w-full h-32 object-cover rounded" onError={(e)=>e.currentTarget.src='/images/flight-placeholder.svg'} />
                  <div className="mt-3">
                    <p className="font-bold text-secondary">{f.airline} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{f.flightNumber}</span></p>
                    <p className="text-sm text-gray-600">{f.source} → {f.destination}</p>
                    <p className="text-primary font-bold">₹{f.fare}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-4 py-8 text-xs text-gray-700 text-center">
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Link to="/about" className="underline hover:text-primary">About</Link>
            <Link to="/contact" className="underline hover:text-primary">Contact</Link>
            <Link to="/terms" className="underline hover:text-primary">Terms</Link>
            <Link to="/privacy" className="underline hover:text-primary">Privacy</Link>
          </div>
          <div>© {new Date().getFullYear()} Indian Tickets. All Rights Reserved.</div>
        </footer>
      </div>
    </div>
  );
}
