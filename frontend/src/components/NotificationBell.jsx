import React, { useEffect, useState, useRef } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetchData();
    const id = setInterval(fetchData, 15000); // poll every 15s as fallback
    // SSE subscription
    let es;
    try {
      es = new EventSource((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/notifications/stream', { withCredentials: false });
      es.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          if (data?.type === 'notification') {
            fetchData(); // refresh list and counters
          }
        } catch {}
      };
    } catch {}
    return () => {
      clearInterval(id);
      try { es && es.close(); } catch {}
    };
  }, [user]);

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/notifications?limit=10');
      setItems(res.data.notifications);
      setUnread(res.data.unreadCount);
    } catch (e) {
      // ignore
    }
  };

  const markAll = async () => {
    try {
      await API.post('/notifications/mark-all-read');
      await fetchData();
    } catch {}
  };

  const markOne = async (id) => {
    try {
      await API.post(`/notifications/${id}/read`);
      await fetchData();
    } catch {}
  };

  const openItem = async (n) => {
    // mark as read and navigate to My Bookings, highlight by PNR if present
    try { if (!n.read) await API.post(`/notifications/${n._id}/read`); } catch {}
    setOpen(false);
    const pnr = n?.metadata?.pnr;
    navigate(pnr ? `/my-bookings?pnr=${encodeURIComponent(pnr)}` : '/my-bookings');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen((v) => !v)} className="relative p-2 rounded-full hover:bg-black/5">
        <span role="img" aria-label="bell">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white/80 backdrop-blur shadow-lg rounded-lg border border-gray-200 p-2 z-50">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Notifications</div>
            <button onClick={markAll} className="text-xs text-primary hover:underline">Mark all read</button>
          </div>
          <ul className="max-h-80 overflow-auto divide-y divide-gray-100">
            {items.length === 0 && (
              <li className="p-3 text-sm text-gray-500">No notifications</li>
            )}
            {items.map((n) => (
              <li key={n._id} className={`p-3 text-sm ${n.read ? 'opacity-70' : ''} hover:bg-black/5 rounded cursor-pointer`} onClick={() => openItem(n)}>
                <div className="flex items-start gap-2">
                  <div className="text-lg leading-none">
                    {n.type === 'booking_paid' ? '✅' : n.type === 'booking_cancelled' ? '❌' : '🆕'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-gray-700">{n.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                  {!n.read && (
                    <button onClick={() => markOne(n._id)} className="text-xs text-primary hover:underline">Mark read</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-right">
            <button onClick={() => { setOpen(false); navigate('/notifications'); }} className="text-sm text-primary hover:underline">View all</button>
          </div>
        </div>
      )}
    </div>
  );
}
