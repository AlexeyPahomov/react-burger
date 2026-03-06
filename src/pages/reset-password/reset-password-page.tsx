import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useForm } from '@/hooks/useForm';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { useResetPasswordMutation } from '@/services/auth/api';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage = (): React.JSX.Element => {
  useRedirectIfAuth();

  const navigate = useNavigate();

  const { values, handleChange } = useForm({ token: '', password: '' });
  const { token, password } = values;

  useEffect(() => {
    if (!localStorage.getItem('passwordResetFlag')) {
      navigate('/forgot-password') as void;
    }
  }, [navigate]);

  const [resetPassword] = useResetPasswordMutation();
  const onResetPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    resetPassword({ password, token })
      .unwrap()
      .then(() => {
        localStorage.removeItem('passwordResetFlag');
        navigate('/login') as void;
      })
      .catch((error) => {
        console.error('Ошибка восстановления пароля:', error);
      });
  };
  return (
    <PageWrapper title="Восстановление пароля">
      <form onSubmit={onResetPassword}>
        <PasswordInput
          value={password}
          placeholder="Введите новый пароль"
          name="password"
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Input
          value={token}
          name="token"
          placeholder="Введите код из письма"
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Button disabled={!password || !token} htmlType="submit" extraClass="mb-20">
          Сохранить
        </Button>
      </form>
      <TextLink text="Вспомнили пароль?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default ResetPasswordPage;
