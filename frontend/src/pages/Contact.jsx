import React from "react";
import { Link } from "react-router-dom";  // ✅ Import Link
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contact-animation.json";
import "./Contact.css";

const ContactUs = () => {
  return (
    <div>
      {/* <Navbar />  ✅ Navbar added back */}
      {/* Header Section */}
      <header className="header" data-aos="fade-down">
        <div className="header-box container">
          <div className="logo">
            <Link to="/">Construction Machine Repair Service</Link>
          </div>
          <nav className="menu">
            <Link to="/" className="active">Home</Link>
            <Link to="/repair">Book Repair</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          <div className="btn-box">
            <Link to="/login" className="btn1">Login</Link>
            {/* <Link to="/signup" className="btn2">Sign Up</Link> */}
          </div>
        </div>
      </header>

      <div className="repair-container">
        <div className="repair-content">
          {/* Form Section */}
          <div className="repair-card">
            <h2>Contact Us</h2>
            <form>
              <label>Name:</label>
              <input type="text" placeholder="Enter your name" required />

              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Message:</label>
              <textarea placeholder="Enter your message" required></textarea>

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* Lottie Animation Section */}
          <div className="lottie-animation">
            <Lottie animationData={contactAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
