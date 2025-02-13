import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8765/api/user/profile", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8765/api/user/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setUser(null);
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!user) return <p className="error">User not found!</p>;

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
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
  );
};

export default ProfilePage;
