import { useGetUserQuery } from '@/services/auth/api';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  useGetUserQuery();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default App;
