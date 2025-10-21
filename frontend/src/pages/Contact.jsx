import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-secondary">Address</h3>
                    <p className="text-gray-600">123 Travel Street, Mumbai, Maharashtra 400001, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-secondary">Phone</h3>
                    <p className="text-gray-600">+91 1800-123-4567 (Toll Free)</p>
                    <p className="text-gray-600">+91 22-1234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-secondary">Email</h3>
                    <p className="text-gray-600">support@indiantickets.com</p>
                    <p className="text-gray-600">info@indiantickets.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h3 className="font-semibold text-secondary">Business Hours</h3>
                    <p className="text-gray-600">24/7 Customer Support</p>
                    <p className="text-gray-600">Office: Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-secondary mb-3">Follow Us</h3>
                <div className="flex gap-4 text-2xl">
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="LinkedIn">💼</a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-4">Send us a Message</h2>
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  ✅ Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full border-2 border-primary/30 rounded-lg px-4 py-2 focus:border-primary outline-none resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-accent transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/" className="inline-block text-primary hover:text-accent font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
