// Navbar.jsx
import React, { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => { 
        await axios.get("http://localhost:8765/user/client/logout", { withCredentials: true })
        .then((res) => {
            setIsAuthenticated(false);
            toast.success(res.data.message);
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        });
    };

    const goToLogin = () => {
        navigateTo("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="logo">
                    RepairPro
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/repair">Book Repair</a>
                    <a href="/contact">Contact</a>
                    <a href="/profile">Profile</a>
                    <ul>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="login_btn">LOGOUT</button>
                        ) : (
                            <button onClick={goToLogin} className="login_btn">LOGIN</button>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
