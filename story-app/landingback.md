import React from 'react';
import './LandingPage.css';
import backgroundpic from '../Assets/backgroundpic.png';

const LandingPage = ({ navigateTo }) => {
return (
<nav className='navbar'>
<div className='navbar-left'>
<div className='logo'>
<img src={backgroundpic} alt='' height='50%' width='10%'></img>
</div>
<h1 className='title'>KidoCrest</h1>
</div>
<div className='navbar-middle'>
<h1> contact us</h1>
</div>

      <div className='navbar-right'>
        <button onClick={() => navigateTo('Login')}>Login</button>
        <button onClick={() => navigateTo('Sign Up')}>Sign up</button>
      </div>
    </nav>

);
};
export default LandingPage;
