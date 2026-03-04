export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = (): string | null => localStorage.getItem('accessToken');
export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

export const removeTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
