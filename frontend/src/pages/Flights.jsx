import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../services/api';
import dayjs from 'dayjs';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [operatorType, setOperatorType] = useState('');
  const [order, setOrder] = useState('asc');
  const [date, setDate] = useState(() => searchParams.get('date') || dayjs().format('YYYY-MM-DD'));
  const [classFilter, setClassFilter] = useState('');
  const [amenities, setAmenities] = useState({ ac: false, wifi: false, food: false });
  const [sortBy, setSortBy] = useState('fare');

  useEffect(() => {
    // Update date from URL if present
    const urlDate = searchParams.get('date');
    if (urlDate) setDate(urlDate);
    loadFlights();
  }, [searchParams]);

  const loadFlights = () => {
    const sourceParam = searchParams.get('source') || '';
    const destParam = searchParams.get('destination') || '';
    setSource(sourceParam);
    setDestination(destParam);
    API.get(`/flights?source=${sourceParam}&destination=${destParam}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&class=${classFilter}`)
      .then(res => setFlights(res.data))
      .catch(console.error);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/flights?source=${source}&destination=${destination}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&class=${classFilter}`;
    // Add amenities filter
    const amenityParams = Object.entries(amenities)
      .filter(([k, v]) => v)
      .map(([k]) => `amenities[]=${k}`)
      .join('&');
    if (amenityParams) query += `&${amenityParams}`;
    API.get(query)
      .then(res => setFlights(res.data))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 bg-pattern-wave">
      {/* Enhanced Header with Background Image */}
      <div className="bg-hero bg-hero-flights bg-hero-fixed py-14 mb-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="img-flight w-20 h-20 rounded-full shadow-lg animate-float"></div>
          </div>
          <h2 className="text-4xl font-bold text-center text-white mb-2 animate-slide-down text-shadow-lg">✈️ Flight Services</h2>
          <p className="text-center text-white/90 text-lg animate-slide-up">Fly to your destination with the best airlines</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
      
      {/* Search Filter */}
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Search & Filter Flights</h3>
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
            value={classFilter}
            onChange={e => setClassFilter(e.target.value)}
            className="border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            <option value="">All Classes</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
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
                <input type="checkbox" checked={amenities.food} onChange={e => setAmenities(a => ({...a, food: e.target.checked}))} /> Food
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

      {/* Indian Aviation Information Section */}
      {flights.length === 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-purple animate-bounce-in">
            <div className="text-center">
              <div className="text-4xl mb-2">✈️</div>
              <div className="text-3xl font-bold text-purple-600">200+</div>
              <p className="text-sm text-gray-700 font-semibold">Daily Flights</p>
              <p className="text-xs text-gray-600 mt-1">Domestic & International</p>
            </div>
          </div>
          <div className="card-blue animate-bounce-in" style={{animationDelay: '0.1s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🏢</div>
              <div className="text-3xl font-bold text-blue-600">125</div>
              <p className="text-sm text-gray-700 font-semibold">Airports</p>
              <p className="text-xs text-gray-600 mt-1">Across India</p>
            </div>
          </div>
          <div className="card-orange animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-3xl font-bold text-orange-600">900 km/h</div>
              <p className="text-sm text-gray-700 font-semibold">Cruise Speed</p>
              <p className="text-xs text-gray-600 mt-1">Boeing & Airbus aircraft</p>
            </div>
          </div>
          <div className="card-green animate-bounce-in" style={{animationDelay: '0.3s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="text-3xl font-bold text-green-600">45 min</div>
              <p className="text-sm text-gray-700 font-semibold">Fastest Route</p>
              <p className="text-xs text-gray-600 mt-1">Delhi to Jaipur</p>
            </div>
          </div>
        </div>
      )}

      {/* Flight Classes Information */}
      {flights.length === 0 && (
        <div className="mb-6 card-glass">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">🎫</span> Flight Classes & Cabin Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👑</span>
                <h4 className="font-bold text-purple-700">First Class</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Private suites with lie-flat beds</li>
                <li>✓ Personal entertainment screens (23")</li>
                <li>✓ Gourmet multi-course meals</li>
                <li>✓ Premium lounge access</li>
                <li>✓ Priority boarding & 50kg baggage</li>
                <li>✓ ₹40,000-₹1,50,000+ (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💼</span>
                <h4 className="font-bold text-blue-700">Business Class</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Lie-flat seats (180° recline)</li>
                <li>✓ Extra legroom (38-40 inches)</li>
                <li>✓ Premium dining & bar service</li>
                <li>✓ Business lounge access</li>
                <li>✓ Priority services & 40kg baggage</li>
                <li>✓ ₹15,000-₹60,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <h4 className="font-bold text-green-700">Premium Economy</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Wide seats with extra recline</li>
                <li>✓ Increased legroom (35-38 inches)</li>
                <li>✓ Enhanced meal options</li>
                <li>✓ Priority check-in & boarding</li>
                <li>✓ Extra baggage allowance (30kg)</li>
                <li>✓ ₹8,000-₹25,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-l-4 border-orange-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💺</span>
                <h4 className="font-bold text-orange-700">Economy Class</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Standard seats (17-18 inches wide)</li>
                <li>✓ Legroom (30-32 inches)</li>
                <li>✓ Complimentary meals & drinks</li>
                <li>✓ In-flight entertainment</li>
                <li>✓ 15kg checked + 7kg cabin baggage</li>
                <li>✓ ₹3,000-₹15,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <h4 className="font-bold text-red-700">Saver/Basic Economy</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Budget-friendly option</li>
                <li>✓ Same seat comfort as Economy</li>
                <li>✓ No seat selection (auto-assign)</li>
                <li>✓ No changes/cancellations allowed</li>
                <li>✓ 15kg checked baggage only</li>
                <li>✓ ₹2,000-₹8,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⭐</span>
                <h4 className="font-bold text-yellow-700">Flex Economy</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Free seat selection</li>
                <li>✓ Free date changes</li>
                <li>✓ Refundable with minimal charges</li>
                <li>✓ Priority boarding available</li>
                <li>✓ 20kg checked + 7kg cabin baggage</li>
                <li>✓ ₹4,000-₹18,000 (typical fare)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Major Airlines Information */}
      {flights.length === 0 && (
        <div className="mb-6 card-gradient">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">🛫</span> Major Airlines Operating in India
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🔴</div>
              <h4 className="font-bold text-red-700 mb-2">Full-Service Carriers</h4>
              <p className="text-xs text-gray-700 mb-2">Premium airlines with all amenities</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Air India:</strong> National carrier, 102 destinations</li>
                <li>• <strong>Vistara:</strong> Premium service, joint venture with SIA</li>
                <li>• <strong>Fleet:</strong> Boeing 787, A320neo, A350</li>
                <li>• <strong>Services:</strong> Meals, entertainment, lounges</li>
                <li>• <strong>Routes:</strong> Domestic + International</li>
                <li>• <strong>SkyTrax:</strong> 4-star rated airlines</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🟠</div>
              <h4 className="font-bold text-orange-700 mb-2">Low-Cost Carriers</h4>
              <p className="text-xs text-gray-700 mb-2">Budget-friendly options</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>IndiGo:</strong> Largest airline, 280+ aircraft</li>
                <li>• <strong>SpiceJet:</strong> Affordable fares, 100+ destinations</li>
                <li>• <strong>GoAir/Go First:</strong> No-frills service</li>
                <li>• <strong>Fleet:</strong> Mostly A320neo family</li>
                <li>• <strong>Services:</strong> Pay-per-use meals & baggage</li>
                <li>• <strong>Focus:</strong> Point-to-point efficiency</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🔵</div>
              <h4 className="font-bold text-blue-700 mb-2">International Airlines</h4>
              <p className="text-xs text-gray-700 mb-2">Global carriers to/from India</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Emirates:</strong> Dubai hub, A380 services</li>
                <li>• <strong>Singapore Airlines:</strong> 5-star service</li>
                <li>• <strong>Lufthansa:</strong> European connectivity</li>
                <li>• <strong>Qatar Airways:</strong> Doha hub, wide network</li>
                <li>• <strong>British Airways:</strong> London connections</li>
                <li>• <strong>Thai Airways:</strong> Bangkok hub</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Flight Booking Tips */}
      {flights.length === 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-blue">
            <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Smart Booking Tips
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Book in Advance:</strong> 45-60 days ahead for domestic, 90+ for international flights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Tuesday-Thursday:</strong> Best days to find lower fares</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Red-Eye Flights:</strong> Overnight flights are 20-30% cheaper</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Alternate Airports:</strong> Check nearby airports for better deals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Incognito Mode:</strong> Clear cookies to avoid dynamic pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Fare Alerts:</strong> Set price alerts for your route</span>
              </li>
            </ul>
          </div>
          <div className="card-purple">
            <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">📋</span> Pre-Flight Checklist
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Web Check-in:</strong> Do it 48 hours before departure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Arrive Early:</strong> 2 hours (domestic), 3 hours (international)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Valid ID:</strong> Aadhaar, PAN, Passport, Driving License</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Baggage Limits:</strong> 7kg cabin + 15kg checked (Economy)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Prohibited Items:</strong> No power banks in checked luggage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Travel Insurance:</strong> Consider for international trips</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="mb-4 text-gray-600 font-semibold">
        {flights.length > 0 ? `✅ Found ${flights.length} flight(s) for your journey` : '🔍 Search for flights to see availability'}
      </p>

      {/* Smart Journey Suggestions */}
      {flights.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Cheapest */}
          {(() => {
            const cheapest = [...flights].sort((a, b) => a.fare - b.fare)[0];
            return cheapest ? (
              <div className="card border-2 border-green-400">
                <div className="font-bold text-green-700 mb-2 text-lg">💸 Cheapest</div>
                <div className="text-xl font-bold text-secondary">{cheapest.airline}</div>
                <div className="text-gray-600">{cheapest.source} → {cheapest.destination}</div>
                <div className="text-primary font-bold text-2xl">₹{cheapest.fare}</div>
                <Link to={`/booking?type=flight&id=${cheapest._id}`} className="mt-3 block bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-green-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Fastest */}
          {(() => {
            const fastest = [...flights].sort((a, b) => {
              const aDur = (new Date(`1970-01-01T${a.arrivalTime}`) - new Date(`1970-01-01T${a.departureTime}`));
              const bDur = (new Date(`1970-01-01T${b.arrivalTime}`) - new Date(`1970-01-01T${b.departureTime}`));
              return aDur - bDur;
            })[0];
            return fastest ? (
              <div className="card border-2 border-blue-400">
                <div className="font-bold text-blue-700 mb-2 text-lg">⚡ Fastest</div>
                <div className="text-xl font-bold text-secondary">{fastest.airline}</div>
                <div className="text-gray-600">{fastest.source} → {fastest.destination}</div>
                <div className="text-primary font-bold text-2xl">{fastest.departureTime} → {fastest.arrivalTime}</div>
                <Link to={`/booking?type=flight&id=${fastest._id}`} className="mt-3 block bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-blue-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Most Comfortable (most amenities) */}
          {(() => {
            const comfortScore = t => (t.amenities?.ac ? 1 : 0) + (t.amenities?.wifi ? 1 : 0) + (t.amenities?.food ? 1 : 0);
            const comfy = [...flights].sort((a, b) => comfortScore(b) - comfortScore(a))[0];
            return comfy ? (
              <div className="card border-2 border-purple-400">
                <div className="font-bold text-purple-700 mb-2 text-lg">🛏️ Most Comfortable</div>
                <div className="text-xl font-bold text-secondary">{comfy.airline}</div>
                <div className="text-gray-600">{comfy.source} → {comfy.destination}</div>
                <div className="text-primary font-bold text-2xl">Amenities: {Object.entries(comfy.amenities || {}).filter(([k, v]) => v).map(([k]) => k).join(', ') || 'None'}</div>
                <Link to={`/booking?type=flight&id=${comfy._id}`} className="mt-3 block bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-purple-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
        </div>
      )}

      <div className="grid gap-4">
        {flights.length === 0 ? (
          <div className="animate-fade-in">
            <div className="card-glass text-center py-12 mb-6">
              <div className="text-6xl mb-4">✈️</div>
              <p className="text-2xl font-bold text-secondary mb-2">No Flights Available</p>
              <p className="text-yellow-700 mb-4">Try searching with different source and destination, or ask admin to add flights.</p>
              <div className="flex gap-3 justify-center flex-wrap mt-6">
                <Link to="/" className="btn-primary">
                  ← Back to Home
                </Link>
                <Link to="/trains" className="btn-secondary">
                  View Trains
                </Link>
                <Link to="/admin-login" className="btn-outline-primary">
                  Admin: Add Flights
                </Link>
              </div>
            </div>

            {/* How to Book Flights */}
            <div className="card-gradient animate-slide-up delay-100">
              <h3 className="text-lg font-bold gradient-text mb-3">📋 How to Book Flight Tickets:</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">1</span>
                  <div>
                    <strong>Search for Flights:</strong> Enter your departure city, arrival city, and travel date in the search form above.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">2</span>
                  <div>
                    <strong>Browse Available Flights:</strong> View all flights with departure times, arrival times, fares, and seat availability.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">3</span>
                  <div>
                    <strong>Compare Airlines:</strong> Choose from Cheapest, Fastest options and compare different airlines.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">4</span>
                  <div>
                    <strong>Select Class:</strong> Choose between Economy, Business, or First Class based on your budget.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">5</span>
                  <div>
                    <strong>Add Baggage & Meals:</strong> Customize your booking with additional baggage and meal preferences.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">6</span>
                  <div>
                    <strong>Enter Passenger Details:</strong> Fill in all required information including passport details for international flights.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">7</span>
                  <div>
                    <strong>Make Payment:</strong> Complete secure payment and receive instant confirmation.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">8</span>
                  <div>
                    <strong>Web Check-in:</strong> Check-in online 48 hours before departure and select your seats.
                  </div>
                </li>
              </ol>
            </div>

            {/* Flight Information */}
            <div className="card-glass animate-slide-up delay-200">
              <h3 className="text-lg font-bold text-secondary mb-3">✨ Available Flight Information:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="feature-card border-l-4 border-blue-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">✈️</span> Flight Types:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Domestic Flights (Within India)</li>
                    <li>• International Flights (Worldwide)</li>
                    <li>• Direct Flights (Non-stop)</li>
                    <li>• Connecting Flights (1-2 stops)</li>
                    <li>• Budget Airlines (Low-cost)</li>
                    <li>• Full-service Airlines (Premium)</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎫</span> Travel Classes:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Economy Class (Budget-friendly)</li>
                    <li>• Premium Economy (Extra legroom)</li>
                    <li>• Business Class (Luxury travel)</li>
                    <li>• First Class (Ultimate comfort)</li>
                    <li>• Flexible tickets available</li>
                    <li>• Refundable & Non-refundable options</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-purple-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> In-flight Services:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• In-flight entertainment</li>
                    <li>• WiFi connectivity (select flights)</li>
                    <li>• Complimentary meals & beverages</li>
                    <li>• Duty-free shopping</li>
                    <li>• Power outlets & USB ports</li>
                    <li>• Priority boarding options</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-orange-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">✅</span> Booking Benefits:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Instant e-ticket generation</li>
                    <li>• Web check-in facility</li>
                    <li>• Seat selection options</li>
                    <li>• Flight status tracking</li>
                    <li>• Easy cancellation & rescheduling</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="card-gradient animate-slide-up delay-300">
              <h3 className="text-lg font-bold text-secondary mb-3">💡 Air Travel Tips:</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Reach airport 2-3 hours before departure</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Complete web check-in 48 hours before</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Check baggage allowance limits</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Carry valid ID/passport for verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Download airline app for updates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Book early for better prices & seats</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center animate-fade-in delay-400">
              <Link to="/" className="btn-primary hover-lift">
                ← Back to Home
              </Link>
              <Link to="/buses" className="btn-secondary hover-lift">
                View Buses
              </Link>
              <Link to="/admin-login" className="btn-gradient hover-lift">
                Admin: Add Flights
              </Link>
            </div>
          </div>
        ) : (
          flights.map(flight => (
            <div key={flight._id} className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl transition border-2 border-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-4">
                <Link to={`/flights/${flight._id}`} className="w-full md:w-40 h-40 md:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 block group">
                  <img
                    src={flight.imageUrl || '/images/flight-placeholder.svg'}
                    alt={flight.airline}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    onError={(e) => (e.currentTarget.src = '/images/flight-placeholder.svg')}
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Link to={`/flights/${flight._id}`} className="hover:underline text-2xl font-bold text-secondary">
                      {flight.airline}
                    </Link>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {flight.flightNumber}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {flight.class}
                    </span>
                    <span className={`${flight.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>
                      {flight.operatorType || 'private'}
                    </span>
                    {flight.operatorName && (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {flight.operatorName}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {flight.source} → {flight.destination}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-semibold text-green-700">{flight.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-semibold text-red-700">{flight.arrivalTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-bold text-lg">
                        <span className="text-green-600">{flight.availableSeats}</span>
                        <span className="text-gray-400">/{flight.totalSeats}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fare per Seat</p>
                      <p className="text-2xl font-bold text-primary">₹{flight.fare}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-center justify-center min-w-[120px]">
                  {flight.availableSeats > 0 ? (
                    <Link
                      to={`/booking?type=flight&id=${flight._id}`}
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
