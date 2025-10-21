import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const load = async (pg = 1) => {
    try {
      const res = await API.get(`/notifications?page=${pg}&limit=${limit}`);
      setItems(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
      setHasMore(res.data.hasMore);
      setPage(res.data.page);
    } catch {}
  };

  useEffect(() => { load(1); }, []);

  const markAll = async () => {
    await API.post('/notifications/mark-all-read');
    load(page);
  };

  const markOne = async (id) => {
    await API.post(`/notifications/${id}/read`);
    load(page);
  };

  const openItem = async (n) => {
    try { if (!n.read) await API.post(`/notifications/${n._id}/read`); } catch {}
    const pnr = n?.metadata?.pnr;
    navigate(pnr ? `/my-bookings?pnr=${encodeURIComponent(pnr)}` : '/my-bookings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Notifications</h2>
        <button onClick={markAll} className="text-sm bg-primary text-white px-3 py-1.5 rounded">Mark all read</button>
      </div>
      <p className="text-gray-600 mb-4">Unread: {unreadCount}</p>
      <ul className="bg-white/80 backdrop-blur rounded-lg shadow divide-y divide-gray-100">
        {items.length === 0 && (
          <li className="p-4 text-gray-500">No notifications</li>
        )}
        {items.map(n => (
          <li key={n._id} onClick={() => openItem(n)} className={`p-4 ${n.read ? 'opacity-70' : ''} flex items-start gap-3 hover:bg-black/5 cursor-pointer`}>
            <div className="text-xl">
              {n.type === 'booking_paid' ? '✅' : n.type === 'booking_cancelled' ? '❌' : '🆕'}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{n.title}</div>
              <div>{n.message}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            {!n.read && (
              <button onClick={(e) => { e.stopPropagation(); markOne(n._id); }} className="text-sm text-primary hover:underline">Mark read</button>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <button disabled={page <= 1} onClick={() => load(page - 1)} className="px-3 py-1.5 border rounded disabled:opacity-50">Prev</button>
        <div className="text-sm text-gray-600">Page {page}</div>
        <button disabled={!hasMore} onClick={() => load(page + 1)} className="px-3 py-1.5 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
