import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './useAuth';

export const useRedirectIfAuth = (redirectTo = '/'): void => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(redirectTo, { replace: true }) as void;
    }
  }, [isAuth, navigate, redirectTo]);
};
