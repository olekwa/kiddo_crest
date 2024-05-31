import React, { useEffect, useState } from 'react';
import fetchUserProfile from '../../utils/fetchUserProfile';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        setError('Failed to fetch user profile');
      }
    };
    getProfile();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile'>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Email:</strong>
        {profile.email}
      </p>
    </div>
  );
};
export default Profile;
