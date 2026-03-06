import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { useForm } from '@/hooks/useForm';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { useRegisterMutation } from '@/services/auth/api';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

export const RegisterPage = (): React.JSX.Element => {
  useRedirectIfAuth();

  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const { name, email, password } = values;

  const [register] = useRegisterMutation();
  const registerUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    register({ email, password, name })
      .unwrap()
      .then()
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
  };

  return (
    <PageWrapper title="Регистрация">
      <form onSubmit={registerUser}>
        <Input
          value={name}
          placeholder="Имя"
          name="name"
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Input
          value={email}
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          extraClass="mb-6"
        />
        <PasswordInput
          value={password}
          onChange={handleChange}
          name="password"
          extraClass="mb-6"
        />
        <Button
          disabled={!name || !email || !password}
          htmlType="submit"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <TextLink text="Уже зарегистрированы?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default RegisterPage;
