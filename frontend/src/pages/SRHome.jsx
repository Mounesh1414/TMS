import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function SRHome() {
  const [announcements, setAnnouncements] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/public/announcements?limit=5')
      .then(res => setAnnouncements(res.data || []))
      .catch(() => setAnnouncements([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (source) params.set('source', source);
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    navigate(`/trains?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/train-placeholder.svg')] opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Southern Railway Service Portal</h1>
              <p className="mt-2 text-blue-100">Search trains, check PNR status, and manage bookings with ease.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/pnr-status" className="btn-secondary">Check PNR</Link>
                <Link to="/train-schedule" className="btn-ghost text-white/90">Train Schedule</Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 md:p-6 shadow-xl text-gray-800 hover-card">
                <h2 className="text-lg font-bold text-secondary mb-4">Search Trains</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1" htmlFor="from">From</label>
                    <input id="from" value={source} onChange={(e)=>setSource(e.target.value)} className="w-full border-2 border-primary/20 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder="e.g. CBE" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1" htmlFor="to">To</label>
                    <input id="to" value={destination} onChange={(e)=>setDestination(e.target.value)} className="w-full border-2 border-primary/20 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder="e.g. MAS" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1" htmlFor="date">Date</label>
                    <input id="date" type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full border-2 border-primary/20 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary">Search Trains</button>
                  <Link to="/buses" className="btn-ghost">Find Buses</Link>
                  <Link to="/flights" className="btn-ghost">Find Flights</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links + announcements */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          <Link to="/pnr-status" className="card hover-lift">
            <div className="text-2xl">🎟️</div>
            <div className="font-bold text-secondary">PNR Status</div>
            <p className="text-sm text-gray-600">Check your current ticket status</p>
          </Link>
          <Link to="/seat-availability" className="card hover-lift">
            <div className="text-2xl">🪑</div>
            <div className="font-bold text-secondary">Seat Availability</div>
            <p className="text-sm text-gray-600">Find seats across classes</p>
          </Link>
          <Link to="/train-schedule" className="card hover-lift">
            <div className="text-2xl">📅</div>
            <div className="font-bold text-secondary">Train Schedule</div>
            <p className="text-sm text-gray-600">Get timings and routes</p>
          </Link>
          <Link to="/services" className="card hover-lift">
            <div className="text-2xl">🧾</div>
            <div className="font-bold text-secondary">All Services</div>
            <p className="text-sm text-gray-600">Explore more railway services</p>
          </Link>
        </div>

        {/* Announcements ticker */}
        {announcements?.length > 0 && (
          <div className="mt-4 bg-white rounded-xl shadow p-3 ticker" role="region" aria-label="Latest announcements">
            <div className="ticker__inner">
              {[...announcements, ...announcements].map((a, i) => (
                <div key={i} className="ticker__item">
                  <span className="chip mr-2 bg-blue-100 text-blue-700">Announcement</span>
                  <span className="text-gray-700">{a.title || a.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Info sections */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <article className="card">
            <h3 className="text-secondary font-bold text-lg mb-2">How to Book</h3>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
              <li>Search trains by route and date</li>
              <li>Compare options and choose</li>
              <li>Enter passenger details</li>
              <li>Pay securely and get e-ticket</li>
            </ol>
            <Link to="/trains" className="mt-4 inline-block btn-primary">Start Booking</Link>
          </article>

          <article className="card">
            <h3 className="text-secondary font-bold text-lg mb-2">Benefits</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Instant e-ticket with PNR</li>
              <li>Secure payments</li>
              <li>Easy cancellations & refunds</li>
              <li>SMS & Email notifications</li>
            </ul>
          </article>

          <article className="card">
            <h3 className="text-secondary font-bold text-lg mb-2">Tips</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Book early for best fares</li>
              <li>Check schedule before travel</li>
              <li>Verify passenger details</li>
              <li>Reach station 20-30 mins early</li>
            </ul>
          </article>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold">Ready to plan your journey?</h3>
            <p className="text-white/90">Find the cheapest, fastest, and most comfortable trains in one place.</p>
          </div>
          <Link to="/trains" className="btn-secondary">Explore Trains</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pb-10 text-xs text-gray-700">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/admin-login" className="underline hover:text-primary">Admin Login</Link>
          <Link to="/about" className="underline hover:text-primary">About</Link>
          <Link to="/contact" className="underline hover:text-primary">Contact Us</Link>
          <Link to="/terms" className="underline hover:text-primary">Terms & Conditions</Link>
          <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
        </div>
        <div className="text-center mt-4">© {new Date().getFullYear()} Indian Tickets. All Rights Reserved.</div>
        <div className="text-center text-[10px] mt-2">Maintained by CRIS, Ministry of Railways, Government of India.</div>
      </footer>
    </div>
  );
}
