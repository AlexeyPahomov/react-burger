import { setTokens, removeTokens } from '@/utils/tokens';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithRefresh } from './baseQueryWithRefresh';

import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './types';
import type { TUser } from '@/utils/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Регистрация
    register: builder.mutation<TUser, RegisterRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: AuthResponse) => {
        const { accessToken, refreshToken, user } = response;
        setTokens(accessToken, refreshToken);
        return user;
      },
      invalidatesTags: ['User'],
    }),

    // Авторизация
    login: builder.mutation<TUser, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: AuthResponse) => {
        const { accessToken, refreshToken, user } = response;
        setTokens(accessToken, refreshToken);
        return user;
      },
      invalidatesTags: ['User'],
    }),

    // Выход
    logout: builder.mutation<LogoutResponse, void>({
      query: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return {
          url: 'auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        };
      },
      transformResponse: (response: LogoutResponse) => {
        removeTokens();
        return response;
      },
      invalidatesTags: ['User'],
    }),

    // Пользователь
    getUser: builder.query<TUser, void>({
      query: () => 'auth/user',
      transformResponse: (response: { success: boolean; user: TUser }) => response.user,
      providesTags: ['User'],
    }),

    // Обновление пользователя
    updateUser: builder.mutation<
      TUser,
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: JSON.stringify(userData),
      }),
      transformResponse: (response: { success: boolean; user: TUser }) => response.user,
      invalidatesTags: ['User'],
    }),

    // Восстановление пароля
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: 'password-reset',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),

    // Сброс пароля
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
