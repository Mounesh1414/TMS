// Seed data for trains, buses, and flights
export const trains = [
  {
    name: 'Chennai Express',
    trainNumber: '12641',
    source: 'Chennai',
    destination: 'Mumbai',
    departureTime: '06:00',
    arrivalTime: '22:30',
    totalSeats: 500,
    availableSeats: 500,
    fare: 850,
    operatorType: 'government',
    operatorName: 'Southern Railways',
    imageUrl: '/images/chennai-express.jpg',
    classes: ['Sleeper', '3A', '2A', '1A'],
    amenities: ['WiFi', 'Pantry', 'Charging'],
    rating: 4.5
  },
  {
    name: 'Kanyakumari SF',
    trainNumber: '12633',
    source: 'Chennai',
    destination: 'Kanyakumari',
    departureTime: '17:15',
    arrivalTime: '06:10',
    totalSeats: 400,
    availableSeats: 400,
    fare: 700,
    operatorType: 'government',
    operatorName: 'Southern Railways',
    imageUrl: '/images/kanyakumari-sf.jpg',
    classes: ['Sleeper', '3A', '2A'],
    amenities: ['Pantry', 'Charging'],
    rating: 4.2
  }
];

  export const announcements = [
    {
      title: '🎉 New Vande Bharat Express Route: Chennai to Bangalore',
      content: 'Exciting news! The new Vande Bharat Express connecting Chennai and Bangalore will start operations from November 1st, 2025. Travel in comfort with high-speed connectivity, reaching your destination in just 4 hours! Bookings open now with special introductory fares starting at ₹1,200.',
      publishedAt: new Date('2025-10-20T10:00:00'),
      link: 'https://www.irctc.co.in',
      priority: 'high'
    },
    {
      title: '🚌 Diwali Special Bus Services Announced',
      content: 'To meet the increased demand during Diwali festival, additional bus services have been scheduled on popular routes. Book your tickets early to secure your seat. Special night services will run between major cities from October 28th to November 5th, 2025.',
      publishedAt: new Date('2025-10-19T14:30:00'),
      link: null,
      priority: 'high'
    },
    {
      title: '✈️ New Direct Flight: Chennai to Goa by Air India',
      content: 'Air India introduces daily direct flights from Chennai to Goa starting November 10th, 2025. Enjoy the scenic beauty of Goa with convenient morning departures at 08:30 AM and evening returns at 06:00 PM. Early bird discount of 20% available for bookings made before October 31st.',
      publishedAt: new Date('2025-10-18T09:00:00'),
      link: 'https://www.airindia.in',
      priority: 'medium'
    },
    {
      title: '🔧 Platform Maintenance: Chennai Central Station',
      content: 'Platform 7 at Chennai Central Railway Station will undergo scheduled maintenance from October 25th to October 27th, 2025. Some train departures may be shifted to adjacent platforms. Please check your platform number on the day of travel and arrive 30 minutes early.',
      publishedAt: new Date('2025-10-17T16:00:00'),
      link: null,
      priority: 'medium'
    },
    {
      title: '💳 New Payment Option: Pay Later with EMI',
      content: 'We are excited to introduce "Pay Later" option for train and flight bookings above ₹3,000. Convert your booking into easy EMIs with zero interest for 3 months. Available through leading credit cards and digital payment partners. T&C apply.',
      publishedAt: new Date('2025-10-16T11:00:00'),
      link: '/services#payments',
      priority: 'low'
    },
    {
      title: '🎫 Tatkal Booking: New Time Slots',
      content: 'IRCTC has revised Tatkal booking timings. AC class Tatkal bookings now start at 10:00 AM (previously 10:00 AM) and Non-AC class at 11:00 AM (previously 11:00 AM) for next day travel. Plan your bookings accordingly to secure last-minute tickets.',
      publishedAt: new Date('2025-10-15T08:00:00'),
      link: 'https://www.irctc.co.in',
      priority: 'medium'
    },
    {
      title: '🌟 Customer Milestone: 10 Million Bookings Completed!',
      content: 'Thank you for your trust! Indian Tickets has successfully completed 10 million bookings. To celebrate, we are offering a special discount code "10MILLION" for 10% off on your next booking (max discount ₹500). Valid till October 31st, 2025.',
      publishedAt: new Date('2025-10-14T12:00:00'),
      link: '/about',
      priority: 'low'
    },
    {
      title: '📱 Mobile App Update: Version 3.5 Released',
      content: 'Our mobile app has been updated with new features including offline ticket access, live train tracking with GPS, instant refund status, and enhanced seat selection interface. Update now from Play Store and App Store for the best booking experience.',
      publishedAt: new Date('2025-10-13T10:30:00'),
      link: null,
      priority: 'low'
    }
  ];
export const buses = [
  {
    name: 'Chennai Deluxe',
    busNumber: 'TN01AB1234',
    source: 'Chennai',
    destination: 'Bangalore',
    departureTime: '08:00',
    arrivalTime: '14:00',
    totalSeats: 40,
    availableSeats: 40,
    fare: 600,
    operatorType: 'government',
    operatorName: 'TNSTC',
    imageUrl: '/images/chennai-deluxe.jpg',
    type: 'AC',
    amenities: ['AC', 'WiFi', 'Water Bottle'],
    rating: 4.0
  },
  {
    name: 'Private Volvo',
    busNumber: 'KA05XY5678',
    source: 'Bangalore',
    destination: 'Chennai',
    departureTime: '15:00',
    arrivalTime: '21:00',
    totalSeats: 36,
    availableSeats: 36,
    fare: 900,
    operatorType: 'private',
    operatorName: 'SRS Travels',
    imageUrl: '/images/volvo-bus.jpg',
    type: 'AC',
    amenities: ['AC', 'Snacks', 'Charging'],
    rating: 4.3
  }
];

export const flights = [
  {
    airline: 'IndiGo',
    flightNumber: '6E123',
    source: 'Chennai',
    destination: 'Delhi',
    departureTime: '09:30',
    arrivalTime: '12:15',
    totalSeats: 180,
    availableSeats: 180,
    fare: 3500,
    operatorType: 'private',
    operatorName: 'IndiGo',
    imageUrl: '/images/indigo.jpg',
    class: 'Economy',
    amenities: ['Snacks', 'WiFi'],
    rating: 4.1
  },
  {
    airline: 'Air India',
    flightNumber: 'AI429',
    source: 'Chennai',
    destination: 'Mumbai',
    departureTime: '18:00',
    arrivalTime: '20:30',
    totalSeats: 150,
    availableSeats: 150,
    fare: 4200,
    operatorType: 'government',
    operatorName: 'Air India',
    imageUrl: '/images/air-india.jpg',
    class: 'Business',
    amenities: ['Meals', 'WiFi', 'Lounge Access'],
    rating: 4.6
  }
];
