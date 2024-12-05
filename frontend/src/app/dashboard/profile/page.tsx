'use client';

import { useEffect, useState } from 'react';
import useAuthenticatedAxios from '@/hooks/useAuthenticatedAxios'; // Adjust the path based on your setup

const ProfilePage = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await makeAuthenticatedRequest('/api/user', 'GET'); // Call proxy API route
        setUserInfo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [makeAuthenticatedRequest]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <div className="space-y-2">
        <p><strong>First Name:</strong> {userInfo.FirstName}</p>
        <p><strong>Last Name:</strong> {userInfo.LastName}</p>
        <p><strong>Email:</strong> {userInfo.Email}</p>
        <p><strong>City:</strong> {userInfo.City || 'N/A'}</p>
        <p><strong>Slogan:</strong> {userInfo.Slogan || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
