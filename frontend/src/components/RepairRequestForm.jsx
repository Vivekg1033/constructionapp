import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './RepairRequestForm.css';

const RepairRequestForm = () => {
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return;
    }

    if (!["appliance-repair", "electrical-work", "plumbing", "carpentry", "general-maintenance"].includes(purpose)) {
      toast.error("Please select a valid purpose.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("purpose", purpose);
      formData.append("clientNotes", clientNotes);

      attachments.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axios.post(
        "http://localhost:8765/request/client/send",
        formData,
        { 
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      toast.success(res.data.message);
      setDescription("");
      setPurpose("");
      setClientNotes("");
      setAttachments([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="repair-container">
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

      <div className="repair-content container">
        <form onSubmit={handleSubmit} className="repair-card" data-aos="fade-left">
          <h2 className="form-title">Submit a Repair Request</h2>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Purpose:</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} required>
            <option value="">Select Purpose</option>
            <option value="appliance-repair">Appliance Repair</option>
            <option value="electrical-work">Electrical Work</option>
            <option value="plumbing">Plumbing</option>
            <option value="carpentry">Carpentry</option>
            <option value="general-maintenance">General Maintenance</option>
          </select>

          <label>Additional Notes:</label>
          <textarea
            value={clientNotes}
            onChange={(e) => setClientNotes(e.target.value)}
          />

          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleFileChange} />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        <div className="service-section" data-aos="fade-up">
          <div className="service-grid">
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
        </div>
      </div>
    </div>
  );
};

export default RepairRequestForm;
