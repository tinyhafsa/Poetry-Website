// APP BEST VIEWED ON - 1440 x 683 screen
// importing react
import React, { useState, useEffect } from 'react';

// importing main app stylesheet
import './index.css';

// importing components
import Poem from './components/random_poem/Poem';
import Library from './components/library/Library';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

// importing image asset
import AboutImage from './assets/about-image.png'

// main react app 
const App = () => {
  // default state for signup and sign in boxes - disabled
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // store logged in user info
  const [user, setUser] = useState(null);

  // checking is user is logged in - to show welcome message
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // if sign up or sign in boxes are enabled, add class and disable scrolling
  useEffect(() => {
    if (showSignUp || showSignIn) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [showSignUp, showSignIn]);

  // logout handler
  const handleLogout = () => {
    // clear user data
    localStorage.removeItem('user');
    // reset user state
    setUser(null); 
  };

  // functions to enable sign up and sign boxes
  const handleShowSignUp = () => setShowSignUp(true);
  const handleShowSignIn = () => setShowSignIn(true);

  // function to disable sign up and sign in boxes - attached to close button
  const handleCloseModal = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
    <div className="app">

      <header>

        {/* LANDING SECTION */}
        <div className="landing">

            {/* HEADING BOX */}
            <div className="heading">

              {/* title */}
              <div className="page-title">
                <h1>poetry.</h1>
              </div>
              {/* sub-title */}
              <div className="phoenetics">
                <p>/ˈpəʊɪtri/ • noun</p>
              </div>
              <p className="dash">__________________</p>
              {/* meaning */}
              <div className="meaning">
                <p>the expression of feelings and ideas</p>
              </div>

              {/* NAV LINKS */}
              <div className="nav-links">
                - <a href="#about-section">about</a> - <a href="#random-poem">random</a> - <a href="#poem-library">library</a> -
              </div>
            </div>

          {/* AUTHETICATION SECTION */}
          <div className="auth-buttons">
            {user ? (
              <>
                <div className='logout-message'>
                  {/* logout message with user name */}
                  <p>Welcome, <span>{user.name}</span>!</p>
                  {/* logout button */}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <>
                {/* sign up button */}
                <button onClick={handleShowSignUp}>Sign Up</button> 
                {/* sign in button */}
                <button onClick={handleShowSignIn}>Sign In</button>
              </>
            )}
          </div>
        </div>
      </header>

        {/* ABOUT SECTION */}
        <div className="about" id="about-section">

          {/* LEFT SIDE */}
          <div className='about-left'>
            {/* about-section-image */}
            <img src= {AboutImage} alt="" />
          </div>

          {/* RIGHT SIDE */}
          <div className='about-right'>
            {/* about heading */}
            <h1>About</h1>

            {/* about section description */}
            <p><span>poetry.</span> is a website that celebrates the poets of the world. 
            <br /> <br />
            Discover new poems with our <a href="#random-poem">random</a> poem generator, that selects poems from a database of over 120 poets.
            <br /> <br />
            Visit our <a href="#poem-library">library</a> that showcases 15 featured poets and some of their best works.</p>
          </div>
        </div>

        {/* RANDOM POEM SECTION */}
        <Poem />

        {/* LIBRARY SECTION */}
        <Library />

      {/* FOOTER */}
      <footer>
        <p>&copy; Syeda Hafsa 2025</p>
      </footer>

      {/* sign up box */}
      {showSignUp && (
        // modal screen
        <div className="modal-backdrop">
          {/* modal container */}
          <div className="modal-content">
            {/* signup form submit button - calls funtion - creates user account*/}
            <SignUp onSignUpComplete={handleShowSignIn} />
            {/* close button - returns to landing page */}
            <button onClick={handleCloseModal} className="close-button">
              X
            </button>
          </div>
        </div>
      )}

      {/* sign in box */}
      {showSignIn && (
        // modal screen
        <div className="modal-backdrop">
          {/* modal container */}
          <div className="modal-content">
            {/* sign in form button - calls function - logs user in */}
            <SignIn setUser={setUser} handleCloseModal={handleCloseModal} />
            {/* close button - returns to landing page */}
            <button onClick={handleCloseModal} className="close-button">
              X
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// exports react app
export default App;