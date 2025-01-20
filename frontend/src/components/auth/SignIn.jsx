// importing react, useState, axios, and icons
import React, { useState } from 'react';
import axios from 'axios'; // library to communicate with backensd API
import Email from '/src/assets/mail.png'
import Password from '/src/assets/key.png'

// sign in component
const SignIn = ({ setUser, handleCloseModal }) => {

  // initializeation - empty strings for email and password
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // triggered when user types in input fields
  // updates strings
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // submit button
  const handleSubmit = async (e) => {
    // prevents the browser from refreshing the page
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL; // reads url
      const response = await axios.post(`${apiUrl}/api/user/login`, credentials); //sends POST request to url with user's details

      const user = response.data.user; // extracts user object after login
      localStorage.setItem('user', JSON.stringify(user)); // save to localStorage
      setUser(user); // update app state
      handleCloseModal(); // close the sign in box

    } catch (error) {
      // handles errors
      console.error('Login error:', error.message);
    }
  };

  // component display
  return (
    <div className='auth-container'>
      {/* header */}
      <h2 className='header'>Sign In</h2>

      {/* sign in form */}
      <form className='form' onSubmit={handleSubmit}>

        {/* email input field */}
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

        {/* password input field */}
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

        {/* sign in button */}
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
