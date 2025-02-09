import React, { useContext } from 'react'
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigateTo = useNavigate()

    const handleLogout = async () => { 
        await axios.get("http://localhost:8765/user/client/logout", { withCredentials: true }) // Correct spelling
        .then((res) => {
            setIsAuthenticated(false);
            toast.success(res.data.message);
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message); // Ensure response has data
            } else {
                toast.error("An unexpected error occurred.");
            }
        });
    }

    const goToLogin = () => {
        navigateTo("/login")
    }

  return (
    <nav>
    <div className="nav_elements">
        <ul>
            {isAuthenticated ? (<button onClick={handleLogout} className='login_btn'>LOGOUT</button>) : (<button onClick={goToLogin} className='login_btn'>LOGIN</button>)}
        </ul>
    </div>
    </nav>
  )
}

export default Navbar