import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 text-center text-xs">
        <Link to="/" className={`py-2 ${isActive('/') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
          <div>🏠</div>
          <div>Home</div>
        </Link>
        <Link to="/trains" className={`py-2 ${isActive('/trains') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
          <div>🚂</div>
          <div>Trains</div>
        </Link>
        <Link to="/buses" className={`py-2 ${isActive('/buses') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
          <div>🚌</div>
          <div>Buses</div>
        </Link>
        <Link to="/flights" className={`py-2 ${isActive('/flights') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
          <div>✈️</div>
          <div>Flights</div>
        </Link>
        {user?.role === 'admin' ? (
          <Link to="/admin" className={`py-2 ${isActive('/admin') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
            <div>🛠️</div>
            <div>Admin</div>
          </Link>
        ) : (
          <Link to="/my-bookings" className={`py-2 ${isActive('/my-bookings') ? 'text-primary font-semibold' : 'text-gray-600'}`}>
            <div>📋</div>
            <div>Bookings</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
