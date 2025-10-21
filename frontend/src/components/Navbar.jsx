import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-secondary">Indian Tickets 🎫</Link>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center text-secondary">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/trains" className="hover:text-accent">Trains</Link>
          <Link to="/buses" className="hover:text-accent">Buses</Link>
          <Link to="/flights" className="hover:text-accent">Flights</Link>
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="hover:text-accent">Admin</Link>
              ) : (
                <Link to="/my-bookings" className="hover:text-accent">My Bookings</Link>
              )}
              <NotificationBell />
              <button onClick={logout} className="bg-primary text-white px-4 py-2 rounded hover:bg-accent">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent">Login</Link>
              <Link to="/admin-login" className="hover:text-accent">Admin Login</Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded hover:bg-accent">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-secondary"
          onClick={() => setOpen(o => !o)}
        >
          <span className="text-xl">☰</span>
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3 text-secondary">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <Link to="/trains" onClick={() => setOpen(false)} className="py-2">Trains</Link>
            <Link to="/buses" onClick={() => setOpen(false)} className="py-2">Buses</Link>
            <Link to="/flights" onClick={() => setOpen(false)} className="py-2">Flights</Link>
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setOpen(false)} className="py-2">Admin</Link>
                ) : (
                  <Link to="/my-bookings" onClick={() => setOpen(false)} className="py-2">My Bookings</Link>
                )}
                <div className="flex items-center gap-3 py-2">
                  <NotificationBell />
                  <button onClick={() => { setOpen(false); logout(); }} className="bg-primary text-white px-4 py-2 rounded w-full">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="py-2">Login</Link>
                <Link to="/admin-login" onClick={() => setOpen(false)} className="py-2">Admin Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="bg-primary text-white px-4 py-2 rounded text-center">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
