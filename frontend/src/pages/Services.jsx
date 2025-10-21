import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Hero */}
      <div className="bg-hero bg-hero-services bg-hero-fixed py-16 mb-8 relative overflow-hidden">
        <div className="hero-overlay" />
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-shadow-lg">Our Services</h1>
          <p className="text-white/90 text-lg">Trains, buses, and flights – all in one silky-smooth booking flow</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-lg">
              Indian Tickets offers a comprehensive suite of travel services to make your journey planning 
              seamless, secure, and hassle-free. Explore all our features below.
            </p>

            {/* Main Services */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🚂</div>
                <h3 className="text-xl font-bold text-secondary mb-3">Train Booking</h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ Real-time seat availability</li>
                  <li>✅ All train types (Rajdhani, Shatabdi, Express)</li>
                  <li>✅ Multiple class options (1A, 2A, 3A, SL)</li>
                  <li>✅ Tatkal booking support</li>
                  <li>✅ RAC and waitlist tracking</li>
                  <li>✅ Instant e-ticket generation</li>
                </ul>
                <Link to="/trains" className="inline-block mt-4 text-primary hover:text-accent font-semibold">
                  Book Trains →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🚌</div>
                <h3 className="text-xl font-bold text-secondary mb-3">Bus Booking</h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ 500+ bus operators</li>
                  <li>✅ AC & Non-AC options</li>
                  <li>✅ Sleeper and seater coaches</li>
                  <li>✅ Live bus tracking</li>
                  <li>✅ Boarding point selection</li>
                  <li>✅ Flexible cancellation</li>
                </ul>
                <Link to="/buses" className="inline-block mt-4 text-primary hover:text-accent font-semibold">
                  Book Buses →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">✈️</div>
                <h3 className="text-xl font-bold text-secondary mb-3">Flight Booking</h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ Domestic flights</li>
                  <li>✅ All major airlines</li>
                  <li>✅ Economy, Business, First Class</li>
                  <li>✅ Best price guarantee</li>
                  <li>✅ Web check-in facility</li>
                  <li>✅ Seat selection options</li>
                </ul>
                <Link to="/flights" className="inline-block mt-4 text-primary hover:text-accent font-semibold">
                  Book Flights →
                </Link>
              </div>
            </section>

            {/* Additional Services */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">Additional Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">🎫 PNR Status Check</h3>
                <p className="text-sm">Track your train ticket status in real-time with live updates on booking confirmation, RAC, and waitlist.</p>
                <Link to="/pnr-status" className="text-primary text-sm hover:underline">Learn more →</Link>
              </div>

              <div className="border-l-4 border-accent pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">💺 Seat Availability</h3>
                <p className="text-sm">Check live seat and berth availability across all trains, buses, and flights before booking.</p>
                <Link to="/seat-availability" className="text-primary text-sm hover:underline">Learn more →</Link>
              </div>

              <div className="border-l-4 border-secondary pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">📋 Train Schedule</h3>
                <p className="text-sm">Access detailed timetables, stoppage information, and running days for all trains.</p>
                <Link to="/train-schedule" className="text-primary text-sm hover:underline">Learn more →</Link>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">🧠 Smart Suggestions</h3>
                <p className="text-sm">Get AI-powered journey recommendations based on your preferences, budget, and travel history.</p>
                <p className="text-gray-500 text-xs mt-1">Coming soon</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">🔐 Secure Payments</h3>
                <p className="text-sm">Multiple payment options with 256-bit SSL encryption, PCI-DSS compliant gateways.</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">📱 Mobile App</h3>
                <p className="text-sm">Book on-the-go with our mobile app (Android & iOS) with offline ticket access.</p>
                <p className="text-gray-500 text-xs mt-1">Coming soon</p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">🔔 Real-time Alerts</h3>
                <p className="text-sm">Get instant notifications for booking confirmations, PNR updates, and travel reminders.</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-secondary mb-2">💰 Best Price Guarantee</h3>
                <p className="text-sm">Transparent pricing with no hidden charges. Get the best deals and exclusive offers.</p>
              </div>
            </div>

            {/* Service Features */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">Why Choose Our Services?</h2>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary mb-3">🎯 User-Friendly Platform</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Simple 3-step booking process</li>
                    <li>• Intuitive search and filters</li>
                    <li>• Quick rebooking of recent searches</li>
                    <li>• Easy cancellation and refunds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-3">⚡ Fast & Reliable</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Real-time availability updates</li>
                    <li>• Instant booking confirmation</li>
                    <li>• 99.9% uptime guarantee</li>
                    <li>• Quick customer support response</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-3">🔒 Secure & Safe</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• SSL encrypted transactions</li>
                    <li>• PCI-DSS certified payment gateway</li>
                    <li>• Data privacy compliance</li>
                    <li>• Fraud detection systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-3">💬 24/7 Support</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Round-the-clock customer service</li>
                    <li>• Multiple contact channels</li>
                    <li>• Quick issue resolution</li>
                    <li>• Multilingual support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Vigilance & Safety */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">Vigilance & Safety Services</h2>
            
            <div className="border-2 border-yellow-300 bg-yellow-50 rounded-xl p-6">
              <h3 className="font-semibold text-secondary mb-3">📞 Vigilance Helpline</h3>
              <p className="text-sm mb-3">
                Report any suspicious activities, corruption, or security concerns. Your identity will be kept confidential.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Helpline:</strong> 1800-XXX-XXXX (Toll Free)</p>
                <p><strong>Email:</strong> vigilance@indiantickets.com</p>
                <p><strong>Available:</strong> 24/7</p>
              </div>
            </div>

            {/* E-Auction */}
            <div className="border-2 border-blue-300 bg-blue-50 rounded-xl p-6 mt-4">
              <h3 className="font-semibold text-secondary mb-3">🏷️ Upcoming E-Auction</h3>
              <p className="text-sm mb-3">
                Participate in upcoming auctions for premium travel packages, loyalty points, and exclusive offers.
              </p>
              <p className="text-sm"><strong>Next Auction:</strong> Check announcements for details</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
