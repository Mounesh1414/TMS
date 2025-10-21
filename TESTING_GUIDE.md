# 🧪 Complete Website Testing Guide

**Date:** October 21, 2025  
**Status:** Both servers running and ready for testing

---

## 🚀 Server Status

### ✅ Frontend Server
- **URL:** http://localhost:5174
- **Status:** Running (Vite Dev Server)
- **Framework:** React 18.3.1

### ✅ Backend Server
- **URL:** http://localhost:5000
- **Status:** Running (Express + nodemon)
- **Database:** MongoDB Connected

---

## 📋 Testing Checklist

### 1. 🏠 Homepage Testing

#### IT Home (Main Landing Page)
**URL:** http://localhost:5174/

**Test Items:**
- [ ] Page loads with gradient animations
- [ ] Multi-transport search form (Trains/Buses/Flights)
- [ ] Date picker works correctly
- [ ] Search button functional
- [ ] Recent searches display (if any)
- [ ] Feature cards with hover effects
- [ ] Service sections visible
- [ ] Navigation bar present
- [ ] Mobile bottom navigation (on small screens)

**Features to Check:**
- ✨ Fade-in and slide-up animations
- 🎨 Glass morphism cards
- 🔍 Search functionality
- 📱 Responsive design

---

#### SR Home (Southern Railway)
**URL:** http://localhost:5174/sr-home

**Test Items:**
- [ ] Hero section with gradient background
- [ ] Quick action cards (PNR, Seat Availability, Schedule, Services)
- [ ] Announcements ticker animation
- [ ] Information sections (How to Book, Benefits, Tips)
- [ ] CTA section visible
- [ ] Navigation works

---

### 2. 🚂 Transport Search Pages

#### Trains Page
**URL:** http://localhost:5174/trains

**Test Items:**
- [ ] Search form with from/to/date fields
- [ ] Search button triggers API call
- [ ] Results display correctly (if data exists)
- [ ] No results shows comprehensive info section
- [ ] 8-step booking guide visible
- [ ] 4 feature cards displayed
- [ ] 6 quick tips shown
- [ ] Action buttons work (Home, Buses, Admin)
- [ ] Animations on scroll/load

**Test Search:**
```
From: Delhi
To: Mumbai
Date: Tomorrow
```

---

#### Buses Page
**URL:** http://localhost:5174/buses

**Test Items:**
- [ ] Search form functional
- [ ] Bus-specific booking guide (8 steps)
- [ ] Feature cards: Bus Types, Seating, Amenities, Benefits
- [ ] 6 bus travel tips visible
- [ ] Action buttons work
- [ ] Animations active

**Test Search:**
```
From: Bangalore
To: Hyderabad
Date: Tomorrow
```

---

#### Flights Page
**URL:** http://localhost:5174/flights

**Test Items:**
- [ ] Search form functional
- [ ] Flight-specific booking guide (8 steps)
- [ ] Feature cards: Flight Types, Classes, Services, Benefits
- [ ] 6 air travel tips visible
- [ ] Action buttons work
- [ ] Animations active

**Test Search:**
```
From: Delhi
To: Mumbai
Date: Tomorrow
```

---

### 3. 🔐 Authentication Testing

#### User Registration
**URL:** http://localhost:5174/register

**Test Items:**
- [ ] Registration form displays
- [ ] All fields required
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] Success message on registration
- [ ] Auto-redirect to login

**Test Credentials:**
```
Name: Test User
Email: test@example.com
Phone: 9876543210
Password: Test@123
```

---

#### User Login
**URL:** http://localhost:5174/login

**Test Items:**
- [ ] Login form displays
- [ ] Email/password fields work
- [ ] Error message for wrong credentials
- [ ] Success redirect to home/bookings
- [ ] JWT token stored in localStorage
- [ ] User state persists on refresh

**Test with:**
```
Email: test@example.com
Password: Test@123
```

---

#### Admin Login
**URL:** http://localhost:5174/admin-login

**Test Items:**
- [ ] Enhanced admin login page loads
- [ ] Glass morphism design visible
- [ ] Icons and animations present
- [ ] Seed Admin button shows (dev mode)
- [ ] Seed creates admin successfully
- [ ] Login with admin credentials works
- [ ] Redirect to admin dashboard
- [ ] Admin role verified

**Test Steps:**
1. Click "🌱 Seed Default Admin" button
2. Wait for success message
3. Login with:
   ```
   Email: admin@indiantickets.com
   Password: admin123
   ```
4. Verify redirect to `/admin`

---

### 4. 📱 Booking Features

#### My Bookings
**URL:** http://localhost:5174/my-bookings (requires login)

**Test Items:**
- [ ] Requires authentication
- [ ] Displays user's bookings
- [ ] Shows booking details
- [ ] PNR numbers visible
- [ ] Status badges working
- [ ] Empty state if no bookings

