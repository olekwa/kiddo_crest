import React, { useState } from 'react';
import './LoginSignup.css';

import email from '../Assets/email.png';
import password from '../Assets/password.png';
import person from '../Assets/person.png';

const LoginSignup = () => {
const [action, setAction] = useState('Sign Up');
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
const url =
action === 'Sign Up'
? 'http://127.0.0.1:8000/api/v1/register'
: 'http://127.0.0.1:8000/api/v1/auth/login';
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
try {
const response = await fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(payload),
});
const data = await response.json();
console.log(data);
} catch (error) {
//pass
console.error('Error:', error);
}
};

return (
<div className='container'>
<div className='header'>
<div className='text'>{action}</div>
<div className='underline'></div>
</div>
<div className='inputs'>
{action === 'Sign Up' && (
<>
<div className='input'>
<img src={person} alt=''></img>
<input
                type='text'
                name='first_name'
                placeholder='First Name'
                value={formData.first_name}
                onhange={handleInputChange}
              />
</div>

            <div className='input'>
              <img src={person} alt=''></img>
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
        <div className='input'>
          <img src={email} alt=''></img>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='input'>
          <img src={person} alt=''></img>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className='input'>
          <img src={password} alt=''></img>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {action === 'Sign Up' && (
          <div className='input'>
            <img src={password} alt=''></img>
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
          Lost Password? <span> Click Here </span>
        </div>
      )}
      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => setAction('Sign Up')}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray ' : 'submit'}
          onClick={() => {
            setAction('Login');
            handleSubmit();
          }}
        >
          Log in
        </div>
      </div>
    </div>

);
};
export default LoginSignup;
