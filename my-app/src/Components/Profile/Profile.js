import React from "react";
import basestyle from "../Base.module.css";

const Profile = ({ setUserState, username, profileImage }) => {
  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <img src={profileImage} alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
      <button
        className={basestyle.button_common}
        onClick={() => setUserState({})}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
