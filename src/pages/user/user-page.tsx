import { useForm } from '@/hooks/useForm';
import { useGetUserQuery, useUpdateUserMutation } from '@/services/auth/api';
import { Button, Input, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './user-page.module.css';

export const UserPage = (): React.JSX.Element => {
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = values;
  const [initialState, setInitialState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { data: user } = useGetUserQuery();
  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setValues({ name, email, password: '' });
      setInitialState({ name, email, password: '' });
    }
  }, [user]);

  const hasChanges =
    initialState.email !== email ||
    initialState.name !== name ||
    initialState.password !== password;

  const resetChanges = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setValues({ ...initialState });
  };

  const [updateUser] = useUpdateUserMutation();
  const applyChanges = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    updateUser({ email, name, password })
      .then()
      .catch((error) => {
        console.error('Ошибка обновления данных пользователя:', error);
      });
  };

  return (
    <form onSubmit={applyChanges} onReset={resetChanges} className={styles.wrapper}>
      <Input
        icon="EditIcon"
        value={name}
        name="name"
        onChange={handleChange}
        placeholder="Имя"
      />
      <EmailInput
        isIcon
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="Логин"
      />
      <Input
        icon="EditIcon"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Пароль"
      />
      {hasChanges && (
        <div className={`${styles.actions}`}>
          <Button type="secondary" htmlType="reset">
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      )}
    </form>
  );
};
export default UserPage;
