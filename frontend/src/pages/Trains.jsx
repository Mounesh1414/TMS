import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../services/api';
import dayjs from 'dayjs';

export default function Trains() {
  const [trains, setTrains] = useState([]);
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [operatorType, setOperatorType] = useState('');
  const [sortBy, setSortBy] = useState('fare');
  const [order, setOrder] = useState('asc');
  const [date, setDate] = useState(() => searchParams.get('date') || dayjs().format('YYYY-MM-DD'));
  const [classFilter, setClassFilter] = useState('');
  const [amenities, setAmenities] = useState({ ac: false, wifi: false, pantry: false });

  useEffect(() => {
    // Update date from URL if present
    const urlDate = searchParams.get('date');
    if (urlDate) setDate(urlDate);
    loadTrains();
  }, [searchParams]);

  const loadTrains = () => {
    const sourceParam = searchParams.get('source') || '';
    const destParam = searchParams.get('destination') || '';
    setSource(sourceParam);
    setDestination(destParam);
    API.get(`/trains?source=${sourceParam}&destination=${destParam}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&class=${classFilter}`)
      .then(res => setTrains(res.data))
      .catch(console.error);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/trains?source=${source}&destination=${destination}&operatorType=${operatorType}&sortBy=${sortBy}&order=${order}&date=${date}&class=${classFilter}`;
    // Add amenities filter
    const amenityParams = Object.entries(amenities)
      .filter(([k, v]) => v)
      .map(([k]) => `amenities[]=${k}`)
      .join('&');
    if (amenityParams) query += `&${amenityParams}`;
    API.get(query)
      .then(res => setTrains(res.data))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 bg-pattern-dots">
      {/* Enhanced Header with Background Image */}
      <div className="bg-hero bg-hero-trains bg-hero-fixed py-14 mb-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="img-train w-20 h-20 rounded-full shadow-lg animate-float"></div>
          </div>
          <h2 className="text-4xl font-bold text-center text-white mb-2 animate-slide-down text-shadow-lg">🚂 Indian Railways</h2>
          <p className="text-center text-white/90 text-lg animate-slide-up">Find and book your perfect train journey across India</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Search Filter */}
        <div className="card-glass p-6 mb-6 animate-scale-in">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔍</span> Search & Filter Trains
          </h3>
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
            <option value="Sleeper">Sleeper</option>
            <option value="AC">AC</option>
            <option value="First Class">First Class</option>
            <option value="Second Class">Second Class</option>
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
                <input type="checkbox" checked={amenities.pantry} onChange={e => setAmenities(a => ({...a, pantry: e.target.checked}))} /> Pantry
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

      {/* Indian Railway Information Section */}
      {trains.length === 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-blue animate-bounce-in">
            <div className="text-center">
              <div className="text-4xl mb-2">🚂</div>
              <div className="text-3xl font-bold text-blue-600">12,000+</div>
              <p className="text-sm text-gray-700 font-semibold">Trains Daily</p>
              <p className="text-xs text-gray-600 mt-1">Covering 7,325 stations</p>
            </div>
          </div>
          <div className="card-green animate-bounce-in" style={{animationDelay: '0.1s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🎫</div>
              <div className="text-3xl font-bold text-green-600">23M+</div>
              <p className="text-sm text-gray-700 font-semibold">Daily Passengers</p>
              <p className="text-xs text-gray-600 mt-1">World's 4th largest network</p>
            </div>
          </div>
          <div className="card-orange animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-3xl font-bold text-orange-600">160 km/h</div>
              <p className="text-sm text-gray-700 font-semibold">Vande Bharat</p>
              <p className="text-xs text-gray-600 mt-1">Semi-high speed trains</p>
            </div>
          </div>
          <div className="card-purple animate-bounce-in" style={{animationDelay: '0.3s'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🌐</div>
              <div className="text-3xl font-bold text-purple-600">67,000+</div>
              <p className="text-sm text-gray-700 font-semibold">Route Kilometers</p>
              <p className="text-xs text-gray-600 mt-1">Electrified network</p>
            </div>
          </div>
        </div>
      )}

      {/* Train Classes Information */}
      {trains.length === 0 && (
        <div className="mb-6 card-glass">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Indian Railway Classes & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛏️</span>
                <h4 className="font-bold text-blue-700">AC 1st Class (1A)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 4-berth cabins with lockable doors</li>
                <li>✓ Premium bedding & pillows</li>
                <li>✓ Complimentary meals included</li>
                <li>✓ Charging points & reading lights</li>
                <li>✓ ₹2,500-₹5,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">❄️</span>
                <h4 className="font-bold text-green-700">AC 2-Tier (2A)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Open bay with curtains for privacy</li>
                <li>✓ 2 berths per bay (upper & lower)</li>
                <li>✓ Bedding provided, AC comfort</li>
                <li>✓ USB charging & individual lights</li>
                <li>✓ ₹1,500-₹3,000 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌡️</span>
                <h4 className="font-bold text-purple-700">AC 3-Tier (3A)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 3 berths per bay (lower, middle, upper)</li>
                <li>✓ Most popular AC class</li>
                <li>✓ Bedding, AC, charging points</li>
                <li>✓ Side berths available</li>
                <li>✓ ₹800-₹1,800 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-l-4 border-orange-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🪟</span>
                <h4 className="font-bold text-orange-700">Sleeper Class (SL)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Non-AC with fans & open windows</li>
                <li>✓ 3 berths per bay + side berths</li>
                <li>✓ Budget-friendly option</li>
                <li>✓ Charging points available</li>
                <li>✓ ₹300-₹800 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚪</span>
                <h4 className="font-bold text-red-700">AC Chair Car (CC)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Pushback seats like airplanes</li>
                <li>✓ Ideal for day journeys</li>
                <li>✓ AC comfort, large windows</li>
                <li>✓ Common in Shatabdi trains</li>
                <li>✓ ₹500-₹1,500 (typical fare)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎟️</span>
                <h4 className="font-bold text-yellow-700">Second Sitting (2S)</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Reserved seating, non-AC</li>
                <li>✓ Cushioned bench seats</li>
                <li>✓ Most economical option</li>
                <li>✓ Perfect for short journeys</li>
                <li>✓ ₹50-₹300 (typical fare)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Premium Trains Information */}
      {trains.length === 0 && (
        <div className="mb-6 card-gradient">
          <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <span className="text-2xl">⭐</span> Premium Train Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🚄</div>
              <h4 className="font-bold text-blue-700 mb-2">Vande Bharat Express</h4>
              <p className="text-xs text-gray-700 mb-2">India's fastest semi-high speed train with world-class amenities</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Speed: 130-160 km/h</li>
                <li>• Automatic doors & Bio-toilets</li>
                <li>• Onboard WiFi & entertainment</li>
                <li>• GPS-based passenger info</li>
                <li>• Routes: Delhi-Varanasi, Mumbai-Gandhinagar</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-orange-700 mb-2">Rajdhani Express</h4>
              <p className="text-xs text-gray-700 mb-2">Premium AC trains connecting state capitals to Delhi</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Speed: 110-140 km/h</li>
                <li>• All meals included in fare</li>
                <li>• Priority on tracks (less stops)</li>
                <li>• AC 1st, 2A, 3A classes only</li>
                <li>• Routes: 24+ major Rajdhani routes</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-xl shadow-lg hover-lift">
              <div className="text-3xl mb-2">🌟</div>
              <h4 className="font-bold text-green-700 mb-2">Shatabdi Express</h4>
              <p className="text-xs text-gray-700 mb-2">Premium day trains with Chair Car seating</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Speed: 110-150 km/h</li>
                <li>• Same-day return journeys</li>
                <li>• Complimentary breakfast & lunch</li>
                <li>• AC Chair Car & Executive class</li>
                <li>• Routes: Delhi-Chandigarh, Delhi-Lucknow</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="mb-4 text-gray-600 font-semibold">
        {trains.length > 0 ? `✅ Found ${trains.length} train(s) for your journey` : '🔍 Search for trains to see availability'}
      </p>

      {/* Smart Journey Suggestions */}
      {trains.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Cheapest */}
          {(() => {
            const cheapest = [...trains].sort((a, b) => a.fare - b.fare)[0];
            return cheapest ? (
              <div className="card border-2 border-green-400">
                <div className="font-bold text-green-700 mb-2 text-lg">💸 Cheapest</div>
                <div className="text-xl font-bold text-secondary">{cheapest.name}</div>
                <div className="text-gray-600">{cheapest.source} → {cheapest.destination}</div>
                <div className="text-primary font-bold text-2xl">₹{cheapest.fare}</div>
                <Link to={`/booking?type=train&id=${cheapest._id}`} className="mt-3 block bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-green-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Fastest */}
          {(() => {
            const fastest = [...trains].sort((a, b) => {
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
                <Link to={`/booking?type=train&id=${fastest._id}`} className="mt-3 block bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-blue-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
          {/* Most Comfortable (most amenities) */}
          {(() => {
            const comfortScore = t => (t.amenities?.ac ? 1 : 0) + (t.amenities?.wifi ? 1 : 0) + (t.amenities?.pantry ? 1 : 0);
            const comfy = [...trains].sort((a, b) => comfortScore(b) - comfortScore(a))[0];
            return comfy ? (
              <div className="card border-2 border-purple-400">
                <div className="font-bold text-purple-700 mb-2 text-lg">🛏️ Most Comfortable</div>
                <div className="text-xl font-bold text-secondary">{comfy.name}</div>
                <div className="text-gray-600">{comfy.source} → {comfy.destination}</div>
                <div className="text-primary font-bold text-2xl">Amenities: {Object.entries(comfy.amenities || {}).filter(([k, v]) => v).map(([k]) => k).join(', ') || 'None'}</div>
                <Link to={`/booking?type=train&id=${comfy._id}`} className="mt-3 block bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-center hover:bg-purple-700 transition">Book Now</Link>
              </div>
            ) : null;
          })()}
        </div>
      )}

      <div className="grid gap-4">
        {trains.length === 0 ? (
          <div className="animate-fade-in">
            <div className="card-glass text-center py-12 mb-6">
              <div className="text-6xl mb-4">🚂</div>
              <p className="text-2xl font-bold text-secondary mb-2">No Trains Available</p>
              <p className="text-yellow-700 mb-4">Try searching with different source and destination, or ask admin to add trains.</p>
              <div className="flex gap-3 justify-center flex-wrap mt-6">
                <Link to="/" className="btn-primary">
                  ← Back to Home
                </Link>
                <Link to="/pnr-status" className="btn-secondary">
                  Check PNR Status
                </Link>
                <Link to="/admin-login" className="btn-outline-primary">
                  Admin: Add Trains
                </Link>
              </div>
            </div>

            {/* How to Book - Enhanced with new styles */}
            <div className="card-gradient animate-slide-up delay-100">
              <h3 className="text-lg font-bold gradient-text mb-3">📋 How to Book Train Tickets:</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">1</span>
                  <div>
                    <strong>Search for Trains:</strong> Enter your source station, destination station, and travel date in the search form above.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">2</span>
                  <div>
                    <strong>Browse Available Options:</strong> View all available trains with their departure times, arrival times, fares, and seat availability.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">3</span>
                  <div>
                    <strong>Select Your Train:</strong> Choose from Cheapest, Fastest, or Most Comfortable options based on your preference.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">4</span>
                  <div>
                    <strong>Click "Book Now":</strong> Review train details including amenities (AC, WiFi, Pantry) and available classes.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">5</span>
                  <div>
                    <strong>Enter Passenger Details:</strong> Fill in passenger information (name, age, gender) for all travelers.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">6</span>
                  <div>
                    <strong>Make Payment:</strong> Choose your payment method (UPI, Card, Net Banking, Wallet) and complete secure payment.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">7</span>
                  <div>
                    <strong>Get Confirmation:</strong> Receive your e-ticket with PNR number via email and SMS instantly.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="badge-primary flex-shrink-0">8</span>
                  <div>
                    <strong>Track Your Booking:</strong> Check PNR status, view booking details, and manage your tickets in "My Bookings".
                  </div>
                </li>
              </ol>
            </div>

            {/* Train Information - Enhanced */}
            <div className="card-glass animate-slide-up delay-200">
              <h3 className="text-lg font-bold text-secondary mb-3">✨ Available Train Information:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="feature-card border-l-4 border-blue-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🚂</span> Train Types:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Rajdhani Express (Premium AC trains)</li>
                    <li>• Shatabdi Express (High-speed day trains)</li>
                    <li>• Duronto Express (Non-stop trains)</li>
                    <li>• Superfast Express (Fewer stops)</li>
                    <li>• Mail/Express (Regular trains)</li>
                    <li>• Passenger Trains (Local service)</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-green-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">💺</span> Available Classes:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• First AC (1A) - Most premium</li>
                    <li>• Two-tier AC (2A)</li>
                    <li>• Three-tier AC (3A)</li>
                    <li>• AC Chair Car (CC)</li>
                    <li>• Sleeper Class (SL)</li>
                    <li>• Second Sitting (2S)</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-purple-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Smart Features:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Real-time seat availability</li>
                    <li>• Smart journey suggestions</li>
                    <li>• Price comparison (Cheapest option)</li>
                    <li>• Time comparison (Fastest route)</li>
                    <li>• Comfort comparison (Amenities)</li>
                    <li>• Advanced filters & sorting</li>
                  </ul>
                </div>
                <div className="feature-card border-l-4 border-orange-500">
                  <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <span className="text-2xl">✅</span> Booking Benefits:
                  </h4>
                  <ul className="space-y-1 pl-4">
                    <li>• Instant e-ticket confirmation</li>
                    <li>• Secure payment gateway</li>
                    <li>• PNR status tracking</li>
                    <li>• Easy cancellation & refunds</li>
                    <li>• 24/7 customer support</li>
                    <li>• SMS & Email notifications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Tips - Enhanced */}
            <div className="card-gradient animate-slide-up delay-300">
              <h3 className="text-lg font-bold text-secondary mb-3">💡 Quick Tips:</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Book early for better availability and lower prices</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Use filters to find trains matching your preferences</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Check train schedules and timings before booking</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Review all passenger details before payment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Save your e-ticket and PNR number safely</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="badge-success">✓</span>
                  <span>Reach station 20-30 minutes before departure</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center animate-fade-in delay-400">
              <Link to="/" className="btn-primary hover-lift">
                ← Back to Home
              </Link>
              <Link to="/pnr-status" className="btn-secondary hover-lift">
                Check PNR Status
              </Link>
              <Link to="/admin-login" className="btn-gradient hover-lift">
                Admin: Add Trains
              </Link>
            </div>
          </div>
        ) : (
          trains.map(train => (
            <div key={train._id} className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl transition border-2 border-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-4">
                <Link to={`/trains/${train._id}`} className="w-full md:w-40 h-40 md:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 block group">
                  <img
                    src={train.imageUrl || '/images/train-placeholder.svg'}
                    alt={train.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    onError={(e) => (e.currentTarget.src = '/images/train-placeholder.svg')}
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Link to={`/trains/${train._id}`} className="hover:underline text-2xl font-bold text-secondary">
                      {train.name}
                    </Link>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {train.trainNumber}
                    </span>
                    <span className={`${train.operatorType==='government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}>
                      {train.operatorType || 'government'}
                    </span>
                    {train.operatorName && (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {train.operatorName}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {train.source} → {train.destination}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-semibold text-green-700">{train.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-semibold text-red-700">{train.arrivalTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-bold text-lg">
                        <span className="text-green-600">{train.availableSeats}</span>
                        <span className="text-gray-400">/{train.totalSeats}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fare per Seat</p>
                      <p className="text-2xl font-bold text-primary">₹{train.fare}</p>
                    </div>
                  </div>

                  {train.classes && train.classes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Classes Available:</p>
                      <div className="flex gap-2 mt-1">
                        {train.classes.map((cls, idx) => (
                          <span key={idx} className="bg-gray-100 px-3 py-1 rounded text-sm">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex flex-col items-center justify-center min-w-[120px]">
                  {train.availableSeats > 0 ? (
                    <Link
                      to={`/booking?type=train&id=${train._id}`}
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
