import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useRegisterMutation } from '@/services/auth/api';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

export const RegisterPage = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register] = useRegisterMutation();
  const registerUser = (): void => {
    register({ email, password, name })
      .unwrap()
      .then()
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
  };

  return (
    <PageWrapper title="Регистрация">
      <Input
        value={name}
        placeholder="Имя"
        onChange={({ target }) => setName(target.value)}
        extraClass="mb-6"
      />
      <Input
        value={email}
        placeholder="E-mail"
        onChange={({ target }) => setEmail(target.value)}
        extraClass="mb-6"
      />
      <PasswordInput
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        extraClass="mb-6"
      />
      <Button
        onClick={registerUser}
        disabled={!name || !email || !password}
        htmlType="button"
        extraClass="mb-20"
      >
        Зарегистрироваться
      </Button>
      <TextLink text="Уже зарегистрированы?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default RegisterPage;
