import React, { useState } from "react";
import "./home.css";
import Navbar from "../components/Navbar";

const App = () => {
  const [recentBookings] = useState([
    { id: 1, mechanic: "John Doe", service: "Plumbing", date: "2025-02-13" },
    { id: 2, mechanic: "Jane Smith", service: "Electrical", date: "2025-02-12" },
    { id: 3, mechanic: "Mike Johnson", service: "Carpentry", date: "2025-02-11" }
  ]);

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Professional Repair Services</h1>
        <p>Expert mechanics at your doorstep</p>
        <button className="hero-button">Book Now</button>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {["Plumbing", "Electrical", "Carpentry"].map((service) => (
            <div key={service} className="service-card">
              <h3>{service}</h3>
              <p>Professional {service.toLowerCase()} services for your home and office</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings
      <div className="bookings-section">
        <h2>Recent Bookings</h2>
        <div className="bookings-grid">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <p className="booking-mechanic">{booking.mechanic}</p>
              <p className="booking-service">{booking.service}</p>
              <p className="booking-date">{booking.date}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Contact Section */}
      {/* <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-box">
          <p>Need help? Get in touch with us</p>
          <div className="contact-info">
            <p>Phone: +1 234 567 890</p>
            <p>Email: support@repairpro.com</p>
            <p>Address: 123 Repair Street, Fix City</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default App;
