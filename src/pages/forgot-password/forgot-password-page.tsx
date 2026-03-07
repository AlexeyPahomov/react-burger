import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useForm } from '@/hooks/useForm';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { useForgotPasswordMutation } from '@/services/auth/api';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = (): React.JSX.Element => {
  useRedirectIfAuth();

  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: '', password: '' });
  const { email } = values;

  const [forgotPassword] = useForgotPasswordMutation();
  const recoverPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
      <form onSubmit={recoverPassword}>
        <Input
          value={email}
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Button disabled={!email} htmlType="submit" extraClass="mb-20">
          Восстановить
        </Button>
      </form>
      <TextLink text="Вспомнили пароль?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default ForgotPasswordPage;
