import { Logo } from '@krgaa/react-developer-burger-ui-components';

import HeaderLink from './components/header-link/header-link';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <HeaderLink title="Конструктор" to="/" icon="burger" />
          <HeaderLink title="Лента заказов" to="/feed" icon="list" extraClass="ml-10" />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <HeaderLink
          title="Личный кабинет"
          to="/profile"
          icon="profile"
          extraClass={styles.link_position_last}
        />
      </nav>
    </header>
  );
};
