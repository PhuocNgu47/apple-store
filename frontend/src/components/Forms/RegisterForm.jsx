import { memo } from 'react';
import { Input, Button } from '@/components/UI';
import { useForm } from '@/hooks';
import { validateForm } from '@/utils';
import { registerSchema } from '@/schemas';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';

/**
 * RegisterForm Component
 */
const RegisterForm = memo(() => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    async (data) => {
      // Validate
      const validationErrors = validateForm(data, registerSchema);
      if (Object.keys(validationErrors).length > 0) {
        throw { response: { data: { errors: validationErrors } } };
      }

      // Check password match
      if (data.password !== data.confirmPassword) {
        throw {
          response: { data: { errors: { confirmPassword: 'Mật khẩu không trùng khớp' } } },
        };
      }

      // Register
      await register(data);
      navigate('/');
    }
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Đăng Ký</h2>

      <Input
        label="Tên Đầy Đủ"
        type="text"
        name="name"
        placeholder="Nguyễn Văn A"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        required
        fullWidth
        className="mb-4"
      />

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
        className="mb-4"
      />

      <Input
        label="Xác Nhận Mật Khẩu"
        type="password"
        name="confirmPassword"
        placeholder="••••••"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        fullWidth
        className="mb-4"
      />

      <Input
        label="Số Điện Thoại"
        type="tel"
        name="phone"
        placeholder="0123456789"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        fullWidth
        className="mb-6"
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        className="mb-4"
      >
        {isSubmitting ? 'Đang đăng ký...' : 'Đăng Ký'}
      </Button>

      <p className="text-center text-sm">
        Đã có tài khoản?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </a>
      </p>
    </form>
  );
});

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
