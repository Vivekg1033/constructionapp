// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

const SignupForm = () => {
  console.log("hello ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [residency, setResidency] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");
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
      const response = await axios.post('http://localhost:8765/user/client/register', data);
      setServerResponse(response.data.message);
    } catch (error) {
      setServerResponse(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <>
    {/* <div class="lottie-container">
        <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_editor_kcmgfd0l.json"  
        background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay></lottie-player>
    </div> */}

    <div className="container">
      <h2 className="header">Client Registration</h2>
      {serverResponse && (
        <p className={`server-message ${serverResponse.includes('error') ? 'error-message' : 'success-message'}`}>
          {serverResponse}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <h3 className="address-header">Address</h3>
        <div className="form-group">
          <label className="label">Residency</label>
          <input
            type="text"
            value={residency}
            onChange={(e) => setResidency(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Landmark</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input"
          />
        </div>

        <button type="submit" className="button">Register</button>
      </form>
    </div>
    </>
  );
};

export default SignupForm;