import { OrderDetail } from '@/components/feed/components/order-detail/order-detail';
import { FEED_ORDERS } from '@/components/feed/feed.data';
import { Modal } from '@/components/modal/modal';
import { useLocation, useNavigate, useParams, type Location } from 'react-router-dom';

export const OrderDetailsModal = (): React.JSX.Element => {
  const { id } = useParams();
  const order = FEED_ORDERS.find((item) => item.orderNumber === id) ?? FEED_ORDERS[0];

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { modal?: Location } | null;

  const closeModal = (): void => {
    if (state?.modal) {
      navigate(-1) as void;
      return;
    }

    if (location.pathname.startsWith('/profile/orders')) {
      navigate('/profile/orders') as void;
      return;
    }

    navigate('/feed') as void;
  };

  return (
    <Modal onClose={() => closeModal()}>
      <OrderDetail order={order} />
    </Modal>
  );
};

export default OrderDetailsModal;
