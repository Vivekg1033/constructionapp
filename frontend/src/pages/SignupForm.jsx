import React, { useState } from "react";
import axios from "axios";
import "./SignupForm.css";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [residency, setResidency] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");
  const [otp, setOtp] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      address: {
        residency,
        street,
        landmark,
        city,
        state,
        country,
        pincode,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8765/user/client/register",
        data
      );
      setServerResponse(response.data.message);
    } catch (error) {
      setServerResponse(error.response?.data?.message || "An error occurred.");
    }
  };

  const getOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8765/user/get-otp", {
        email,
      });
      alert(response.data.message); // Notify user OTP is sent
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Client Registration</h2>
      {serverResponse && (
        <p
          className={`${
            serverResponse.includes("error") ? "error-message" : "success-message"
          }`}
        >
          {serverResponse}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
            placeholder=" "
          />
          <label className="signup-label">First Name</label>
        </div>

        <div className="signup-form-group">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
            placeholder=" "
          />
          <label className="signup-label">Last Name</label>
        </div>

        <div className="signup-form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder=" "
          />
          <label className="signup-label">Email</label>
        </div>

        <div className="signup-form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder=" "
          />
          <label className="signup-label">Password</label>
        </div>

        <h3 className="signup-address-header">Address</h3>
        <div className="signup-form-group">
          <input
            type="text"
            value={residency}
            onChange={(e) => setResidency(e.target.value)}
            className="input"
            placeholder=" "
          />
          <label className="signup-label">Residency</label>
        </div>

        <div className="signup-form-group-row">
          <div className="signup-form-group">
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Street</label>
          </div>

          <div className="signup-form-group">
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="label">Landmark</label>
          </div>
        </div>

        <div className="signup-form-group-row">
          <div className="signup-form-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">City</label>
          </div>

          <div className="signup-form-group">
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">State</label>
          </div>
        </div>

        <div className="signp-form-group-row">
          <div className="signup-form-group">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Country</label>
          </div>

          <div className="signup-form-group">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Pincode</label>
          </div>
        </div>

        <div className="signup-form-group-row">
          <div className="signup-form-group">
            <button type="button" onClick={getOtp} className="button">
              Get OTP
            </button>
          </div>

          <div className="signup-form-group">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">OTP</label>
          </div>
        </div>

        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
