import Cookies from 'js-cookie';
import fetchUserProfile from './fetchUserProfile';

export const handleLogout = async () => {
  const token = Cookies.get('authToken');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    if (response.ok) {
      Cookies.remove('authToken');
      return true;
    } else {
      console.error('Failed to Log out');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const checkAuth = async (setIsAuthenticated, setUser) => {
  const token = Cookies.get('authToken');
  if (token) {
    const userData = await fetchUserProfile();
    if (userData) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
    }
  }
};
