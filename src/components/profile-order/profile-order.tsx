import { OrderCard } from '@/components/feed/components/order-card/order-card';
import { FEED_ORDERS } from '@/components/feed/feed.data';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './profile-order.module.css';

export const ProfileOrder = (): React.JSX.Element => {
  const location = useLocation();

  return (
    <section className={styles.wrapper}>
      <ul className={`custom-scroll ${styles.list}`}>
        {FEED_ORDERS.map((order) => (
          <li key={order.orderNumber} className={styles.item}>
            <NavLink
              to={`/profile/orders/${order.orderNumber}`}
              state={{ modal: location }}
              className={styles.card_link}
            >
              <OrderCard
                orderNumber={order.orderNumber}
                timeLabel={order.timeLabel}
                name={order.name}
                ingredients={order.ingredients}
                price={order.price}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileOrder;
