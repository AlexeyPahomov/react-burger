import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useForgotPasswordMutation } from '@/services/auth/api';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [forgotPassword] = useForgotPasswordMutation();
  const recoverPassword = (): void => {
    forgotPassword({ email })
      .unwrap()
      .then(() => {
        localStorage.setItem('passwordResetFlag', 'true');
        navigate('/profile') as void;
      })
      .catch((error) => {
        console.error('Ошибка восстановления пароля:', error);
      });
  };

  return (
    <PageWrapper title="Восстановление пароля">
      <Input
        value={email}
        placeholder="E-mail"
        onChange={({ target }) => setEmail(target.value)}
        extraClass="mb-6"
      />
      <Button
        onClick={recoverPassword}
        disabled={!email}
        htmlType="button"
        extraClass="mb-20"
      >
        Восстановить
      </Button>
      <TextLink text="Вспомнили пароль?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default ForgotPasswordPage;
