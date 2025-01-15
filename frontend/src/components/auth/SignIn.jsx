import React, { useState } from 'react';
import axios from 'axios';
import Email from '/src/assets/mail.png'
import Password from '/src/assets/key.png'

const SignIn = ({ setUser, handleCloseModal }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/user/login`, credentials);

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
      setUser(user); // Update App state
      handleCloseModal();

    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='header'>Sign In</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input-field'>
          <img src={Email} alt="email-icon" />
          <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
          />
        </div>
        <div className='input-field'>
          <img src={Password} alt="" />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className='auth-button'>
          <button type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
