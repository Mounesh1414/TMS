import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />
      <Outlet />
      <MobileBottomNav />
    </div>
  );
}
