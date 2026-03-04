import { useLocation } from 'react-router-dom';

export const useFromPath = (path = '/'): { from: string } => {
  const location = useLocation();
  const state = location.state as { from?: Location } | null;
  const from = state?.from ? state.from?.pathname : path;

  return { from };
};
