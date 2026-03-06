import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { useResetPasswordMutation } from '@/services/auth/api';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage = (): React.JSX.Element => {
  useRedirectIfAuth();

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('passwordResetFlag')) {
      navigate('/forgot-password') as void;
    }
  }, [navigate]);

  const [resetPassword] = useResetPasswordMutation();
  const onResetPassword = (): void => {
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
      <PasswordInput
        value={password}
        placeholder="Введите новый пароль"
        onChange={({ target }) => setPassword(target.value)}
        extraClass="mb-6"
      />
      <Input
        value={token}
        placeholder="Введите код из письма"
        onChange={({ target }) => setToken(target.value)}
        extraClass="mb-6"
      />
      <Button
        onClick={onResetPassword}
        disabled={!password || !token}
        htmlType="button"
        extraClass="mb-20"
      >
        Сохранить
      </Button>
      <TextLink text="Вспомнили пароль?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default ResetPasswordPage;
