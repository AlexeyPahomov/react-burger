import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  return (
    <PageWrapper title="Восстановление пароля">
      <PasswordInput
        value={password}
        placeholder="Введите новый пароль"
        onChange={({ target }) => setPassword(target.value)}
        extraClass="mb-6"
      />
      <Input
        value={code}
        placeholder="Введите код из письма"
        onChange={({ target }) => setCode(target.value)}
        extraClass="mb-6"
      />
      <Button disabled={!password || !code} htmlType="button" extraClass="mb-20">
        Сохранить
      </Button>
      <TextLink text="Вспомнили пароль?" title="Войти" link="/login" />
    </PageWrapper>
  );
};
export default ResetPasswordPage;
