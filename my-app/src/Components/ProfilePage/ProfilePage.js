// ProfilePage.js
import React from 'react';
import basestyle from '../Base.module.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ setUserState, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserState(null);
    navigate('/login');
  };

  return (
    <div 
      className="profile" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        textAlign: 'center'
      }}
    >
      <h1 style={{ color: 'black' }}>Welcome {user.fname}!</h1>
      <img
        src={user.profileImage}
        alt="Profile"
        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
      />
      <p style={{ color: 'black' }}>You are successfully logged in!</p>
      <button
        className={basestyle.button_common}
        onClick={handleLogout}
        style={{
          width: '100px',  // Sets a specific width to make the button narrower
          height: 'auto',  // Maintains the height as automatic based on padding
          padding: '10px', // Keeps the padding for height consistency
          fontSize: '14px', // Keeps the text readable
          marginTop: '10px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
