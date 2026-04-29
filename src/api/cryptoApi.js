/**
 * Cryptocurrency API Helper
 * Functions for fetching and managing cryptocurrencies
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
    // Unauthorized
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
 * Get all cryptocurrencies (paginated)
 */
export async function getAllCrypto(page = 1, limit = 10) {
  return apiCall(`/crypto?page=${page}&limit=${limit}`);
}

/**
 * Get top gainers
 */
export async function getGainers(limit = 10) {
  return apiCall(`/crypto/gainers?limit=${limit}`);
}

/**
 * Get new listings
 */
export async function getNewListings(limit = 10) {
  return apiCall(`/crypto/new?limit=${limit}`);
}

/**
 * Get single cryptocurrency by ID
 */
export async function getCryptoById(id) {
  return apiCall(`/crypto/${id}`);
}

/**
 * Add new cryptocurrency (requires authentication)
 */
export async function addCrypto(cryptoData) {
  return apiCall('/crypto', {
    method: 'POST',
    body: JSON.stringify(cryptoData),
  });
}
