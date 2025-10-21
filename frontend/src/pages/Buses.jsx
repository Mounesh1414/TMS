import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../services/api';
import dayjs from 'dayjs';

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [operatorType, setOperatorType] = useState('');
  const [order, setOrder] = useState('asc');
  const [date, setDate] = useState(() => searchParams.get('date') || dayjs().format('YYYY-MM-DD'));
  const [typeFilter, setTypeFilter] = useState('');
  const [amenities, setAmenities] = useState({ ac: false, wifi: false, sleeper: false });
  const [sortBy, setSortBy] = useState('fare');

  useEffect(() => {
    // Update date from URL if present
    const urlDate = searchParams.get('date');
    if (urlDate) setDate(urlDate);
    loadBuses();
  }, [searchParams]);

  const loadBuses = () => {
    const sourceParam = searchParams.get('source') || '';
    const destParam = searchParams.get('destination') || '';
    setSource(sourceParam);
    setDestination(destParam);
    API.get(`/buses?source=${sourceParam}&destination=${destParam}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&type=${typeFilter}`)
      .then(res => setBuses(res.data))
      .catch(console.error);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/buses?source=${source}&destination=${destination}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&type=${typeFilter}`;
    // Add amenities filter
    const amenityParams = Object.entries(amenities)
      .filter(([k, v]) => v)
      .map(([k]) => `amenities[]=${k}`)
      .join('&');
    if (amenityParams) query += `&${amenityParams}`;
    API.get(query)
      .then(res => setBuses(res.data))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 bg-pattern-diagonal">
      {/* Enhanced Header with Background Image */}
      <div className="bg-hero bg-hero-buses bg-hero-fixed py-14 mb-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="img-bus w-20 h-20 rounded-full shadow-lg animate-float"></div>
          </div>
          <h2 className="text-4xl font-bold text-center text-white mb-2 animate-slide-down text-shadow-lg">🚌 Bus Services</h2>
          <p className="text-center text-white/90 text-lg animate-slide-up">Comfortable and affordable bus travel across India</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
      
      {/* Search Filter */}
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Search & Filter Buses</h3>
        <form onSubmit={handleSearch} className="grid md:grid-cols-6 gap-4 items-end">
          <input
            type="text"
            placeholder="From (Source)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          />
          <input
            type="text"
            placeholder="To (Destination)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
            min={dayjs().format('YYYY-MM-DD')}
          />
          <select
            value={operatorType}
            onChange={(e) => setOperatorType(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            <option value="">All Operators</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            <option value="">All Types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Seater">Seater</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            <option value="fare">Price</option>
            <option value="departureTime">Departure Time</option>
            <option value="arrivalTime">Arrival Time</option>
            <option value="duration">Duration</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-sm">Amenities:</label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={amenities.ac} onChange={e => setAmenities(a => ({...a, ac: e.target.checked}))} /> AC
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={amenities.wifi} onChange={e => setAmenities(a => ({...a, wifi: e.target.checked}))} /> WiFi
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={amenities.sleeper} onChange={e => setAmenities(a => ({...a, sleeper: e.target.checked}))} /> Sleeper
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition md:col-span-1"
          >
            Search
          </button>
        </form>
      </div>

      {/* Indian Bus Services Information Section */}
      {buses.length === 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-green animate-bounce-in">
            <div className="text-center">
              <div className="text-4xl mb-2">🚌</div>
              <div className="text-3xl font-bold text-green-600">50,000+</div>
              <p className="text-sm text-gray-700 font-semibold">Buses Daily</p>
              <p className="text-xs text-gray-600 mt-1">Government & Private operators</p>
            </div>
          </div>
          <div className="card-blue animate-bounce-in" style={{animationDelay: '0.1s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-blue-600">2,500+</div>
              <p className="text-sm text-gray-700 font-semibold">Routes Available</p>
              <p className="text-xs text-gray-600 mt-1">Covering all major cities</p>
            </div>
          </div>
          <div className="card-orange animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">💺</div>
              <div className="text-3xl font-bold text-orange-600">30-50</div>
              <p className="text-sm text-gray-700 font-semibold">Seats Per Bus</p>
              <p className="text-xs text-gray-600 mt-1">Sleeper, Semi-Sleeper, Seater</p>
            </div>
          </div>
          <div className="card-purple animate-bounce-in" style={{animationDelay: '0.3s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-purple-600">4.2/5</div>
              <p className="text-sm text-gray-700 font-semibold">Average Rating</p>
              <p className="text-xs text-gray-600 mt-1">Based on user reviews</p>
            </div>
          </div>
        </div>
      )}

      {/* Bus Types Information */}
      {buses.length === 0 && (
        <div className="mb-6 card-glass">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">🚍</span> Bus Types & Seating Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">❄️</span>
                <h4 className="font-bold text-blue-700">Volvo AC Sleeper</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Premium Volvo chassis</li>
                <li>✓ 2+1 sleeper berths (pushback)</li>
                <li>✓ Individual AC vents & lights</li>
                <li>✓ GPS tracking & CCTV</li>
                <li>✓ Onboard charging & WiFi</li>
                <li>✓ ₹1,200-₹2,500 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛏️</span>
                <h4 className="font-bold text-green-700">AC Sleeper</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 2+1 or 2+2 sleeper configuration</li>
                <li>✓ Blankets & pillows provided</li>
                <li>✓ Individual reading lights</li>
                <li>✓ Curtains for privacy</li>
                <li>✓ USB charging points</li>
                <li>✓ ₹800-₹1,500 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🪑</span>
                <h4 className="font-bold text-purple-700">AC Semi-Sleeper</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 2+2 pushback seats (140° recline)</li>
                <li>✓ Extra legroom & cushioning</li>
                <li>✓ AC comfort with curtains</li>
                <li>✓ Reading lights & charging</li>
                <li>✓ Ideal for 6-10 hour journeys</li>
                <li>✓ ₹600-₹1,200 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-l-4 border-orange-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💺</span>
                <h4 className="font-bold text-orange-700">AC Seater</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 2+2 pushback seats</li>
                <li>✓ AC comfort for day travel</li>
                <li>✓ Large windows for viewing</li>
                <li>✓ Overhead storage & charging</li>
                <li>✓ Best for 4-6 hour journeys</li>
                <li>✓ ₹400-₹900 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌬️</span>
                <h4 className="font-bold text-red-700">Non-AC Sleeper</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Budget-friendly option</li>
                <li>✓ 2+1 or 2+2 sleeper berths</li>
                <li>✓ Open windows for ventilation</li>
                <li>✓ Basic amenities provided</li>
                <li>✓ Good for short overnight trips</li>
                <li>✓ ₹300-₹700 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚐</span>
                <h4 className="font-bold text-yellow-700">Luxury Coach</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Premium Mercedes/Scania buses</li>
                <li>✓ Extra wide seats with massage</li>
                <li>✓ Onboard entertainment system</li>
                <li>✓ Complimentary snacks & water</li>
                <li>✓ Personal attendant service</li>
                <li>✓ ₹2,000-₹4,000 (typical fare)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bus Operators Information */}
      {buses.length === 0 && (
        <div className="mb-6 card-gradient">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">🏢</span> Popular Bus Operators in India
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🟢</div>
              <h4 className="font-bold text-green-700 mb-2">Government SRTC</h4>
              <p className="text-xs text-gray-700 mb-2">State Road Transport Corporations across India</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• MSRTC (Maharashtra)</li>
                <li>• KSRTC (Karnataka, Kerala)</li>
                <li>• APSRTC (Andhra Pradesh)</li>
                <li>• RSRTC (Rajasthan)</li>
                <li>• UPSRTC (Uttar Pradesh)</li>
                <li>• Reliable & affordable services</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🔴</div>
              <h4 className="font-bold text-red-700 mb-2">Private Operators</h4>
              <p className="text-xs text-gray-700 mb-2">Premium private bus services</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• RedBus (Aggregator Platform)</li>
                <li>• VRL Travels (South India)</li>
                <li>• Orange Travels (Pan India)</li>
                <li>• SRS Travels (North India)</li>
                <li>• Parveen Travels (West India)</li>
                <li>• Modern fleet with amenities</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="font-bold text-purple-700 mb-2">Premium Services</h4>
              <p className="text-xs text-gray-700 mb-2">Luxury bus experiences</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Volvo Multi-Axle buses</li>
                <li>• Mercedes Benz coaches</li>
                <li>• Scania Metrolink HD</li>
                <li>• Individual entertainment screens</li>
                <li>• Gourmet meal options</li>
                <li>• Business-class comfort</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bus Safety & Amenities */}
      {buses.length === 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-blue">
            <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> Safety Features
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>GPS Tracking:</strong> Real-time bus location monitoring for safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>CCTV Cameras:</strong> 4-6 cameras for passenger security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Emergency Exits:</strong> Clearly marked with safety hammers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Speed Governors:</strong> Limits at 80-90 km/h for safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Trained Drivers:</strong> Licensed with minimum 5 years experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Insurance:</strong> Passenger insurance up to ₹10 lakhs included</span>
              </li>
            </ul>
          </div>
          <div className="card-green">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span> Onboard Amenities
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Charging Points:</strong> USB & 2-pin sockets at every seat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>WiFi:</strong> Available in premium Volvo & luxury buses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Entertainment:</strong> Movies, music, LED screens (select buses)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Clean Washrooms:</strong> Bio-toilets in long-distance buses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Water Bottles:</strong> Complimentary in AC buses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Blankets & Pillows:</strong> Provided in sleeper buses</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="mb-4 text-gray-600 font-semibold">
        {buses.length > 0 ? `✅ Found ${buses.length} bus(es) for your journey` : '🔍 Search for buses to see availability'}
      </p>

      {/* Smart Journey Suggestions */}
      {buses.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Cheapest */}
          {(() => {
            const cheapest = [...buses].sort((a, b) => a.fare - b.fare)[0];
            return cheapest ? (
              <div className="card border-2 border-green-400">
                <div className="font-bold text-green-700 mb-2 text-lg">💸 Cheapest</div>
                <div className="text-xl font-bold text-secondary">{cheapest.name}</div>
                <div className="text-gray-600">{cheapest.source} → {cheapest.destination}</div>
                <div className="text-primary font-bold text-2xl">₹{cheapest.fare}</div>
                <Link to={`/booking?type=bus&id=${cheapest._id}`} className="mt-3 block bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-green-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Fastest */}
          {(() => {
            const fastest = [...buses].sort((a, b) => {
              const aDur = (new Date(`1970-01-01T${a.arrivalTime}`) - new Date(`1970-01-01T${a.departureTime}`));
              const bDur = (new Date(`1970-01-01T${b.arrivalTime}`) - new Date(`1970-01-01T${b.departureTime}`));
              return aDur - bDur;
            })[0];
            return fastest ? (
              <div className="card border-2 border-blue-400">
                <div className="font-bold text-blue-700 mb-2 text-lg">⚡ Fastest</div>
                <div className="text-xl font-bold text-secondary">{fastest.name}</div>
                <div className="text-gray-600">{fastest.source} → {fastest.destination}</div>
                <div className="text-primary font-bold text-2xl">{fastest.departureTime} → {fastest.arrivalTime}</div>
                <Link to={`/booking?type=bus&id=${fastest._id}`} className="mt-3 block bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-blue-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Most Comfortable (most amenities) */}
          {(() => {
            const comfortScore = t => (t.amenities?.ac ? 1 : 0) + (t.amenities?.wifi ? 1 : 0) + (t.amenities?.sleeper ? 1 : 0);
            const comfy = [...buses].sort((a, b) => comfortScore(b) - comfortScore(a))[0];
            return comfy ? (
              <div className="card border-2 border-purple-400">
                <div className="font-bold text-purple-700 mb-2 text-lg">🛏️ Most Comfortable</div>
                <div className="text-xl font-bold text-secondary">{comfy.name}</div>
                <div className="text-gray-600">{comfy.source} → {comfy.destination}</div>
                <div className="text-primary font-bold text-2xl">Amenities: {Object.entries(comfy.amenities || {}).filter(([k, v]) => v).map(([k]) => k).join(', ') || 'None'}</div>
                <Link to={`/booking?type=bus&id=${comfy._id}`} className="mt-3 block bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-purple-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
        </div>
      )}

      <div className="grid gap-4">
        {buses.length === 0 ? (
          <div className="animate-fade-in">
            <div className="card-glass text-center py-12 mb-6">
              <div className="text-6xl mb-4">🚌</div>
              <p className="text-2xl font-bold text-secondary mb-2">No Buses Available</p>
              <p className="text-yellow-700 mb-4">Try searching with different source and destination, or ask admin to add buses.</p>
              <div className="flex gap-3 justify-center flex-wrap mt-6">
                <Link to="/" className="btn-primary">
                  ← Back to Home
                </Link>
                <Link to="/trains" className="btn-secondary">
                  View Trains
                </Link>
                <Link to="/admin-login" className="btn-outline-primary">
                  Admin: Add Buses
                </Link>
              </div>
            </div>

            {/* How to Book Buses */}
            <div className="card-gradient animate-slide-up delay-100">
              <h3 className="text-lg font-bold gradient-text mb-3">📋 How to Book Bus Tickets:</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">1</span>
                  <div>
                    <strong>Search for Buses:</strong> Enter your source city, destination city, and travel date in the search form above.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">2</span>
                  <div>
                    <strong>Browse Available Options:</strong> View all available buses with their departure times, arrival times, fares, and seat availability.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">3</span>
                  <div>
                    <strong>Compare Options:</strong> Choose from Cheapest, Fastest, or Most Comfortable options based on your preference.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">4</span>
                  <div>
                    <strong>Select Bus Type:</strong> Choose between AC/Non-AC, Sleeper/Seater based on your comfort needs.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">5</span>
                  <div>
                    <strong>Pick Your Seat:</strong> View the seat layout and choose your preferred seats.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">6</span>
                  <div>
                    <strong>Enter Passenger Details:</strong> Fill in passenger information for all travelers.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">7</span>
                  <div>
                    <strong>Make Payment:</strong> Complete secure payment using UPI, Card, Net Banking, or Wallet.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">8</span>
                  <div>
                    <strong>Get Confirmation:</strong> Receive your e-ticket via email and SMS instantly.
                  </div>
                </li>
              </ol>
            </div>

            {/* Bus Information */}
            <div className="card-glass animate-slide-up delay-200">
              <h3 className="text-lg font-bold text-secondary mb-3">✨ Available Bus Information:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="feature-card border-l-4 border-green-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🚌</span> Bus Types:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• AC Sleeper (Luxury overnight travel)</li>
                    <li>• AC Seater (Comfortable day travel)</li>
                    <li>• Non-AC Sleeper (Budget overnight)</li>
                    <li>• Non-AC Seater (Economy travel)</li>
                    <li>• Volvo AC (Premium buses)</li>
                    <li>• Multi-Axle (Long-distance comfort)</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-blue-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🪑</span> Seating Options:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Push-back seats (Reclining)</li>
                    <li>• Semi-sleeper seats</li>
                    <li>• Full sleeper berths</li>
                    <li>• Lower/Upper berth options</li>
                    <li>• Window/Aisle seat selection</li>
                    <li>• Ladies-only seats available</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-purple-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Amenities & Features:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Air conditioning</li>
                    <li>• WiFi connectivity</li>
                    <li>• Charging points</li>
                    <li>• Reading lights</li>
                    <li>• Water bottles</li>
                    <li>• Emergency exits</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-orange-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">✅</span> Booking Benefits:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Instant ticket confirmation</li>
                    <li>• Easy cancellation policy</li>
                    <li>• Live bus tracking</li>
                    <li>• 24/7 customer support</li>
                    <li>• SMS/Email notifications</li>
                    <li>• Boarding point selection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="card-gradient animate-slide-up delay-300">
              <h3 className="text-lg font-bold text-secondary mb-3">💡 Travel Tips for Bus Journeys:</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Arrive at boarding point 15-20 minutes early</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Carry a printed or digital copy of your ticket</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Keep your ID proof handy for verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Check operator reviews and ratings</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Book window seats for better views</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Carry snacks and water for long journeys</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center animate-fade-in delay-400">
              <Link to="/" className="btn-primary hover-lift">
                ← Back to Home
              </Link>
              <Link to="/trains" className="btn-secondary hover-lift">
                View Trains
              </Link>
              <Link to="/admin-login" className="btn-gradient hover-lift">
                Admin: Add Buses
              </Link>
            </div>
          </div>
        ) : (
          buses.map(bus => (
            <div key={bus._id} className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl transition border-2 border-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-4">
                <Link to={`/buses/${bus._id}`} className="w-full md:w-40 h-40 md:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 block group">
                  <img
                    src={bus.imageUrl || '/images/bus-placeholder.svg'}
                    alt={bus.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    onError={(e) => (e.currentTarget.src = '/images/bus-placeholder.svg')}
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Link to={`/buses/${bus._id}`} className="hover:underline text-2xl font-bold text-secondary">
                      {bus.name}
                    </Link>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {bus.busNumber}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {bus.type}
                    </span>
                    <span className={`${bus.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>
                      {bus.operatorType || 'government'}
                    </span>
                    {bus.operatorName && (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {bus.operatorName}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {bus.source} → {bus.destination}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-semibold text-green-700">{bus.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-semibold text-red-700">{bus.arrivalTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-bold text-lg">
                        <span className="text-green-600">{bus.availableSeats}</span>
                        <span className="text-gray-400">/{bus.totalSeats}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fare per Seat</p>
                      <p className="text-2xl font-bold text-primary">₹{bus.fare}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-center justify-center min-w-[120px]">
                  {bus.availableSeats > 0 ? (
                    <Link
                      to={`/booking?type=bus&id=${bus._id}`}
                      className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-accent transition font-bold text-lg shadow-lg w-full text-center"
                      style={{ minWidth: 120 }}
                    >
                      Book Now
                    </Link>
                  ) : (
                    <button disabled className="px-8 py-4 bg-gray-400 text-white rounded-xl cursor-not-allowed font-bold text-lg w-full">
                      Fully Booked
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
