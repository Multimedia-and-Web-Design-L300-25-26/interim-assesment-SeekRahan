/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Redirects to signin if user is not authenticated
 */
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user has auth token in cookie or localStorage
    const checkAuth = async () => {
      try {
        // Check if authToken cookie exists
        const hasCookie = document.cookie.includes('authToken');
        // Alternative: check localStorage if you store token there too
        const hasLocalToken = localStorage.getItem('authToken');

        if (hasCookie || hasLocalToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
