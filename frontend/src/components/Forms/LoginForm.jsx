import { memo } from 'react';
import { Input, Button } from '@/components/UI';
import { useForm } from '@/hooks';
import { validateForm } from '@/utils';
import { loginSchema } from '@/schemas';
import { notificationService } from '@/services';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';

/**
 * LoginForm Component
 */
const LoginForm = memo(() => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    { email: '', password: '' },
    async (data) => {
      // Validate
      const validationErrors = validateForm(data, loginSchema);
      if (Object.keys(validationErrors).length > 0) {
        throw { response: { data: { errors: validationErrors } } };
      }

      // Login
      await login(data.email, data.password);
      navigate('/');
    }
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Đăng Nhập</h2>

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
        fullWidth
        className="mb-4"
      />

      <Input
        label="Mật Khẩu"
        type="password"
        name="password"
        placeholder="••••••"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        required
        fullWidth
        className="mb-6"
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        className="mb-4"
      >
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
      </Button>

      <p className="text-center text-sm">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </form>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
