import ProfileOrder from '@/components/profile-order/profile-order';
import { Outlet } from 'react-router-dom';

export const ProfileOrderPage = (): React.JSX.Element => {
  return (
    <>
      <ProfileOrder />
      <Outlet />
    </>
  );
};
export default ProfileOrderPage;
