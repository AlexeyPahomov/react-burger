import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useForm } from '@/hooks/useForm';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { useLoginMutation } from '@/services/auth/api';
import { getFromPath } from '@/utils/fromPath';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const LoginPage = (): React.JSX.Element => {
  useRedirectIfAuth();

  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: '', password: '' });
  const { email, password } = values;

  const [login] = useLoginMutation();
  const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        const from = getFromPath();
        navigate(from) as void;
      })
      .catch((error) => {
        console.error('Ошибка авторизации:', error);
      });
  };

  return (
    <PageWrapper title="Вход">
      <form onSubmit={loginUser}>
        <Input
          onChange={handleChange}
          value={values.email}
          placeholder="E-mail"
          extraClass="mb-6"
          name="email"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          placeholder="Пароль"
          extraClass="mb-6"
          name="password"
        />
        <Button
          disabled={!values.email || !values.password}
          htmlType="submit"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <TextLink
        text="Вы новый пользователь?"
        title="Зарегистрироваться"
        link="/register"
      />
      <TextLink
        text="Забыли пароль?"
        title="Восстановить пароль"
        link="/forgot-password"
      />
    </PageWrapper>
  );
};
export default LoginPage;
