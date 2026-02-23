import PageWrapper from '@/components/page-wrapper/page-wrapper';
import TextLink from '@/components/text-link/text-link';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <PageWrapper title="Восстановление пароля">
      <Input
        value={email}
        placeholder="E-mail"
        onChange={({ target }) => setEmail(target.value)}
        extraClass="mb-6"
      />
      <Button
        onClick={() => navigate('/reset-password') as void}
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
