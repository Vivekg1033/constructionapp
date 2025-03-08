import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => { 
        try {
            const res = await axios.get("http://localhost:8765/user/client/logout", { withCredentials: true });
            setIsAuthenticated(false);
            toast.success(res.data.message);
            navigate("/login"); // Redirect after logout
        } catch (err) {
            toast.error(err.response?.data?.message || "An unexpected error occurred.");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="logo">
                    <Link to="/">RepairPro</Link>  {/* ✅ Fixed React Router link */}
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/repair">Book Repair</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/profile">Profile</Link>
                    
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="login_btn">LOGOUT</button>
                    ) : (
                        <>
                            <Link to="/login" className="login_btn">LOGIN</Link>
                            <Link to="/signup" className="signup_btn">SIGN UP</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
