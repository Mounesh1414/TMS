import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.user.role !== 'admin') {
        setError('Only admins can login here.');
        return;
      }
      login(res.data.user, res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSeedAdmin = async () => {
    setError('');
    setInfo('');
    try {
      const res = await API.post('/auth/seed-admin');
      setInfo(res.data?.message || 'Admin seeded successfully. Default: admin@indiantickets.com / admin123');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to seed admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50 px-4">
      <div className="card-glass p-8 max-w-md w-full border-t-8 border-red-500 animate-scale-in">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">Admin Login</h2>
          <p className="text-sm text-gray-600">Use your admin credentials to continue.</p>
        </div>
        
        {error && (
          <div className="alert-error animate-slide-down">
            <span className="text-xl mr-2">⚠️</span>
            {error}
          </div>
        )}
        {info && (
          <div className="alert-success animate-slide-down">
            <span className="text-xl mr-2">✅</span>
            {info}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-secondary">
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input focus-ring"
              placeholder="admin@indiantickets.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-secondary">
              🔑 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input focus-ring"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-gradient w-full py-3 text-lg hover-lift"
          >
            🚀 Login as Admin
          </button>
        </form>
        
        {import.meta.env.DEV && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="alert-info mb-3">
              <span className="text-xl mr-2">💡</span>
              <div className="text-xs">
                <strong>Development Mode:</strong> You can seed a default admin account for testing.
              </div>
            </div>
            <button
              type="button"
              onClick={handleSeedAdmin}
              className="btn-secondary w-full py-2 hover-lift"
            >
              🌱 Seed Default Admin
            </button>
            <p className="mt-2 text-xs text-center text-gray-600 bg-gray-50 rounded-lg p-2">
              <strong>Default Credentials:</strong><br />
              Email: admin@indiantickets.com<br />
              Password: admin123
            </p>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Not an admin?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              👤 Go to user login
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <Link to="/" className="text-secondary font-semibold hover:underline">
              🏠 Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
