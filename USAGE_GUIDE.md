# Indian Tickets - Quick Start Guide

## Step-by-Step Usage Guide

### 1️⃣ **Seed Admin Account**

First, create an admin account. Open a new terminal and run:

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/auth/seed-admin -Method POST
```

**Admin Credentials:**
- Email: `admin@indiantickets.com`
- Password: `admin123`

### 2️⃣ **Access the Application**

Open your browser and go to: **http://localhost:5173**

---

## 👤 USER WORKFLOW

### Register a New User
1. Click **"Register"** in the navbar
2. Fill in: Name, Email, Password
3. Click **"Register"**
4. Login with your credentials

### Search & Book Tickets
1. On the **Home Page**, you'll see:
   - Three tabs: **Train**, **Bus**, **Flight**
   - Search form: Source, Destination
2. Select a mode (Train/Bus/Flight)
3. Enter source (e.g., "Delhi") and destination (e.g., "Mumbai")
4. Click **"Search"**
5. You'll see available options
6. Click **"Book Now"** on any option
7. Enter passenger details (name, age, gender)
8. Click **"Confirm Booking"**
9. You'll get a **PNR number** and confirmation

### View Your Bookings
1. Click **"My Bookings"** in navbar
2. See all your bookings with PNR, status, fare
3. Cancel bookings if needed

---

## 🔐 ADMIN WORKFLOW

### Login as Admin
1. Click **"Login"** in navbar
2. Use admin credentials:
   - Email: `admin@indiantickets.com`
   - Password: `admin123`
3. Click **"Login"**

### Add Trains
1. After login, click **"Admin"** in navbar
2. Click **"Trains"** tab
3. Fill in the form:
   - Train Number: e.g., "12345"
   - Name: e.g., "Rajdhani Express"
   - Source: "Delhi"
   - Destination: "Mumbai"
   - Departure Time: "08:00 AM"
   - Arrival Time: "02:00 PM"
   - Total Seats: 100
   - Fare: 1500
4. Click **"Add Train"**

### Add Buses
1. Click **"Buses"** tab in Admin Dashboard
2. Fill in the form:
   - Bus Number: e.g., "BUS001"
   - Name: e.g., "Volvo Sleeper"
   - Source: "Bangalore"
   - Destination: "Chennai"
   - Departure Time: "10:00 PM"
   - Arrival Time: "06:00 AM"
   - Total Seats: 40
   - Fare: 800
3. Click **"Add Bus"**

### Add Flights
1. Click **"Flights"** tab in Admin Dashboard
2. Fill in the form:
   - Flight Number: e.g., "AI101"
   - Airline: e.g., "Air India"
   - Source: "Delhi"
   - Destination: "Goa"
   - Departure Time: "11:00 AM"
   - Arrival Time: "01:30 PM"
   - Total Seats: 180
   - Fare: 5000
3. Click **"Add Flight"**

### Edit/Delete Transport
- Click **"Edit"** to modify existing trains/buses/flights
- Click **"Delete"** to remove them

---

## 📋 Sample Data to Add

### Sample Trains
1. Train Number: `12301`, Name: "Howrah Rajdhani", Source: "Kolkata", Destination: "Delhi", Departure: "05:00 PM", Arrival: "09:55 AM", Seats: 120, Fare: 2500
2. Train Number: `12951`, Name: "Mumbai Rajdhani", Source: "Mumbai", Destination: "Delhi", Departure: "04:25 PM", Arrival: "08:35 AM", Seats: 150, Fare: 2200

### Sample Buses
1. Bus Number: `BUS101`, Name: "Sharma Travels", Source: "Pune", Destination: "Bangalore", Departure: "09:00 PM", Arrival: "09:00 AM", Seats: 50, Fare: 1200
2. Bus Number: `BUS202`, Name: "VRL Travels", Source: "Hyderabad", Destination: "Bangalore", Departure: "11:00 PM", Arrival: "07:00 AM", Seats: 45, Fare: 900

### Sample Flights
1. Flight Number: `6E345`, Airline: "IndiGo", Source: "Mumbai", Destination: "Bangalore", Departure: "07:00 AM", Arrival: "08:30 AM", Seats: 186, Fare: 4500
2. Flight Number: "SG234", Airline: "SpiceJet", Source: "Delhi", Destination: "Chennai", Departure: "02:00 PM", Arrival: "04:30 PM", Seats: 189, Fare: 5200

---

## 🎯 Complete Test Flow

1. **Seed Admin** (terminal command)
2. **Login as Admin** → Add sample trains, buses, flights
3. **Logout**
4. **Register as User** → Create a new user account
5. **Search** → Go to Home, search "Delhi" to "Mumbai" for trains
6. **Book** → Select a train, add passenger details, confirm
7. **View Bookings** → Check "My Bookings" to see your ticket with PNR
8. **Cancel** → Try canceling a booking

---

## 🚀 Quick Commands

**Seed Admin:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/auth/seed-admin -Method POST
```

**Check if backend is running:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/trains
```

**Start Backend (if stopped):**
```powershell
cd D:\tbf\backend
npm run dev
```

**Start Frontend (if stopped):**
```powershell
cd D:\tbf\frontend
npm run dev
```

---

## 📱 UI Features

- **Responsive Design**: Works on mobile, tablet, desktop
- **Color Theme**: Indian-inspired (Orange, Blue, Yellow)
- **Easy Navigation**: Clear navbar with all sections
- **Search Tabs**: Switch between Train/Bus/Flight on home page
- **Booking Confirmation**: Instant PNR generation
- **Status Display**: See booking status (Confirmed/Cancelled)

Enjoy using **Indian Tickets**! 🎫
