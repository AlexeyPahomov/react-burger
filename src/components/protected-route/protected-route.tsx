import { useAuth } from '@/hooks/useAuth';
import { useFromPath } from '@/hooks/useFromPath';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate } from 'react-router-dom';

import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  requireAuth = true,
}: ProtectedRouteProps): React.JSX.Element => {
  const { isAuth, isLoading } = useAuth();
  const { from } = useFromPath();

  if (isLoading) {
    return <Preloader />;
  }

  if (requireAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuth) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
