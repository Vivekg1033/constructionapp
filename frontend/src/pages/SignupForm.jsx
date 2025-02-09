// Import necessary libraries
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-toastify';

const SignupForm = () => {

  const {isAuthenticated, setIsAuthenticated } = useContext(Context);
  // console.log("hello ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("client");
  const [residency, setResidency] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [otp, setOtp] = useState("");

  const navigateTo = useNavigate()

  if(isAuthenticated) {
    return <Navigate to='/'/>
  }

  const getOtp = async (e) => {
    e.preventDefault();
    try {
        const responseOtp = await axios.post(
            "http://localhost:8765/user/client/register/otp",
            { email },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log("OTP Response:", responseOtp.data); // ✅ Corrected console.log
        toast.success(responseOtp.data.message);
    } catch (error) {
        console.error("Error:", error.response?.data?.message || "An error occurred.");
        toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      otp,
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
      const response = await axios.post('http://localhost:8765/user/client/register', data, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      console.log(response);

      setIsAuthenticated(true);
      navigateTo("/");
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error occurred during registration:", error);
      if (error.response && error.response.data) {
          toast.error(error.response.data.message);
      } else {
          toast.error("Registration failed. Please try again later.");
      }
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
          
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
          <label className="label">First Name</label>
        </div>

        <div className="form-group">
          
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
          <label className="label">Last Name</label>
        </div>

        <div className="form-group">
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <label className="label">Email</label>
        </div>

        <div className="form-group">
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <label className="label">Password</label>
        </div>

        <h3 className="address-header">Address</h3>
        <div className="form-group">
          
          <input
            type="text"
            value={residency}
            onChange={(e) => setResidency(e.target.value)}
            className="input"
          />
          <label className="label">Residency</label>
        </div>

        <div className="form-group">
          
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="input"
          />
          <label className="label">Street</label>
        </div>
        <div className="form-group">
          
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="input"
          />
          <label className="label">Landmark</label>
        </div>

        <div className="form-group-row">
        <div className="form-group">
          
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
          <label className="label">City</label>
        </div>

        <div className="form-group">
          
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input"
          />
          <label className="label">State</label>
        </div>
        </div>

        <div className="form-group-row">
        <div className="form-group">
          
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
          />
          <label className="label">Country</label>
        </div>

        <div className="form-group">
          
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input"
          />
          <label className="label">Pincode</label>
        </div>
        </div>

        <div className="form-group">
          <button onClick={getOtp} className="button">Get Otp</button>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input"
          />
          <label className="label">Otp</label>
        </div>

        <button type="submit" className="button">Register</button>
        <div className="register-link">
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignupForm;
