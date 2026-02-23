import { Menu, UserData } from './components';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  return (
    <div className={styles.profile}>
      <Menu />
      <UserData />
    </div>
  );
};
export default Profile;
