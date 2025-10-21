import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const RECENT_KEY = 'recentSearches';

export default function ITHome() {
  const [mode, setMode] = useState('train');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [recent, setRecent] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [trainResults, setTrainResults] = useState([]);
  const [busResults, setBusResults] = useState([]);
  const [flightResults, setFlightResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) setRecent(JSON.parse(stored));
    API.get('/public/announcements?limit=5').then(r => setAnnouncements(r.data || [])).catch(()=>{});
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const newSearch = { mode, source, destination, date };
    let updated = [newSearch, ...recent.filter(s => JSON.stringify(s) !== JSON.stringify(newSearch))];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    
    // Fetch ALL results (trains, buses, flights) on the same page
    setSearching(true);
    setShowResults(true);
    setActiveTab('all');
    
    try {
      // Fetch all three modes simultaneously
      const [trainsRes, busesRes, flightsRes] = await Promise.all([
        API.get(`/trains?source=${source}&destination=${destination}&date=${date}`).catch(() => ({ data: [] })),
        API.get(`/buses?source=${source}&destination=${destination}&date=${date}`).catch(() => ({ data: [] })),
        API.get(`/flights?source=${source}&destination=${destination}&date=${date}`).catch(() => ({ data: [] }))
      ]);
      
      setTrainResults(trainsRes.data || []);
      setBusResults(busesRes.data || []);
      setFlightResults(flightsRes.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setTrainResults([]);
      setBusResults([]);
      setFlightResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e9f2ff] to-[#fff7ed] bg-pattern-dots">
      {/* Enhanced Hero Section with Background Image */}
      <div className="relative overflow-hidden bg-hero bg-hero-home bg-hero-fixed py-20 mb-10">
        <div className="hero-pattern"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center gap-4 animate-bounce-in">
            <div className="icon-container icon-primary animate-float">🚂</div>
            <div className="icon-container icon-success animate-float" style={{animationDelay: '0.3s'}}>🚌</div>
            <div className="icon-container icon-purple animate-float" style={{animationDelay: '0.6s'}}>✈️</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-slide-down text-shadow-lg">
            Welcome to Indian Tickets 🇮�
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-slide-up delay-100 text-shadow">
            Your one-stop platform for booking trains, buses, and flights across India. 
            Search, compare, and book your journey in just a few clicks!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fade-in delay-200">
            <Link to="/services#realtime" className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30 hover:bg-white/40 hover:scale-105 transition-all cursor-pointer shadow-lg">
              <span className="text-white font-semibold">⚡ Real-time Availability</span>
            </Link>
            <Link to="/services#payments" className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30 hover:bg-white/40 hover:scale-105 transition-all cursor-pointer shadow-lg">
              <span className="text-white font-semibold">🔒 Secure Payments</span>
            </Link>
            <Link to="/services#support" className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30 hover:bg-white/40 hover:scale-105 transition-all cursor-pointer shadow-lg">
              <span className="text-white font-semibold">🎧 24/7 Support</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold text-secondary mb-3">🔍 Start Your Journey</h2>
          <p className="text-gray-600 text-lg">Choose your mode of transport and search for the best options</p>
        </div>
        
        <div className="card-glass animate-scale-in delay-200">
          <div className="flex flex-wrap gap-3 mb-3">
            {['train','bus','flight'].map(m => (
              <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${mode===m? 'bg-primary text-white border-primary shadow-colored':'bg-white text-primary border-primary/40 hover:border-primary'}`}>
                {m==='train'?'🚂 Trains':m==='bus'?'🚌 Buses':'✈️ Flights'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input type="text" placeholder="From" value={source} onChange={e=>setSource(e.target.value)} className="input focus-ring" required />
            <input type="text" placeholder="To" value={destination} onChange={e=>setDestination(e.target.value)} className="input focus-ring" required />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().slice(0,10)} className="input focus-ring" required />
            <button type="submit" className="btn-gradient">Search {mode}s</button>
          </form>
        </div>

        {/* Recent Searches */}
        {recent.length>0 && !showResults && (
          <div className="mt-4 card-glass animate-slide-up delay-300">
            <div className="font-semibold text-secondary mb-2">🕒 Recent Searches</div>
            <div className="flex flex-col gap-2">
              {recent.map((s,i)=>(
                <button key={i} onClick={()=>navigate(`/${s.mode}s?source=${s.source}&destination=${s.destination}&date=${s.date}`)} className="flex justify-between items-center card-hover bg-gradient-to-r from-blue-50 to-orange-50 border border-primary/10 rounded-xl px-4 py-2">
                  <span className="font-semibold text-secondary">{s.source} → {s.destination}</span>
                  <span className="text-sm text-gray-600">{s.date}</span>
                  <span className="badge-primary">{s.mode}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="mt-6 card-glass animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold gradient-text">
                🔍 Search Results: {source} → {destination}
              </h2>
              <button onClick={() => setShowResults(false)} className="text-gray-500 hover:text-gray-700 font-semibold transition">
                ✕ Close
              </button>
            </div>

            <div className="mb-4 p-4 alert-info">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Route:</strong> {source} → {destination} | <strong>Date:</strong> {date}
              </p>
              <p className="text-sm font-semibold text-secondary">
                Found: {trainResults.length} Trains | {busResults.length} Buses | {flightResults.length} Flights
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 font-semibold border-b-2 transition ${activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                All ({trainResults.length + busResults.length + flightResults.length})
              </button>
              <button
                onClick={() => setActiveTab('train')}
                className={`px-6 py-3 font-semibold border-b-2 transition ${activeTab === 'train' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                🚂 Trains ({trainResults.length})
              </button>
              <button
                onClick={() => setActiveTab('bus')}
                className={`px-6 py-3 font-semibold border-b-2 transition ${activeTab === 'bus' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                🚌 Buses ({busResults.length})
              </button>
              <button
                onClick={() => setActiveTab('flight')}
                className={`px-6 py-3 font-semibold border-b-2 transition ${activeTab === 'flight' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                ✈️ Flights ({flightResults.length})
              </button>
            </div>

            {searching ? (
              <div className="text-center py-12 animate-pulse-slow">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-gray-600">Searching all available options...</p>
                <p className="text-sm text-gray-500 mt-2">Checking trains, buses, and flights for you</p>
                <div className="spinner mx-auto mt-4"></div>
              </div>
            ) : (trainResults.length === 0 && busResults.length === 0 && flightResults.length === 0) ? (
              <div className="text-center py-12 alert-warning animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-bold text-gray-700 mb-2">No Results Found</p>
                <p className="text-gray-600 mb-4">No trains, buses, or flights available for this route on {date}</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link to="/trains" className="btn-primary">
                    View All Trains
                  </Link>
                  <Link to="/buses" className="btn-secondary">
                    View All Buses
                  </Link>
                  <Link to="/flights" className="btn-gradient">
                    View All Flights
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Trains Section */}
                {(activeTab === 'all' || activeTab === 'train') && trainResults.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                      🚂 Available Trains ({trainResults.length})
                    </h3>
                    <div className="space-y-3">
                      {trainResults.map((item) => (
                        <div key={item._id} className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 hover:shadow-lg transition">
                          <div className="flex flex-col md:flex-row gap-4 items-start">
                            <Link to={`/trains/${item._id}`} className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                              <img
                                src={item.imageUrl || '/images/train-placeholder.svg'}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition"
                                onError={(e) => (e.currentTarget.src = '/images/train-placeholder.svg')}
                              />
                            </Link>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link to={`/trains/${item._id}`} className="text-xl font-bold text-secondary hover:underline">
                                    {item.name}
                                  </Link>
                                  <div className="flex gap-2 mt-1">
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                      {item.trainNumber}
                                    </span>
                                    {item.operatorType && (
                                      <span className={`${item.operatorType === 'government' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'} px-2 py-1 rounded text-xs`}>
                                        {item.operatorType}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">₹{item.fare}</p>
                                  <p className="text-xs text-gray-600">per seat</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600">Route</p>
                                  <p className="font-semibold">{item.source} → {item.destination}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Departure</p>
                                  <p className="font-semibold text-green-700">{item.departureTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Arrival</p>
                                  <p className="font-semibold text-red-700">{item.arrivalTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Available</p>
                                  <p className="font-semibold">
                                    <span className="text-green-600">{item.availableSeats}</span>
                                    <span className="text-gray-400">/{item.totalSeats}</span>
                                  </p>
                                </div>
                              </div>

                              {item.amenities && Object.keys(item.amenities).length > 0 && (
                                <div className="flex gap-2 mb-3">
                                  {item.amenities.ac && <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">❄️ AC</span>}
                                  {item.amenities.wifi && <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">📶 WiFi</span>}
                                  {item.amenities.pantry && <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs">🍽️ Pantry</span>}
                                </div>
                              )}

                              <div className="flex gap-3">
                                {item.availableSeats > 0 ? (
                                  <Link
                                    to={`/booking?type=train&id=${item._id}`}
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition font-semibold"
                                  >
                                    Book Train Now →
                                  </Link>
                                ) : (
                                  <button disabled className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed font-semibold">
                                    Fully Booked
                                  </button>
                                )}
                                <Link
                                  to={`/trains/${item._id}`}
                                  className="border-2 border-secondary text-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-white transition font-semibold"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buses Section */}
                {(activeTab === 'all' || activeTab === 'bus') && busResults.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                      🚌 Available Buses ({busResults.length})
                    </h3>
                    <div className="space-y-3">
                      {busResults.map((item) => (
                        <div key={item._id} className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4 hover:shadow-lg transition">
                          <div className="flex flex-col md:flex-row gap-4 items-start">
                            <Link to={`/buses/${item._id}`} className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                              <img
                                src={item.imageUrl || '/images/bus-placeholder.svg'}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition"
                                onError={(e) => (e.currentTarget.src = '/images/bus-placeholder.svg')}
                              />
                            </Link>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link to={`/buses/${item._id}`} className="text-xl font-bold text-secondary hover:underline">
                                    {item.name}
                                  </Link>
                                  <div className="flex gap-2 mt-1">
                                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                      {item.busNumber}
                                    </span>
                                    {item.operatorType && (
                                      <span className={`${item.operatorType === 'government' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'} px-2 py-1 rounded text-xs`}>
                                        {item.operatorType}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">₹{item.fare}</p>
                                  <p className="text-xs text-gray-600">per seat</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600">Route</p>
                                  <p className="font-semibold">{item.source} → {item.destination}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Departure</p>
                                  <p className="font-semibold text-green-700">{item.departureTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Arrival</p>
                                  <p className="font-semibold text-red-700">{item.arrivalTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Available</p>
                                  <p className="font-semibold">
                                    <span className="text-green-600">{item.availableSeats}</span>
                                    <span className="text-gray-400">/{item.totalSeats}</span>
                                  </p>
                                </div>
                              </div>

                              {item.amenities && Object.keys(item.amenities).length > 0 && (
                                <div className="flex gap-2 mb-3">
                                  {item.amenities.ac && <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">❄️ AC</span>}
                                  {item.amenities.wifi && <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">📶 WiFi</span>}
                                  {item.amenities.charging && <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">🔌 Charging</span>}
                                </div>
                              )}

                              <div className="flex gap-3">
                                {item.availableSeats > 0 ? (
                                  <Link
                                    to={`/booking?type=bus&id=${item._id}`}
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition font-semibold"
                                  >
                                    Book Bus Now →
                                  </Link>
                                ) : (
                                  <button disabled className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed font-semibold">
                                    Fully Booked
                                  </button>
                                )}
                                <Link
                                  to={`/buses/${item._id}`}
                                  className="border-2 border-secondary text-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-white transition font-semibold"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flights Section */}
                {(activeTab === 'all' || activeTab === 'flight') && flightResults.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                      ✈️ Available Flights ({flightResults.length})
                    </h3>
                    <div className="space-y-3">
                      {flightResults.map((item) => (
                        <div key={item._id} className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4 hover:shadow-lg transition">
                          <div className="flex flex-col md:flex-row gap-4 items-start">
                            <Link to={`/flights/${item._id}`} className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                              <img
                                src={item.imageUrl || '/images/flight-placeholder.svg'}
                                alt={item.airline}
                                className="w-full h-full object-cover hover:scale-105 transition"
                                onError={(e) => (e.currentTarget.src = '/images/flight-placeholder.svg')}
                              />
                            </Link>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link to={`/flights/${item._id}`} className="text-xl font-bold text-secondary hover:underline">
                                    {item.airline}
                                  </Link>
                                  <div className="flex gap-2 mt-1">
                                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                      {item.flightNumber}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">₹{item.fare}</p>
                                  <p className="text-xs text-gray-600">per seat</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600">Route</p>
                                  <p className="font-semibold">{item.source} → {item.destination}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Departure</p>
                                  <p className="font-semibold text-green-700">{item.departureTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Arrival</p>
                                  <p className="font-semibold text-red-700">{item.arrivalTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Available</p>
                                  <p className="font-semibold">
                                    <span className="text-green-600">{item.availableSeats}</span>
                                    <span className="text-gray-400">/{item.totalSeats}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                {item.availableSeats > 0 ? (
                                  <Link
                                    to={`/booking?type=flight&id=${item._id}`}
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition font-semibold"
                                  >
                                    Book Flight Now →
                                  </Link>
                                ) : (
                                  <button disabled className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed font-semibold">
                                    Fully Booked
                                  </button>
                                )}
                                <Link
                                  to={`/flights/${item._id}`}
                                  className="border-2 border-secondary text-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-white transition font-semibold"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Quick Links + Service Updates */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Quick Links */}
        <aside className="md:col-span-1 animate-slide-up">
          <h3 className="font-bold text-secondary mb-3">⚡ Quick Access</h3>
          <p className="text-xs text-gray-600 mb-3">
            Instant access to essential travel services and information
          </p>
          <div className="space-y-2">
            <Link to="/pnr-status" className="block btn-secondary text-sm hover-lift">
              PNR Status
            </Link>
            <Link to="/seat-availability" className="block btn-secondary text-sm hover-lift">
              Berth/Seat
            </Link>
            <Link to="/train-schedule" className="block btn-secondary text-sm hover-lift">
              Train Schedule
            </Link>
            <Link to="/trains" className="block btn-secondary text-sm hover-lift">
              Between Stations
            </Link>
            <Link to="/seat-availability" className="block btn-secondary text-sm hover-lift">
              Seat Availability
            </Link>
            <Link to="/services" className="block btn-secondary text-sm hover-lift">
              Smart Suggestions
            </Link>
          </div>
        </aside>

        {/* Center Content */}
        <section className="md:col-span-3 space-y-4">
          {/* Service Updates (Announcements) */}
          <div className="card-glass animate-slide-up delay-100">
            <div className="font-semibold text-secondary mb-2">📢 Service Updates</div>
            <p className="text-xs text-gray-600 mb-3">Stay informed about the latest updates, announcements, and important notices</p>
            {announcements.length===0? (
              <div className="alert-success text-center">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-sm font-semibold text-gray-700 mb-1">All Systems Operational</p>
                <p className="text-xs text-gray-500">No current announcements. Check back later for updates.</p>
                <Link to="/announcements" className="inline-block mt-3 text-primary text-xs hover:underline font-semibold">
                  View All Announcements →
                </Link>
              </div>
            ):(
              <ul className="list-disc pl-4 space-y-1 text-sm">
                {announcements.map(a=> (
                  <li key={a.id}>
                    {a.link? <a href={a.link} className="underline text-[#1b4f9c] hover:text-primary" target="_blank" rel="noreferrer">{a.title}</a> : <span className="text-[#1b4f9c]">{a.title}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Additional Services */}
          <div className="mt-6 animate-fade-in delay-200">
            <h2 className="text-2xl font-bold gradient-text mb-4">Additional Services</h2>
            <p className="text-gray-700 mb-4">
              Beyond booking tickets, we offer a complete suite of travel services to enhance your journey experience. 
              From real-time status tracking to secure payments, we've got everything you need for hassle-free travel planning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="feature-card border-l-4 border-primary hover-card">
                <div className="text-3xl mb-3">🎫</div>
                <h3 className="font-semibold text-secondary mb-2">PNR Status Check</h3>
                <p className="text-sm text-gray-700 mb-3">Track your train ticket status in real-time with live updates on booking confirmation, RAC, and waitlist.</p>
                <Link to="/pnr-status" className="text-primary text-sm hover:underline font-semibold">Learn more →</Link>
              </div>

              <div className="feature-card border-l-4 border-accent hover-card">
                <div className="text-3xl mb-3">💺</div>
                <h3 className="font-semibold text-secondary mb-2">Seat Availability</h3>
                <p className="text-sm text-gray-700 mb-3">Check live seat and berth availability across all trains, buses, and flights before booking.</p>
                <Link to="/seat-availability" className="text-primary text-sm hover:underline font-semibold">Learn more →</Link>
              </div>

              <div className="feature-card border-l-4 border-secondary hover-card">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-secondary mb-2">Train Schedule</h3>
                <p className="text-sm text-gray-700 mb-3">Access detailed timetables, stoppage information, and running days for all trains.</p>
                <Link to="/train-schedule" className="text-primary text-sm hover:underline font-semibold">Learn more →</Link>
              </div>

              <div className="feature-card border-l-4 border-green-500 hover-card">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-semibold text-secondary mb-2">Smart Suggestions</h3>
                <p className="text-sm text-gray-700 mb-2">Get AI-powered journey recommendations based on your preferences, budget, and travel history.</p>
                <span className="badge-warning">Coming soon</span>
              </div>

              <div className="feature-card border-l-4 border-blue-500 hover-card">
                <div className="text-3xl mb-3">🔐</div>
                <h3 className="font-semibold text-secondary mb-2">Secure Payments</h3>
                <p className="text-sm text-gray-700 mb-2">Multiple payment options with 256-bit SSL encryption, PCI-DSS compliant gateways.</p>
                <p className="text-xs text-gray-500">Supported: UPI, Cards, Net Banking, Wallets</p>
              </div>

              <div className="card-orange hover-card animate-bounce-in">
                <div className="icon-container icon-primary mb-3 mx-auto icon-floating">📱</div>
                <h3 className="font-semibold text-secondary mb-2 text-lg">Mobile App</h3>
                <p className="text-sm text-gray-700 mb-2">Book on-the-go with our mobile app (Android & iOS) with offline ticket access.</p>
                <span className="badge-warning">Coming soon</span>
              </div>

              <div className="card-red hover-card animate-bounce-in" style={{animationDelay: '0.1s'}}>
                <div className="icon-container icon-pink mb-3 mx-auto icon-floating">🔔</div>
                <h3 className="font-semibold text-secondary mb-2 text-lg">Real-time Alerts</h3>
                <p className="text-sm text-gray-700 mb-2">Get instant notifications for booking confirmations, PNR updates, and travel reminders.</p>
                <p className="text-xs text-gray-500">Via SMS, Email & In-app notifications</p>
              </div>

              <div className="card-purple hover-card animate-bounce-in" style={{animationDelay: '0.2s'}}>
                <div className="icon-container icon-purple mb-3 mx-auto icon-floating">💰</div>
                <h3 className="font-semibold text-secondary mb-2 text-lg">Best Price Guarantee</h3>
                <p className="text-sm text-gray-700 mb-2">Transparent pricing with no hidden charges. Get the best deals and exclusive offers.</p>
                <p className="text-xs text-gray-500">Compare prices & save on every booking</p>
              </div>
            </div>
          </div>

          {/* Why Choose Our Services */}
          <div className="mt-6 card-gradient animate-fade-in delay-300">
            <h2 className="text-2xl font-bold text-secondary mb-4">Why Choose Our Services?</h2>
            <p className="text-gray-700 mb-4">
              Indian Tickets stands out as your trusted travel partner with cutting-edge technology, 
              robust security, and customer-first approach. Here's what makes us different:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-slide-up delay-100">
                <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> User-Friendly Platform
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Simple 3-step booking process</li>
                  <li>• Intuitive search and filters</li>
                  <li>• Quick rebooking of recent searches</li>
                  <li>• Easy cancellation and refunds</li>
                </ul>
              </div>
              <div className="animate-slide-up delay-200">
                <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Fast & Reliable
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Real-time availability updates</li>
                  <li>• Instant booking confirmation</li>
                  <li>• 99.9% uptime guarantee</li>
                  <li>• Quick customer support response</li>
                </ul>
              </div>
              <div className="animate-slide-up delay-300">
                <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span> Secure & Safe
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• SSL encrypted transactions</li>
                  <li>• PCI-DSS certified payment gateway</li>
                  <li>• Data privacy compliance</li>
                  <li>• Fraud detection systems</li>
                </ul>
              </div>
              <div className="animate-slide-up delay-400">
                <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                  <span className="text-2xl">💬</span> 24/7 Support
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Round-the-clock customer service</li>
                  <li>• Multiple contact channels</li>
                  <li>• Quick issue resolution</li>
                  <li>• Multilingual support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vigilance & Safety Services */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">Vigilance & Safety Services</h2>
            <p className="text-gray-700 mb-4">
              Your safety and trust are our top priorities. We maintain transparency and provide dedicated channels 
              for reporting concerns. We're committed to maintaining the highest standards of service integrity.
            </p>
            <div className="space-y-4">
              <div className="border-2 border-yellow-300 bg-yellow-50 rounded-xl p-4">
                <h3 className="font-semibold text-secondary mb-2">📞 Vigilance Helpline</h3>
                <p className="text-sm text-gray-700 mb-3">Report any suspicious activities, corruption, or security concerns. Your identity will be kept confidential.</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Helpline:</strong> 1800-XXX-XXXX (Toll Free)</p>
                  <p><strong>Email:</strong> vigilance@indiantickets.com</p>
                  <p><strong>Available:</strong> 24/7</p>
                </div>
              </div>

              <div className="border-2 border-blue-300 bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-secondary mb-2">🏷️ Upcoming E-Auction</h3>
                <p className="text-sm text-gray-700 mb-2">Participate in upcoming auctions for premium travel packages, loyalty points, and exclusive offers.</p>
                <p className="text-sm text-gray-700"><strong>Next Auction:</strong> Check announcements for details</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mb-3">
            <h3 className="font-semibold text-secondary mb-2">Quick Features</h3>
            <p className="text-xs text-gray-600">Explore our comprehensive travel and safety services</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link to="/services" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Vigilance Helpline
            </Link>
            <Link to="/services" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Upcoming E-auction
            </Link>
            <Link to="/services" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Best Prices
            </Link>
            <Link to="/services" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Secure Payment
            </Link>
            <Link to="/announcements" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Press Releases
            </Link>
            <Link to="/services" className="bg-[#1b4f9c] text-white rounded-lg px-3 py-3 text-sm font-semibold shadow hover:bg-[#163f7b]">
              Travel Tips
            </Link>
          </div>

        </section>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-xs text-gray-700">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/about" className="underline hover:text-primary">About</Link>
          <Link to="/contact" className="underline hover:text-primary">Contact</Link>
          <Link to="/terms" className="underline hover:text-primary">Terms</Link>
          <Link to="/privacy" className="underline hover:text-primary">Privacy</Link>
        </div>
        <div className="text-center mt-4">© {new Date().getFullYear()} Indian Tickets. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
