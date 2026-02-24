import { profileMenu } from '@/utils/constants';
import { NavLink } from 'react-router-dom';

import styles from './menu.module.css';

export const Menu = (): React.JSX.Element => {
  return (
    <div className={styles.menu}>
      <nav>
        {profileMenu.map(({ id, title, to }) => (
          <NavLink
            to={to}
            key={id}
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <span className="text text_type_main-medium">{title}</span>
          </NavLink>
        ))}
      </nav>
      <div className={`${styles.link}`}>
        <span className="text text_type_main-medium">Выход</span>
      </div>
      <p className="mt-20 text text_type_main-default">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};
