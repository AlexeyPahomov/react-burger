import App from '@/components/app/app';
import IngredientDetailsModal from '@/components/ingredient-details-modal/ingredient-details-modal';
import ProtectedRoute from '@/components/protected-route/protected-route';
import { profileLoader } from '@/loaders/profile-loader';
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
        element: (
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRoute requireAuth={false}>
            <ForgotPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectedRoute requireAuth={false}>
            <ResetPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute requireAuth>
            <ProfilePage />
          </ProtectedRoute>
        ),
        loader: profileLoader,
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
