import React, { useState } from 'react';
import axios from 'axios';
import './SignUpSignIn.css'
import User from '/src/assets/person.png'
import Email from '/src/assets/mail.png'
import Password from '/src/assets/password.png'


const SignUp = ({ onSignUpComplete }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/user`, userData);
      console.log('User created successfully!');
      
      // Trigger the callback to switch to the login form
      onSignUpComplete();
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='header'>Sign Up</h2>
      <form className='form' onSubmit={handleSubmit}>
        
        <div className='input-field'>
          <img src={User} alt="user-icon" className='icon' />
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>

        <div className='input-field'>
          <img src={Email} alt="user-icon" className='icon' />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>

        <div className='input-field'>
          <img src={Password} alt="user-icon" className='icon' />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        
        <div className='auth-button'>
          <button type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

