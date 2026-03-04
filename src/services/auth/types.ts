import type { TUser } from '@/utils/types';

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
