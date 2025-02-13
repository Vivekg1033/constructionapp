import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home'

import { Context } from './main';
import { useContext, useEffect } from 'react';
import RepairRequestForm from './components/RepairRequestForm';
import Navbar from './components/Navbar';
import ContactUs from './pages/Contact';
import ProfilePage from './pages/ProfilePage';

function App() {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8765/user/client/me", { withCredentials: true });
        // console.log(response);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        // console.log(error.response.data);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  
  return (

  
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/repair' element={<RepairRequestForm/>}/>
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;