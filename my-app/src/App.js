// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  const [userState, setUserState] = useState(null);

  return (
    <GoogleOAuthProvider clientId="802852813018-k29a6gd2rd0e71na3umbjnjfdgiqorak.apps.googleusercontent.com">
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                userState ? (
                  <ProfilePage setUserState={setUserState} user={userState} />
                ) : (
                  <Login setUserState={setUserState} />
                )
              }
            />
            <Route
              path="/login"
              element={<Login setUserState={setUserState} />}
            />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
