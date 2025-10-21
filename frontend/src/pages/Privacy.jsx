import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last Updated: October 20, 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">1. Introduction</h2>
              <p>
                At Indian Tickets, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-secondary mt-4 mb-2">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Date of birth, gender, nationality</li>
                <li>Government-issued ID details (as required for booking)</li>
                <li>Payment information (processed securely through payment gateways)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-secondary mt-4 mb-2">Booking Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Travel preferences and history</li>
                <li>Passenger details</li>
                <li>Booking and transaction records</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-secondary mt-4 mb-2">Technical Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address, browser type, device information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Booking Processing:</strong> To complete and manage your travel bookings</li>
                <li><strong>Account Management:</strong> To create and maintain your account</li>
                <li><strong>Communication:</strong> To send booking confirmations, updates, and customer support</li>
                <li><strong>Personalization:</strong> To provide personalized recommendations and offers</li>
                <li><strong>Security:</strong> To detect and prevent fraud and unauthorized activities</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and regulations</li>
                <li><strong>Service Improvement:</strong> To analyze usage and improve our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">4. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Service Providers:</strong> Railways, airlines, bus operators to process bookings</li>
                <li><strong>Payment Processors:</strong> Secure third-party payment gateways</li>
                <li><strong>Business Partners:</strong> Trusted partners who assist in providing services</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-3">
                We do not sell or rent your personal information to third parties for marketing purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">5. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and databases with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>PCI-DSS compliance for payment processing</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                personalized content. You can control cookie preferences through your browser settings.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data (subject to legal requirements)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at privacy@indiantickets.com
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">8. Data Retention</h2>
              <p>
                We retain your personal information as long as necessary to provide services, comply with legal 
                obligations, resolve disputes, and enforce agreements. Booking records are retained for a minimum 
                of 3 years as required by law.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 18. We do not knowingly collect information from 
                children. If you believe we have collected such data, please contact us immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">10. Changes to Privacy Policy</h2>
              <p>
                We may update this policy periodically. We will notify you of significant changes via email or 
                prominent notice on our platform. Continued use after changes indicates acceptance.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">11. Contact Us</h2>
              <p>
                For privacy-related questions or concerns:
                <br />
                Email: privacy@indiantickets.com
                <br />
                Phone: +91 1800-123-4567
                <br />
                Address: 123 Travel Street, Mumbai, Maharashtra 400001, India
              </p>
            </section>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link to="/terms" className="text-primary hover:text-accent font-semibold">
              ← Terms & Conditions
            </Link>
            <Link to="/" className="text-primary hover:text-accent font-semibold">
              Back to Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
