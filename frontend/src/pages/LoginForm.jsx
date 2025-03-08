import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  // useState for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Before axios call');
      const response = await axios.post("http://localhost:8765/user/login", { email, password, role: "client" }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      setIsAuthenticated(true);
      navigateTo('/');
      console.log('Response received', response);
      toast.success(response.data.message);
    } catch (error) {
      console.log('Error occurred', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
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
      </div>

      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Directly updating the state
              className="input"
              required
            />
            <label className="login-label">Email</label>
          </div>

          <div className="login-form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Directly updating the state
              className="input"
              required
            />
            <label className="login-label">Password</label>
          </div>

          <button type="submit" className="button">Login</button>
          <div className="login-register-link">
            <p>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
