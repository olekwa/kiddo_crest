import React, { useState } from 'react';
import './LoginSignup.css';

import email from '../Assets/email.png';
import password from '../Assets/password.png';
import person from '../Assets/person.png';
import Cookies from 'js-cookie';

const LoginSignup = ({ action, navigateTo }) => {
  // const [action, navigateTo] = useState('Sign Up');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // if action is signup; set url to register endpoint, otherwise, set the url to th login endpoint
    const url =
      action === 'Sign Up'
        ? 'http://127.0.0.1:8000/api/v1/register'
        : 'http://127.0.0.1:8000/api/v1/auth/login';

    // if the action is signup, extract signup details from form otherwise extract the login credentials.
    const payload =
      action === 'Sign Up'
        ? {
            username: formData.username,
            password: formData.password,
            password2: formData.password2,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
          }
        : {
            username: formData.username,
            password: formData.password,
          };
    // perform user signup or login using the payload with form extracted data
    try {
      console.log('payload is:', payload);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('data is:', data);
      if (data.token) {
        Cookies.set('authToken', data.token, { expires: 1 });
        alert('Login succesful');
        //navigate to landing page
        navigateTo('');
      }
      if (response.ok) {
        navigateTo('');
      }
      if (response.status === 400) {
        alert('User with the same email or username exists!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        {/* <div className='underline'></div> */}
      </div>
      <div className='inputs'>
        {/* if the action is equal to Sign Up, render the input forms for first name, lastname, email, username, password and password confirmation */}

        {action === 'Sign Up' && (
          <>
            <div className='input'>
              <img src={person} alt='' className='icon'></img>
              <input
                type='text'
                name='first_name'
                placeholder='First Name'
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'>
              <img src={person} alt='' className='icon'></img>
              <input
                type='text'
                name='last_name'
                placeholder='Last Name'
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {action === 'Sign Up' && (
          <div className='input'>
            <img src={email} alt='' className='icon'></img>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className='input'>
          {/* always rendered on login/signup actions */}
          <img src={person} alt='' className='icon'></img>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className='input'>
          {/* always rendered on login/signup actions */}
          <img src={password} alt='' className='icon'></img>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {action === 'Sign Up' && (
          // only rendered on signup
          <div className='input'>
            <img src={password} alt='' className='icon'></img>
            <input
              type='password'
              name='password2'
              placeholder='Confirm password'
              value={formData.password2}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      {action === 'Login' && (
        <div className='forgot-password'>
          {/* only rendered on login */}
          Lost Password? <span> Click Here </span>
        </div>
        // if action is login and user forgot password, render element for password change
      )}

      <div className='submit-container'>
        {/* div element for the submit or back options 
        always rendered on login or signup*/}
        <div className='submit' onClick={handleSubmit}>
          {action === 'Sign Up' ? 'Register' : 'Login'}
        </div>
        <div className='submit gray' onClick={() => navigateTo('')}>
          Back
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
