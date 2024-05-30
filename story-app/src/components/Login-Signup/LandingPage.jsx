import React, { useState } from 'react';
import './LandingPage.css';
import backgroundpic from '../Assets/backgroundpic.png';
import person from '../Assets/person.png';
// import Books from './Books';

const LandingPage = ({
  navigateTo,
  isAuthenticated,
  user,
  handleLogout,
  searchTerm,
  setSearchTerm,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    console.log('searchterm', e.target.value);
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-left'>
          {/* logo and title */}
          <div className='logo'>
            <img src={backgroundpic} alt='' height='50%' width='10%'></img>
          </div>
          <h1 className='title'>KidoCrest</h1>
        </div>

        <div className='navbar-middle'>
          {/* header middle content */}
          {/* <h1> contact us</h1> */}

          <input
            type='text'
            placeholder=' search here..'
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-bar'
          />
        </div>

        <div className='navbar-right'>
          {/* header right side content. if the user is authenticated,
         render profile container witha user container and a drop down
          for the profile information. Otherwise render the login or signup buttons */}
          {isAuthenticated ? (
            <div className='profile-container'>
              <img
                src={person}
                alt='Profile'
                className='profile-icon'
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className='profile-dropdown'>
                  <p>Logged in as {user.first_name}</p>
                  <button onClick={handleLogout}>LogOut</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <img
                src={person}
                alt='Profile'
                className='profile-icon'
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className='profile-dropdown'>
                  <p>User not Logged in</p>
                  <div className='buttons'>
                    <button
                      onClick={() => {
                        navigateTo('Login');
                        toggleDropdown();
                      }}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('Sign Up');
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      {/* <Books /> */}
    </div>
  );
};
export default LandingPage;
