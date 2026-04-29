/**
 * Profile Page
 * Protected route that displays current user's profile information
 * Only accessible to authenticated users
 *
 * @component
 * Route: /profile (protected)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { getProfile } from '../api/authApi';
import { logout } from '../api/authApi';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      if (response?.success) {
        setUser(response.data);
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError(err.message || 'Error loading profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('authToken');
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/signin');
    } catch (err) {
      setError('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-6">No user data available</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-500">View and manage your account information</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="md">
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card variant="featured">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <User size={40} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500 mb-6">{user.email}</p>
                <Button onClick={() => navigate('/')} variant="secondary" className="w-full">
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>

          {/* User Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <User size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="text-base font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <Mail size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="text-base font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Member Since</p>
                      <p className="text-base font-medium text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Statistics */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Account Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-600 font-medium mb-1">Status</p>
                    <p className="text-lg font-bold text-green-700">Active</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium mb-1">Account Type</p>
                    <p className="text-lg font-bold text-blue-700">Personal</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to trade?</h3>
          <p className="text-gray-600 mb-6">Explore our cryptocurrency marketplace</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => navigate('/explore')} variant="primary">
              Explore Cryptocurrencies
            </Button>
            <Button onClick={() => navigate('/')} variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
