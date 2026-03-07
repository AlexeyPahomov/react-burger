import { useLogoutMutation } from '@/services/auth/api';
import { profileMenu } from '@/utils/constants';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './menu.module.css';

export const Menu = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const onLogout = (): void => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/login') as void;
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <div onClick={onLogout} className={`${styles.link}`}>
        <span className="text text_type_main-medium">Выход</span>
      </div>
      <p className="mt-20 text text_type_main-default">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};
