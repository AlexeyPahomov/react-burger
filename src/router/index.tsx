import App from '@/components/app/app';
import IngredientDetailsModal from '@/components/ingredient-details-modal/ingredient-details-modal';
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
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'ingredients/:id',
            element: <IngredientDetailsModal />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        children: [
          {
            path: '',
            element: <UserPage />,
          },
          {
            path: 'orders',
            element: <ProfileOrderPage />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
