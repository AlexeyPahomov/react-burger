import {
  HomePage,
  LoginPage,
  ErrorPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileOrderPage,
  UserPage,
} from '@/pages';
import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<UserPage />} />
          <Route path="orders" element={<ProfileOrderPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
