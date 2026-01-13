import { useState, useEffect } from 'react';
import { userAPI } from '../../../api';
import toast from 'react-hot-toast';

/**
 * useProfile Hook
 * Custom hook để fetch và quản lý profile của user
 */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await userAPI.getProfile();
      setProfile(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Không thể tải thông tin profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await userAPI.updateProfile(formData);
      setProfile(response.data.user);
      toast.success('Cập nhật profile thành công!');
      return response.data.user;
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Cập nhật profile thất bại');
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile
  };
}

