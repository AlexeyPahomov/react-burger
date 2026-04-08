import Feed from '@/components/feed/feed';
import { Outlet } from 'react-router-dom';

export const FeedPage = (): React.JSX.Element => {
  return (
    <>
      <Feed />
      <Outlet />
    </>
  );
};
export default FeedPage;
