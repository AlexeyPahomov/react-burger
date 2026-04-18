import App from '@/components/app/app';
import IngredientDetailsModal from '@/components/ingredient-details-modal/ingredient-details-modal';
import OrderDetailsModal from '@/components/order-details-modal/order-details-modal';
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
  FeedPage,
} from '@/pages';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
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
        element: (
          <ProtectedRoute>
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
            children: [
              {
                path: ':id',
                element: <OrderDetailsModal />,
              },
            ],
          },
        ],
      },
      {
        path: 'feed',
        element: <FeedPage />,
        children: [
          {
            path: ':id',
            element: <OrderDetailsModal />,
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
