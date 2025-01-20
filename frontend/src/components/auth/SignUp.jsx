// imports 
import React, { useState } from 'react';
import axios from 'axios'; // making api requests to server
import './SignUpSignIn.css' // styles

// icons
import User from '/src/assets/person.png'
import Email from '/src/assets/mail.png'
import Password from '/src/assets/password.png'

// sign up component - switch to login form when sign up is complete
const SignUp = ({ onSignUpComplete }) => {

  // initializes empty variables for name, emaila and password
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // update the state when user types in input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // triggered when form is submitted
  const handleSubmit = async (e) => {
    // prevents browser from refreshin
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL; // reads api url from varaible
      await axios.post(`${apiUrl}/api/user`, userData); // sends POST request
      console.log('User created successfully!'); // console message 
      
      // callback function - switch to login page
      onSignUpComplete();

    } catch (error) { // logging errors
      console.error('Error creating user:', error.message);
    }
  };

  // component
  return (
    <div className='auth-container'>
      {/* header */}
      <h2 className='header'>Sign Up</h2>

      {/* sign up form - function called when submitted */}
      <form className='form' onSubmit={handleSubmit}>
        
        {/* name input field */}
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

        {/* email input field */}
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

        {/* password input field */}
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
        
        {/* submit button */}
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