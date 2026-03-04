import { useGetUserQuery } from '@/services/auth/api';

import type { TUser } from '@/utils/types';

type UseAuthResult = {
  user: TUser | undefined;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
};

export const useAuth = (): UseAuthResult => {
  const { data: user, isLoading, isSuccess, isError } = useGetUserQuery();
  return {
    user,
    isAuth: isSuccess && !!user,
    isLoading,
    isError,
  };
};
