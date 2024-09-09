// Login.js
import React, { useState, useEffect } from 'react';
import basestyle from '../Base.module.css';
import loginstyle from './Login.module.css';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      error.email = 'Please enter a valid email address';
    }
    if (!values.password) {
      error.password = 'Password is required';
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post('http://localhost:3000/login', user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        navigate('/', { replace: true });
      });
    }
  }, [formErrors]);

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('http://localhost:9002/google-login', { token: credential });
      setUserState(res.data.user);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google Sign-In failed', error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In failed', error);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',  // Full viewport height
        textAlign: 'center',
      }}
    >
      <div style={{ width: '300px' }}> {/* Center the inner content */}
        <h1>Login</h1>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
            style={{ marginBottom: '10px', width: '100%' }} 
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
            style={{ marginBottom: '10px', width: '100%' }} 
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button 
            className={basestyle.button_common} 
            onClick={loginHandler}
            style={{ width: '100%' }}  
          >
            Login
          </button>
        </form>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          style={{ marginTop: '20px' }}  
        />
        <NavLink to="/signup" style={{ marginTop: '20px', color: 'black' }}>
          Not yet registered? Register Now
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
