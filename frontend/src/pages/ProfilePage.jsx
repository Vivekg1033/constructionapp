import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8765/user/client/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        });
        setUser(response.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
        navigate("/login"); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8765/user/client/logout", { withCredentials: true });
      toast.success("Logged out successfully!");
      setUser(null);
      navigate("/login", { replace: true }); // Ensure redirect happens after logout
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!user) return <p className="error">User not found!</p>;

  return (
    <div>
      {/* Header Section */}
      <header className="header" data-aos="fade-down">
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
            {/* <Link to="/login" className="btn1">Login</Link> */}
            {/* <Link to="/signup" className="btn2">Sign Up</Link> */}
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="profile-container" data-aos="fade-up">
        <h2>Profile Details</h2>
        <div className="profile-box container">
          <div className="profile-image">
            <img src="/image/service-4.jpg" alt="Profile" className="background-image" />
          </div>
          <div className="profile-card">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            {user.address && (
              <div className="address-section">
                <h3>Address</h3>
                <p><strong>Residency:</strong> {user.address.residency}</p>
                <p><strong>Street:</strong> {user.address.street}</p>
                {user.address.landmark && <p><strong>Landmark:</strong> {user.address.landmark}</p>}
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>State:</strong> {user.address.state}</p>
                <p><strong>Country:</strong> {user.address.country}</p>
                <p><strong>Pincode:</strong> {user.address.pincode}</p>
              </div>
            )}

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
