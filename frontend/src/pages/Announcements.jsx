import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/public/announcements?limit=50')
      .then(res => setItems(res.data || []))
      .catch(err => setError(err.response?.data?.message || 'Failed to load announcements'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50 bg-pattern-grid">
      {/* Header Hero */}
      <div className="bg-hero bg-hero-home bg-hero-fixed py-14 mb-8 relative overflow-hidden">
        <div className="hero-overlay" />
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 text-shadow-lg">Service Updates</h2>
          <p className="text-center text-white/90 text-lg">Latest announcements, route changes, offers, and maintenance alerts</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        items.length === 0 ? (
          <div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
              No announcements available right now. Here are some recent updates and information for you:
            </div>
            <ul className="space-y-3">
              {[
                {
                  title: '🎉 New Vande Bharat Express Route: Chennai to Bangalore',
                  content: 'High-speed Vande Bharat now connects Chennai and Bangalore in just ~4 hours. Special launch fares available for a limited time.',
                  publishedAt: '2025-10-20T10:00:00'
                },
                {
                  title: '🚌 Diwali Special Bus Services Announced',
                  content: 'Extra night services on popular routes between Oct 28 and Nov 5. Book early to confirm your seat.',
                  publishedAt: '2025-10-19T14:30:00'
                },
                {
                  title: '✈️ New Direct Flight: Chennai → Goa',
                  content: 'Daily morning and evening direct flights introduced. Early bird 20% off till Oct 31.',
                  publishedAt: '2025-10-18T09:00:00'
                },
              ].map((a, idx) => (
                <li key={idx} className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow border border-primary/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="font-semibold text-secondary">{a.title}</div>
                    <div className="text-xs text-gray-500">{new Date(a.publishedAt).toLocaleString()}</div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{a.content}</p>
                  <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Sample update</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map(a => (
              <li key={a.id} className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow border border-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-semibold text-secondary">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ''}</div>
                </div>
                {a.content && <p className="text-sm text-gray-700 mt-2">{a.content}</p>}
                {a.link && (
                  <a className="inline-block mt-3 text-primary underline" href={a.link} target="_blank" rel="noreferrer">Read more</a>
                )}
              </li>
            ))}
          </ul>
        )
      )}
      </div>
    </div>
  );
}
