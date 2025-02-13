import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import './RepairRequestForm.css'

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
      // Create FormData to send files + other data
      const formData = new FormData();
      formData.append("description", description);
      formData.append("purpose", purpose);
      formData.append("clientNotes", clientNotes);

      attachments.forEach((file) => {
        formData.append("images", file);
      });

      // Send the request to backend
      const res = await axios.post(
        "http://localhost:8765/request/client/send",
        formData,
        { 
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" } // Required for file uploads
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
    <div className="repair-form">
      <Navbar/>
      <h2>Submit a Repair Request</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RepairRequestForm;
