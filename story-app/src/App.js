import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import LandingPage from './components/Login-Signup/LandingPage';
import LoginSignup from './components/Login-Signup/LoginSignup';
import Books from './components/Login-Signup/Books';
import Footer from './components/Login-Signup/Footer';
// import Profile from './components/Login-Signup/Profile';
// import fetchUserProfile from './utils/fetchUserProfile';
// import Cookies from 'js-cookie';
import { checkAuth, handleLogout } from './utils/authUtils';
// import { AuthProvider, AuthContext } from './contexts/AuthContext';

function App() {
  const [action, setAction] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePromptLogin = () => {
    alert('Please Login or Create an account to access this feature');
  };

  const navigateTo = useCallback((page) => {
    console.log('Navigating to:', page);
    setAction(page);
  }, []);

  useEffect(() => {
    console.log('App component mounted');
    checkAuth(setIsAuthenticated, setUser);
  }, []);

  const onLogout = useCallback(() => {
    handleLogout().then((success) => {
      if (success) {
        setIsAuthenticated(false);
        setUser(null);
        setAction('');
      }
    });
  }, []);
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUser(user);
    setAction('');
  };

  return (
    <div className='app'>
      <LandingPage
        navigateTo={navigateTo}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={onLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {action && (
        <LoginSignup
          action={action}
          navigateTo={navigateTo}
          onLogin={handleLogin}
        />
      )}
      {!action && (
        <Books
          searchTerm={searchTerm}
          isAuthenticated={isAuthenticated}
          onPromptLogin={handlePromptLogin}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
