import { useCallback } from 'react';
import { useAuthStore } from '../store';
import { authAPI } from '../api';
import toast from 'react-hot-toast';
import { MESSAGES } from '../constants';

/**
 * Custom hook để quản lý authentication
 */
export const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const logout = useAuthStore(state => state.logout);
  const isLoading = useAuthStore(state => state.isLoading);

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await authAPI.login({ email, password });
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success(MESSAGES.SUCCESS.LOGIN);
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || MESSAGES.ERROR.INVALID_CREDENTIALS);
        throw error;
      }
    },
    [setToken, setUser]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const response = await authAPI.register(userData);
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success(MESSAGES.SUCCESS.REGISTER);
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || MESSAGES.ERROR.SOMETHING_WENT_WRONG);
        throw error;
      }
    },
    [setToken, setUser]
  );

  const handleLogout = useCallback(() => {
    logout();
    toast.success(MESSAGES.SUCCESS.LOGOUT);
  }, [logout]);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout: handleLogout,
  };
};

export default useAuth;
