import { profileMenu } from '@/utils/constants';
import { useLocation } from 'react-router-dom';

import styles from './menu.module.css';

export const Menu = (): React.JSX.Element => {
  const location = useLocation();
  const activeLink = (path: string): string =>
    location.pathname === path ? styles.active : '';

  return (
    <div className={styles.menu}>
      <nav>
        {profileMenu.map(({ id, title, href }) => (
          <a href={href} key={id} className={`${styles.link} ${activeLink(href)}`}>
            <span className="text text_type_main-medium">{title}</span>
          </a>
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
