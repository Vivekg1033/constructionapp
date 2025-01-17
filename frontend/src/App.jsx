import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SignupForm from './pages/SignupForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
