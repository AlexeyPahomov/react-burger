import { Outlet } from 'react-router-dom';

import { Menu } from './components';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  return (
    <div className={styles.profile}>
      <Menu />
      <Outlet />
    </div>
  );
};
export default Profile;
