import { setFromPath } from '@/utils/fromPath';
import { getAccessToken } from '@/utils/tokens';
import { redirect } from 'react-router-dom';

export function profileLoader(): Response | null {
  const token = getAccessToken();
  if (!token) {
    setFromPath(window.location.pathname);
    return redirect('/login');
  }
  return null;
}
