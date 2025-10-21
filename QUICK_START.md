# ✅ Indian Tickets - Your Application is Ready!

## 🚀 Current Status

### ✅ **Both servers are running:**
- **Backend**: http://localhost:5000 (MongoDB connected)
- **Frontend**: http://localhost:5173

---

## 📋 What You Already Have

### ✅ **Two Login Systems**
1. **User Login** - For regular customers to book tickets
2. **Admin Login** - For administrators to manage trains, buses, flights

### ✅ **Admin Features** (Already Implemented)
- Add new trains
- Add new buses  
- Add new flights
- Edit existing transport
- Delete transport
- View all bookings

### ✅ **User Features** (Already Implemented)
- Register new account
- Login
- Search trains/buses/flights by source & destination
- Book tickets with passenger details
- Get PNR number
- View all bookings
- Cancel bookings

### ✅ **Home Page** (Already Implemented)
- Three tabs: Train, Bus, Flight
- Search form with Source and Destination
- Direct search results
- Book button for each result

---

## 🎯 HOW TO USE YOUR APPLICATION

### Step 1: Create Admin Account
Open a **NEW PowerShell terminal** and run:
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/auth/seed-admin -Method POST
```

This creates:
- **Email**: admin@indiantickets.com
- **Password**: admin123

### Step 2: Open Application
Go to: **http://localhost:5173**

### Step 3: Login as Admin
1. Click **"Login"** in navbar
2. Enter:
   - Email: `admin@indiantickets.com`
   - Password: `admin123`
3. Click Login

### Step 4: Add Sample Trains
1. Click **"Admin"** in navbar
2. Click **"Trains"** tab
3. Add this train:
   - Train Number: `12301`
   - Name: `Rajdhani Express`
   - Source: `Delhi`
   - Destination: `Mumbai`
   - Departure Time: `08:00 AM`
   - Arrival Time: `02:00 PM`
   - Total Seats: `100`
   - Fare: `1500`
4. Click **"Add Train"**

### Step 5: Add Sample Buses
1. Click **"Buses"** tab
2. Add this bus:
   - Bus Number: `BUS001`
   - Name: `Volvo Sleeper`
   - Source: `Bangalore`
   - Destination: `Chennai`
   - Departure Time: `10:00 PM`
   - Arrival Time: `06:00 AM`
   - Total Seats: `40`
   - Fare: `800`
3. Click **"Add Bus"**

### Step 6: Add Sample Flights
1. Click **"Flights"** tab
2. Add this flight:
   - Flight Number: `6E345`
   - Airline: `IndiGo`
   - Source: `Mumbai`
   - Destination: `Bangalore`
   - Departure Time: `07:00 AM`
   - Arrival Time: `08:30 AM`
   - Total Seats: `180`
   - Fare: `4500`
3. Click **"Add Flight"**

### Step 7: Logout from Admin
Click **"Logout"** button

### Step 8: Register as User
1. Click **"Register"**
2. Fill in your details (Name, Email, Password)
3. Click **"Register"**

### Step 9: Login as User
1. Use the email and password you just registered
2. Click **"Login"**

### Step 10: Search and Book Ticket
1. Go to **Home** page
2. Click **"Train"** tab
3. Enter:
   - Source: `Delhi`
   - Destination: `Mumbai`
4. Click **"Search Trains"**
5. You'll see the Rajdhani Express
6. Click **"Book Now"**
7. Add passenger details:
   - Name: Your name
   - Age: Your age
   - Gender: Select
8. Click **"Confirm Booking"**
9. You'll get a **PNR number**!

### Step 11: View Your Bookings
1. Click **"My Bookings"** in navbar
2. See your ticket with PNR, status, and fare
3. You can cancel if needed

---

## 🎨 Features on Each Page

### **Home Page** (/)
- Three mode tabs: Train, Bus, Flight
- Search form
- Quick search functionality

### **Trains Page** (/trains)
- List of all available trains
- Filter by source/destination
- Book button for each train

### **Buses Page** (/buses)
- List of all available buses
- Filter by source/destination
- Book button for each bus

### **Flights Page** (/flights)
- List of all available flights
- Filter by source/destination
- Book button for each flight

### **Booking Page** (/booking)
- Passenger details form
- Add multiple passengers
- Total fare calculation
- Confirm booking

### **My Bookings** (/my-bookings)
- All your bookings
- PNR, status, fare
- Cancel option

### **Admin Dashboard** (/admin)
- Three tabs: Trains, Buses, Flights
- Add new transport
- Edit/Delete existing
- Full CRUD operations

---

## 🔑 Test Accounts

**Admin:**
- Email: `admin@indiantickets.com`
- Password: `admin123`

**User:**
- Register your own account!

---

## 📱 Your Application Features

✅ **Two separate login flows** (User & Admin)
✅ **Admin can add trains, buses, flights**
✅ **Home page with search functionality**
✅ **Complete booking flow**
✅ **PNR generation**
✅ **View bookings**
✅ **Cancel bookings**
✅ **Responsive design**
✅ **Indian-themed colors**

---

## 🆘 If Servers Stop

**Restart Backend:**
```powershell
cd D:\tbf\backend
npm run dev
```

**Restart Frontend:**
```powershell
cd D:\tbf\frontend
npm run dev
```

---

**Your complete Indian Tickets booking system is ready to use!** 🎫🚂🚌✈️
