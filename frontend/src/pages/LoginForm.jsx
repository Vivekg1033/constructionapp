import React, { useState } from 'react';

function LoginForm() {
  // useState for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the login here with email and password
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Directly updating the state
          required
        />
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Directly updating the state
          required
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
