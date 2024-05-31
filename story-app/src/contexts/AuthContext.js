import React, { createContext, useState, useEffect } from 'react';
import { checkAuth, handleLogout } from '../utils/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth(setIsAuthenticated, setUser);
  }, []);

  const logout = async () => {
    const success = await handleLogout();
    if (success) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
