import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SRHome from './pages/SRHome';
import ITHome from './pages/ITHome';
import Trains from './pages/Trains';
import TrainDetail from './pages/TrainDetail';
import Buses from './pages/Buses';
import BusDetail from './pages/BusDetail';
import Flights from './pages/Flights';
import FlightDetail from './pages/FlightDetail';
import Booking from './pages/BookingSimple';
import MyBookings from './pages/MyBookings';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Announcements from './pages/Announcements';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PNRStatus from './pages/PNRStatus';
import SeatAvailability from './pages/SeatAvailability';
import TrainSchedule from './pages/TrainSchedule';
import Services from './pages/Services';
import { useAuth } from './context/AuthContext';

function Protected({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
  { index: true, element: <ITHome /> },
  { path: 'modern-home', element: <Home /> },
  { path: 'sr-home', element: <SRHome /> },
  { path: 'trains', element: <Trains /> },
  { path: 'trains/:id', element: <TrainDetail /> },
  { path: 'buses', element: <Buses /> },
  { path: 'buses/:id', element: <BusDetail /> },
  { path: 'flights', element: <Flights /> },
  { path: 'flights/:id', element: <FlightDetail /> },
      { path: 'booking', element: <Protected><Booking /></Protected> },
      { path: 'my-bookings', element: <Protected><MyBookings /></Protected> },
  { path: 'notifications', element: <Protected><Notifications /></Protected> },
  { path: 'announcements', element: <Announcements /> },
  { path: 'about', element: <About /> },
  { path: 'contact', element: <Contact /> },
  { path: 'terms', element: <Terms /> },
  { path: 'privacy', element: <Privacy /> },
  { path: 'pnr-status', element: <PNRStatus /> },
  { path: 'seat-availability', element: <SeatAvailability /> },
  { path: 'train-schedule', element: <TrainSchedule /> },
  { path: 'services', element: <Services /> },
      { path: 'login', element: <Login /> },
  { path: 'admin-login', element: <AdminLogin /> },
      { path: 'register', element: <Register /> },
      { path: 'admin', element: <Protected adminOnly><AdminDashboard /></Protected> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});
