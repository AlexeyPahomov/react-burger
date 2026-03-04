import { baseUrl } from '@/utils/constants';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from '@/utils/tokens';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  prepareHeaders: (headers, { endpoint }) => {
    if (endpoint === 'login' || endpoint === 'register') return headers;

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set('authorization', accessToken);
    }
    return headers;
  },
});

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: 'auth/token',
          method: 'POST',
          body: { token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        setTokens(accessToken, newRefreshToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        removeTokens();
      }
    } else {
      removeTokens();
    }
  }

  return result;
};
