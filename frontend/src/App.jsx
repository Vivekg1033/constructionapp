import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import "./App.css";

import Home from "./pages/Home";
import ContactUs from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import RepairRequestForm from "./components/RepairRequestForm";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

const App = () => {
  useEffect(() => {
    AOS.init();
    new Swiper(".swiper", {
      autoplay: {
        delay: 2500,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
    });
  }, []);

  return (
    <Router>
      <div>
        {/* Header Section */}
        {/* <header className="header" data-aos="fade-down">
          <div className="header-box container">
            <div className="logo">
              <Link to="/">Construction Machine Repair Service</Link>
            </div>
            <nav className="menu">
              <Link to="/">Home</Link>
              <Link to="/repair">Book Repair</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/profile">Profile</Link>
            </nav>
            <div className="btn-box">
              <Link to="/LoginForm" className="btn1">Login</Link>
              <Link to="/SignupForm" className="btn2">Sign Up</Link>
            </div>
          </div>
        </header> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repair" element={<RepairRequestForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* You can add Login and Signup pages as needed */}
        </Routes>

        {/* Footer Section */}
        <footer>
          <div className="footerbox container">
            <div className="logo2">
              <Link to="/">Construction Machine Repair Service</Link>
            </div>
            <div className="f-menu">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/repair">Our Services</Link>
            </div>
            <p>Copyright © 2025-26 Technix</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
