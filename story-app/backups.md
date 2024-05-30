import React, { useState } from 'react';
import './LoginSignup.css';

import email from '../Assets/email.png';
import password from '../Assets/password.png';
import person from '../Assets/person.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className='input'>
            <img src={person} alt=''></img>
            <input type='text' placeholder='Name'></input>
          </div>
        )}

        <div className='input'>
          <img src={email} alt=''></img>
          <input type='email' placeholder='Email id'></input>
        </div>
        <div className='input'>
          <img src={password} alt=''></img>
          <input type='password' placeholder='password'></input>
        </div>
      </div>
      {action === 'Sign Up' ? (
        <div></div>
      ) : (
        <div className='forgot-password'>
          Lost Password?<span>Click Here</span>
        </div>
      )}

      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit' : 'submit gray'}
          onClick={() => {
            setAction('Login');
          }}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit ' : 'submit gray'}
          onClick={() => {
            setAction('Sign Up');
          }}
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
