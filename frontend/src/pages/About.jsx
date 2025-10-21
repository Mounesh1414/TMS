import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Hero */}
      <div className="bg-hero bg-hero-about bg-hero-fixed py-16 mb-8 relative overflow-hidden">
        <div className="hero-overlay" />
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-shadow-lg">About Indian Tickets</h1>
          <p className="text-white/90 text-lg">A unified travel platform built for India</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-10">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Welcome to <strong>Indian Tickets</strong> - Your one-stop platform for booking trains, buses, and flights across India.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Our Mission</h2>
            <p>
              We aim to simplify travel booking for millions of Indians by providing a seamless, secure, and user-friendly platform that brings together multiple modes of transportation in one place.
            </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Train Booking:</strong> Book train tickets with real-time availability and instant confirmation</li>
              <li><strong>Bus Booking:</strong> Connect to destinations across India with our extensive bus network</li>
              <li><strong>Flight Booking:</strong> Compare and book domestic flights at the best prices</li>
              <li><strong>Smart Search:</strong> Advanced search and filtering options to find the perfect journey</li>
              <li><strong>Secure Payment:</strong> Safe and encrypted payment gateway for all transactions</li>
              <li><strong>24/7 Support:</strong> Round-the-clock customer service for your travel needs</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-secondary mb-2">Easy Booking</h3>
                <p className="text-sm">Simple and intuitive interface for quick bookings</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold text-secondary mb-2">Best Prices</h3>
                <p className="text-sm">Competitive pricing and exclusive deals</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-secondary mb-2">Secure & Safe</h3>
                <p className="text-sm">Your data and payments are fully protected</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-secondary mt-6 mb-3">Our Journey</h2>
            <p>
              Launched in 2025, Indian Tickets has quickly grown to become one of India's trusted travel platforms. 
              We continue to innovate and expand our services to make travel booking easier and more accessible for everyone.
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition font-semibold">
                Start Booking Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
