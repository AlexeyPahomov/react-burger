import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageWrapper title="Вход">
      <Input
        onChange={({ target }) => setLogin(target.value)}
        value={login}
        placeholder="E-mail"
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        placeholder="Пароль"
        extraClass="mb-6"
      />
      <Button
        onClick={() => navigate('/profile') as void}
        disabled={!login || !password}
        htmlType="button"
        extraClass="mb-20"
      >
        Войти
      </Button>
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