---

#### PNR Status Check
**URL:** http://localhost:5174/pnr-status

**Test Items:**
- [ ] PNR input field works
- [ ] Check status button functional
- [ ] Displays booking information
- [ ] Shows train/bus/flight details
- [ ] Passenger information visible
- [ ] Error handling for invalid PNR

**Test PNR:** (Use a PNR from created booking or test with random 10-digit number)

---

#### Seat Availability
**URL:** http://localhost:5174/seat-availability

**Test Items:**
- [ ] Search form displays
- [ ] Train/bus selection works
- [ ] Date picker functional
- [ ] Seat availability displayed
- [ ] Class-wise availability shown

---

### 5. 👨‍💼 Admin Dashboard

#### Admin Panel
**URL:** http://localhost:5174/admin (requires admin login)

**Test Items:**
- [ ] Requires admin authentication
- [ ] Dashboard loads successfully
- [ ] Statistics/metrics visible
- [ ] Manage bookings section
- [ ] Manage announcements
- [ ] User management (if implemented)
- [ ] Admin-only features accessible

---

### 6. 📄 Static Pages

#### About Page
**URL:** http://localhost:5174/about

**Test Items:**
- [ ] Page loads correctly
- [ ] Content displays
- [ ] Images load (if any)
- [ ] Navigation works

---

#### Services Page
**URL:** http://localhost:5174/services

**Test Items:**
- [ ] Services list displays
- [ ] Icons/images visible
- [ ] Descriptions readable
- [ ] Links functional

---

#### Contact Page
**URL:** http://localhost:5174/contact

**Test Items:**
- [ ] Contact form displays
- [ ] All fields work
- [ ] Form submission functional
- [ ] Success/error messages show
- [ ] Contact information visible

---

#### Terms & Privacy
**URLs:** 
- http://localhost:5174/terms
- http://localhost:5174/privacy

**Test Items:**
- [ ] Content loads
- [ ] Proper formatting
- [ ] Readable text
- [ ] Navigation functional

---

### 7. 🔔 Notifications

#### Notifications Page
**URL:** http://localhost:5174/notifications (requires login)

**Test Items:**
- [ ] Requires authentication
- [ ] Notifications list displays
- [ ] Notification bell icon works
- [ ] Unread count badge visible
- [ ] Mark as read functionality
- [ ] Real-time updates (if SSE enabled)

---

#### Announcements Page
**URL:** http://localhost:5174/announcements

**Test Items:**
- [ ] Public announcements display
- [ ] Latest announcements at top
- [ ] Date/time visible
- [ ] Content formatted correctly
- [ ] Pagination (if many announcements)

---

### 8. 🎨 UI/UX Testing

#### CSS Design System
**Test Items:**
- [ ] Animations smooth (fade-in, slide-up, scale)
- [ ] Gradient effects visible
- [ ] Glass morphism cards working
- [ ] Hover effects on buttons/cards
- [ ] Focus rings on inputs
- [ ] Badge colors correct (primary, success, warning, danger)
- [ ] Alert boxes styled properly
- [ ] Loading states (spinner, skeleton)
- [ ] Button variations working

---

#### Responsive Design
**Test on Different Screens:**

**Desktop (1920x1080):**
- [ ] Full layout displays
- [ ] Navigation bar visible
- [ ] Sidebar (if any) present
- [ ] Content well-spaced

**Tablet (768px):**
- [ ] Layout adjusts properly
- [ ] Cards stack or resize
- [ ] Navigation adapts
- [ ] Touch-friendly elements

**Mobile (375px):**
- [ ] Mobile bottom navigation shows
- [ ] Single column layout
- [ ] Forms easy to fill
- [ ] Text readable
- [ ] Buttons appropriately sized

---

#### Browser Compatibility
**Test in:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

---

### 9. ⚡ Performance Testing

**Test Items:**
- [ ] Initial page load < 3 seconds
- [ ] Navigation instant (SPA routing)
- [ ] Images optimized and load fast
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] API calls complete quickly
- [ ] Hot Module Replacement (HMR) works in dev

---

### 10. 🔒 Security Testing

**Test Items:**
- [ ] Protected routes redirect to login
- [ ] Admin routes check role
- [ ] JWT tokens expire correctly
- [ ] Passwords not visible in console/network
- [ ] CORS configured properly
- [ ] XSS prevention in inputs
- [ ] SQL/NoSQL injection handled

---

### 11. 🌐 API Testing

#### Test Backend Endpoints:

**Authentication:**
```bash
# Register
POST http://localhost:5000/api/auth/register
Body: { name, email, phone, password }

# Login
POST http://localhost:5000/api/auth/login
Body: { email, password }

# Seed Admin
POST http://localhost:5000/api/auth/seed-admin
```

