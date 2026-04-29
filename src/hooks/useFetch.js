/**
 * useFetch Hook
 * A custom hook for handling data fetching with loading and error states
 *
 * @param {string} url - The URL to fetch from
 * @param {Object} options - Fetch options
 * @returns {Object} Data, loading state, error, and refetch function
 *
 * @example
 * const { data, loading, error, refetch } = useFetch('/api/coins')
 */

import { useState, useEffect, useCallback } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    // Only fetch if URL is provided
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetch;
