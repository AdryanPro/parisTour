import React from 'react'
import '../css/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#our-story">Our Story</a></li>
            <li><a href="#team">Meet the Team</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal Information</h3>
          <ul>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#terms-of-service">Terms of Service</a></li>
            <li><a href="#cookies-policy">Cookies Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>To Discover</h3>
          <ul>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#activities">Activities</a></li>
            <li><a href="#events">Upcoming Events</a></li>
          </ul>
        </div>
      </div>
      <button className="footer-contact-btn" onClick={() => window.location.href = '/Contact'}>Contact Us</button>
    </footer>
  );
}
