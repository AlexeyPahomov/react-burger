import { profileMenu } from '@/utils/constants';
import { useState } from 'react';

import styles from './menu.module.css';

export const Menu = (): React.JSX.Element => {
  const [active, setActive] = useState(profileMenu[0].id);

  return (
    <nav className={`${styles.menu}`}>
      <ul>
        {profileMenu.map(({ id, value }) => (
          <li
            onClick={() => setActive(id)}
            key={id}
            className={`text text_type_main-medium ${active === id ? styles.active : ''}`}
          >
            {value}
          </li>
        ))}
      </ul>
      <p className="mt-20 text text_type_main-default">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};
