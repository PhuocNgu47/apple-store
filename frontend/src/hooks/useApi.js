import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook để xử lý API calls với loading và error states
 * @param {function} apiCall - API call function
 */
export const useApi = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall(...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
};

export default useApi;
