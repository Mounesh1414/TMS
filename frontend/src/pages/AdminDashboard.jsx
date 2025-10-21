import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function AdminDashboard() {
  const [mode, setMode] = useState('train');
  const [section, setSection] = useState('vehicles');
  const [items, setItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (section === 'vehicles') loadItems();
    if (section === 'bookings') loadBookings();
    if (section === 'users') loadUsers();
  }, [mode, section]);

  const loadItems = () => {
    API.get(`/${mode}s`).then(res => setItems(res.data)).catch(console.error);
  };

  const loadBookings = () => {
    API.get('/bookings').then(res => setBookings(res.data)).catch(console.error);
  };

  const loadUsers = () => {
    API.get('/users').then(res => setUsers(res.data)).catch(console.error);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.availableSeats && payload.totalSeats) {
        payload.availableSeats = payload.totalSeats;
      }
      await API.post(`/${mode}s`, payload);
      showMessage('success', `${mode} added successfully!`);
      setForm({});
      loadItems();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Add failed');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/${mode}s/${id}`, editing);
      showMessage('success', `${mode} updated successfully!`);
      setEditing(null);
      loadItems();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${mode}?`)) return;
    try {
      await API.delete(`/${mode}s/${id}`);
      showMessage('success', `${mode} deleted successfully!`);
      loadItems();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Delete failed');
    }
  };

  const getIdField = () => {
    if (mode === 'train') return 'trainNumber';
    if (mode === 'bus') return 'busNumber';
    return 'flightNumber';
  };

  const getNameField = () => {
    if (mode === 'flight') return 'airline';
    return 'name';
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      <h2 className="text-4xl font-bold mb-6 text-secondary">🎛️ Admin Dashboard</h2>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg shadow-lg ${message.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setSection('vehicles')}
          className={`px-6 py-3 rounded-lg font-semibold shadow transition ${section === 'vehicles' ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-gray-100'}`}
        >
          🚆 Vehicles
        </button>
        <button
          onClick={() => setSection('bookings')}
          className={`px-6 py-3 rounded-lg font-semibold shadow transition ${section === 'bookings' ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-gray-100'}`}
        >
          📋 Bookings
        </button>
        <button
          onClick={() => setSection('users')}
          className={`px-6 py-3 rounded-lg font-semibold shadow transition ${section === 'users' ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-gray-100'}`}
        >
          👥 Users
        </button>
      </div>

      {section === 'vehicles' && (
        <>
          <div className="flex gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setMode('train')}
              className={`px-6 py-3 rounded-lg font-semibold shadow transition ${mode === 'train' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              🚂 Trains
            </button>
            <button
              onClick={() => setMode('bus')}
              className={`px-6 py-3 rounded-lg font-semibold shadow transition ${mode === 'bus' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              🚌 Buses
            </button>
            <button
              onClick={() => setMode('flight')}
              className={`px-6 py-3 rounded-lg font-semibold shadow transition ${mode === 'flight' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              ✈️ Flights
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl mb-6">
            <h3 className="text-2xl font-bold mb-4">Add New {mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
            <form onSubmit={handleAdd} className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder={getIdField()}
                value={form[getIdField()] || ''}
                onChange={(e) => setForm({ ...form, [getIdField()]: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder={getNameField()}
                value={form[getNameField()] || ''}
                onChange={(e) => setForm({ ...form, [getNameField()]: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <select
                value={form.operatorType || 'government'}
                onChange={(e) => setForm({ ...form, operatorType: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
              >
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
              <input
                type="text"
                placeholder="Operator Name (e.g., IRCTC, TNSTC, Air India)"
                value={form.operatorName || ''}
                onChange={(e) => setForm({ ...form, operatorName: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={form.imageUrl || ''}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
              />
              <input
                type="text"
                placeholder="Source"
                value={form.source || ''}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Destination"
                value={form.destination || ''}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Departure Time (e.g., 08:00 AM)"
                value={form.departureTime || ''}
                onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Arrival Time (e.g., 12:00 PM)"
                value={form.arrivalTime || ''}
                onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="number"
                placeholder="Total Seats"
                value={form.totalSeats || ''}
                onChange={(e) => setForm({ ...form, totalSeats: Number(e.target.value) })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <input
                type="number"
                placeholder="Fare (₹)"
                value={form.fare || ''}
                onChange={(e) => setForm({ ...form, fare: Number(e.target.value) })}
                className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                required
              />
              <button type="submit" className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition col-span-3 font-bold shadow">
                ➕ Add {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            </form>
          </div>

          <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Manage {mode.charAt(0).toUpperCase() + mode.slice(1)}s ({items.length})</h3>
            <div className="grid gap-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No {mode}s found. Add one above!</p>
              ) : (
                items.map(item => (
                  <div key={item._id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary/50 transition">
                    {editing?._id === item._id ? (
                      <div className="grid md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={editing[getIdField()]}
                          onChange={(e) => setEditing({ ...editing, [getIdField()]: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        />
                        <input
                          type="text"
                          value={editing[getNameField()]}
                          onChange={(e) => setEditing({ ...editing, [getNameField()]: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        />
                        <select
                          value={editing.operatorType || 'government'}
                          onChange={(e) => setEditing({ ...editing, operatorType: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        >
                          <option value="government">Government</option>
                          <option value="private">Private</option>
                        </select>
                        <input
                          type="text"
                          value={editing.operatorName || ''}
                          onChange={(e) => setEditing({ ...editing, operatorName: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                          placeholder="Operator Name"
                        />
                        <input
                          type="url"
                          value={editing.imageUrl || ''}
                          onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={editing.source}
                          onChange={(e) => setEditing({ ...editing, source: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        />
                        <input
                          type="text"
                          value={editing.destination}
                          onChange={(e) => setEditing({ ...editing, destination: e.target.value })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        />
                        <input
                          type="number"
                          value={editing.fare}
                          onChange={(e) => setEditing({ ...editing, fare: Number(e.target.value) })}
                          className="border-2 border-primary/30 rounded-lg px-3 py-2 focus:border-primary outline-none"
                        />
                        <div className="flex gap-2 col-span-3">
                          <button onClick={() => handleUpdate(item._id)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">💾 Save</button>
                          <button onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-semibold">❌ Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">
                            {item[getNameField()]} <span className="text-sm font-normal text-gray-600">({item[getIdField()]})</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${item.operatorType === 'government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                              {item.operatorType || 'government'}
                            </span>
                            {item.operatorName && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{item.operatorName}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.source} → {item.destination}</p>
                          <p className="text-sm mt-1">
                            <span className="font-semibold">Seats:</span> {item.availableSeats}/{item.totalSeats} &nbsp;|&nbsp;
                            <span className="font-semibold">Fare:</span> ₹{item.fare}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditing(item)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold">✏️ Edit</button>
                          <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">🗑️ Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {section === 'bookings' && (
        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4">All Bookings ({bookings.length})</h3>
          <div className="grid gap-4">
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No bookings found.</p>
            ) : (
              bookings.map(booking => (
                <div key={booking._id} className="p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">PNR: {booking.pnrNumber}</p>
                      <p className="text-sm text-gray-600">User: {booking.user?.name || booking.user?.email || 'N/A'}</p>
                      <p className="text-sm">Type: {booking.vehicleType} | Seats: {booking.seatsBooked} | Fare: ₹{booking.totalFare}</p>
                      <p className="text-sm">Payment: {booking.paymentMethod} | Status: <span className={`font-semibold ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</span></p>
                      <p className="text-xs text-gray-500">Booked: {new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {section === 'users' && (
        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4">All Users ({users.length})</h3>
          <div className="grid gap-4">
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No users found.</p>
            ) : (
              users.map(user => (
                <div key={user._id} className="p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm">Role: <span className={`font-semibold ${user.role === 'admin' ? 'text-red-600' : 'text-blue-600'}`}>{user.role}</span></p>
                      <p className="text-xs text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
