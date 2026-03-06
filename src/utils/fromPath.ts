export const setFromPath = (value: string): void => {
  sessionStorage.setItem('fromPath', value);
};

export const getFromPath = (): string => {
  const from = sessionStorage.getItem('fromPath') ?? '/';
  sessionStorage.removeItem('fromPath');

  return from;
};
