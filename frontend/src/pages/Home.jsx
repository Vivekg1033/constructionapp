import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ContactUs from "./Contact";
import ProfilePage from "./ProfilePage";
import RepairRequestForm from "../components/RepairRequestForm";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
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
      
      {/* Slider Section */}
      <section className="main">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="swiper-container"
        >
          {[1, 2, 3].map((num) => (
            <SwiperSlide key={num}>
              <img src={`/image/banner${num}.jpg`} alt={`Banner ${num}`} />
              <div className="swiper-slide-content">
                <h2>Expert Construction Machine Repair Services</h2>
                <p>Reliable, fast, and professional repairs to keep your machines running at peak performance.</p>
                <Link to="/repair" className="slider-btn">Get a Free Quote</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* About Section */}
      <section className="About" id="about" data-aos="fade-up">
        <h2>About Us</h2>
        <div className="about-box container">
          {/* <div className="about-image">
            <img src="/public/image/about.jpg" alt="About Us" className="background-image" />
          </div> */}
          <div className="about-Content">
            <h3>Reliable Construction Equipment Repair Experts</h3>
            <p>We provide expert solutions for construction machinery repair, ensuring peak performance.</p>
            <div className="btn"><Link to="/about">Know More</Link></div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="service" id="service" data-aos="fade-up">
        <h2>Our Services</h2>
        <div className="service-box container">
          {["Heavy Equipment Repair", "Hydraulic System Maintenance", "Engine & Transmission Overhaul", "On-Site Emergency Repair"].map((service, index) => (
            <div className="service-card" key={index}>
              <div className="card-image">
                <img src={`/image/service-${index + 1}.jpg`} alt={service} />
              </div>
              <div className="card-text">
                <h4>{service}</h4>
                <p>Top-quality service to keep your equipment running efficiently.</p>
                <div className="btn"><Link to="/repair">Book Your's</Link></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      Footer Section
      {/* <footer>
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
      </footer> */}
    </div>
  );
};

export default Home;
