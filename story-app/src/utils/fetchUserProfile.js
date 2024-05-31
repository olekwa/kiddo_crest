import Cookies from 'js-cookie';

const fetchUserProfile = async () => {
  const token = Cookies.get('authToken');
  if (!token) {
    console.error('Erorr: No authentication token found');
    return;
  }
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

export default fetchUserProfile;
