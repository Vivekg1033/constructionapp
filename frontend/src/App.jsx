import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/' element={<LoginForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;