**Trains:**
```bash
GET http://localhost:5000/api/trains?from=Delhi&to=Mumbai&date=2025-10-22
GET http://localhost:5000/api/trains/:id
```

**Buses:**
```bash
GET http://localhost:5000/api/buses?from=Bangalore&to=Hyderabad&date=2025-10-22
GET http://localhost:5000/api/buses/:id
```

**Flights:**
```bash
GET http://localhost:5000/api/flights?from=Delhi&to=Mumbai&date=2025-10-22
GET http://localhost:5000/api/flights/:id
```

**Bookings:**
```bash
POST http://localhost:5000/api/bookings (requires auth)
GET http://localhost:5000/api/bookings/my (requires auth)
GET http://localhost:5000/api/bookings/pnr/:pnr
```

**Notifications:**
```bash
GET http://localhost:5000/api/notifications (requires auth)
PUT http://localhost:5000/api/notifications/:id/read (requires auth)
```

**Public:**
```bash
GET http://localhost:5000/api/public/announcements
```

---

## 🐛 Common Issues & Solutions

### Issue: Port Already in Use
**Solution:**
```powershell
# Kill process on port 5173/5174
Get-Process -Id (Get-NetTCPConnection -LocalPort 5174).OwningProcess | Stop-Process

# Or let Vite use another port automatically
```

### Issue: MongoDB Not Connected
**Solution:**
```powershell
# Start MongoDB service
net start MongoDB

# Or check MongoDB is running
Get-Service -Name MongoDB
```

### Issue: Backend Server Not Running
**Solution:**
```powershell
cd d:\tbf\backend
npm run dev
```

### Issue: Frontend Build Errors
**Solution:**
```powershell
cd d:\tbf\frontend
npm install
npm run dev
```

### Issue: Authentication Not Working
**Check:**
- Backend server running on port 5000
- JWT_SECRET in .env file
- MongoDB connected
- User/Admin seeded in database
- localStorage has token
- CORS configured

### Issue: CSS Not Applied
**Check:**
- Tailwind CSS installed
- `index.css` imported in `main.jsx`
- Class names spelled correctly
- No CSS syntax errors
- Browser cache cleared

---

## 📊 Testing Results Template

```markdown
## Testing Session: [Date]

### Environment
- Frontend: http://localhost:5174 ✅/❌
- Backend: http://localhost:5000 ✅/❌
- Database: MongoDB ✅/❌

### Pages Tested
- [ ] Homepage (IT/SR)
- [ ] Trains Search
- [ ] Buses Search
- [ ] Flights Search
- [ ] User Registration
- [ ] User Login
- [ ] Admin Login
- [ ] My Bookings
- [ ] PNR Status
- [ ] Admin Dashboard
- [ ] Static Pages

### Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce
   - Expected vs Actual
   
### Performance
- Load time: [X]s
- API response: [X]ms
- Smooth animations: Yes/No

### Browser Tested
- Chrome: ✅/❌
- Firefox: ✅/❌
- Mobile: ✅/❌

### Overall Status
- [ ] Ready for Production
- [ ] Needs Minor Fixes
- [ ] Needs Major Fixes
```

---

## 🎯 Quick Testing Workflow

### 1. **Basic Functionality** (5 minutes)
1. Open http://localhost:5174
2. Search for trains/buses/flights
3. Register a new user
4. Login with created user
5. Check navigation works

### 2. **Admin Features** (5 minutes)
1. Go to http://localhost:5174/admin-login
2. Seed admin account
3. Login as admin
4. Access admin dashboard
5. Verify admin-only features

### 3. **Booking Flow** (10 minutes)
1. Search for a train/bus/flight
2. Select from results
3. Fill booking details
4. Submit booking
5. Check PNR status
6. View in My Bookings

### 4. **UI/UX Check** (5 minutes)
1. Test on desktop view
2. Test on mobile view (resize browser)
3. Check all animations
4. Verify hover effects
5. Test form validations

---

## ✅ Sign-Off Checklist

Before marking testing complete:

- [ ] All critical pages load without errors
- [ ] Authentication works (user + admin)
- [ ] Search functionality operational
- [ ] Booking flow complete
- [ ] Admin features accessible
- [ ] Responsive design works
- [ ] No console errors
- [ ] APIs responding correctly
- [ ] Database operations successful
- [ ] CSS/animations smooth

---

## 📞 Support

If you encounter issues:
1. Check terminal logs for errors
2. Check browser console (F12)
3. Verify both servers running
4. Check MongoDB connection
5. Clear browser cache/localStorage
6. Restart servers if needed

---

**🚀 Happy Testing!**

Last Updated: October 21, 2025
