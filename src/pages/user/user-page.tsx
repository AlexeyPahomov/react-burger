import { EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './user-page.module.css';

export const UserPage = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.wrapper}>
      <EmailInput
        isIcon
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="Имя"
      />
      <EmailInput
        isIcon
        value={login}
        onChange={({ target }) => setLogin(target.value)}
        placeholder="Логин"
      />
      <EmailInput
        isIcon
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Пароль"
      />
    </div>
  );
};
export default UserPage;
