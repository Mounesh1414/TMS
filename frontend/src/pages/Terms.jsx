import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">Terms & Conditions</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last Updated: October 20, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Indian Tickets platform, you accept and agree to be bound by the terms and provisions of this agreement. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">2. Use of Service</h2>
              <p>Indian Tickets provides a platform for booking trains, buses, and flights. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide accurate and complete information during registration and booking</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt the service or servers</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">3. Booking and Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All bookings are subject to availability and confirmation</li>
                <li>Prices displayed are inclusive of applicable taxes unless otherwise stated</li>
                <li>Payment must be made in full at the time of booking</li>
                <li>We accept various payment methods as displayed during checkout</li>
                <li>Booking confirmation will be sent to your registered email</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">4. Cancellation and Refund</h2>
              <p>
                Cancellation policies vary by service provider (railway, bus operator, airline). 
                Applicable cancellation charges will be deducted from refunds as per the operator's policy. 
                Refunds are processed within 7-14 business days.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">5. User Account</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for maintaining your account security</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
                <li>One account per user; multiple accounts may be terminated</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">6. Intellectual Property</h2>
              <p>
                All content on Indian Tickets, including text, graphics, logos, and software, is the property of 
                Indian Tickets and protected by copyright and intellectual property laws. Unauthorized use is prohibited.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">7. Limitation of Liability</h2>
              <p>
                Indian Tickets acts as an intermediary between users and service providers. We are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Delays, cancellations, or changes made by service providers</li>
                <li>Loss or damage to luggage or personal belongings</li>
                <li>Any incidents during travel</li>
                <li>Quality of service provided by third-party operators</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">8. Modification of Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting. Continued use of the service after changes constitutes acceptance of modified terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">9. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes will be subject to the exclusive 
                jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">10. Contact Information</h2>
              <p>
                For questions about these terms, please contact us at:
                <br />
                Email: legal@indiantickets.com
                <br />
                Phone: +91 1800-123-4567
              </p>
            </section>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link to="/" className="text-primary hover:text-accent font-semibold">
              ← Back to Home
            </Link>
            <Link to="/privacy" className="text-primary hover:text-accent font-semibold">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
