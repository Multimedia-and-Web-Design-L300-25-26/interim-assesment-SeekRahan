/**
 * Authentication API Helper
 * Functions for user authentication and profile
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper
 */
async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    // Unauthorized - redirect to login
    window.location.href = '/signin';
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Register new user
 */
export async function register(firstName, lastName, email, password) {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
}

/**
 * Login user
 */
export async function login(email, password) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Logout user
 */
export async function logout() {
  return apiCall('/auth/logout', { method: 'GET' });
}

/**
 * Get current user profile (protected)
 */
export async function getProfile() {
  return apiCall('/profile', { method: 'GET' });
}
