import { useAuth } from '@/hooks/useAuth';
import { setFromPath } from '@/utils/fromPath';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, Navigate } from 'react-router-dom';

import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps): React.JSX.Element => {
  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuth) {
    setFromPath(location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
