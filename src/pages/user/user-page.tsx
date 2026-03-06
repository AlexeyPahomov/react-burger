import { useGetUserQuery, useUpdateUserMutation } from '@/services/auth/api';
import { Button, Input, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './user-page.module.css';

export const UserPage = (): React.JSX.Element => {
  const [initialState, setInitialState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: user } = useGetUserQuery();
  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setName(name);
      setEmail(email);
      setPassword('');
      setInitialState({ name, email, password: '' });
    }
  }, [user]);

  const hasChanges =
    initialState.email !== email ||
    initialState.name !== name ||
    initialState.password !== password;

  const resetChanges = (): void => {
    setName(initialState.name);
    setEmail(initialState.email);
    setPassword(initialState.password);
  };

  const [updateUser] = useUpdateUserMutation();
  const applyChanges = (): void => {
    updateUser({ email, name, password })
      .then()
      .catch((error) => {
        console.error('Ошибка обновления данных пользователя:', error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <Input
        icon="EditIcon"
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="Имя"
      />
      <EmailInput
        isIcon
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="Логин"
      />
      <Input
        icon="EditIcon"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Пароль"
      />
      {hasChanges && (
        <div className={`${styles.actions}`}>
          <Button onClick={resetChanges} type="secondary" htmlType="button">
            Отмена
          </Button>
          <Button onClick={applyChanges} htmlType="button">
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};
export default UserPage;
