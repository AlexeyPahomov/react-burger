import { NavLink, useLocation } from 'react-router-dom';

import { FeedBoard } from './components/feed-board/feed-board';
import { OrderCard } from './components/order-card/order-card';
import { FEED_BOARD_MOCK, FEED_ORDERS } from './feed.data';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const location = useLocation();

  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large mb-6">Лента заказов</h1>
      <div className={`${styles.feed_row}`}>
        <div className={`${styles.cards_column}`}>
          <ul className={`custom-scroll ${styles.cards} mr-2`}>
            {FEED_ORDERS.map((order) => (
              <li key={order.orderNumber} className={`${styles.card_row}`}>
                <NavLink
                  to={`/feed/${order.orderNumber}`}
                  state={{ modal: location }}
                  className={`${styles.card_link}`}
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
        </div>
        <div className={`${styles.board_slot}`}>
          <FeedBoard
            readyOrderNumbers={FEED_BOARD_MOCK.readyOrderNumbers}
            inProgressOrderNumbers={FEED_BOARD_MOCK.inProgressOrderNumbers}
            totalCompleted={FEED_BOARD_MOCK.totalCompleted}
            completedToday={FEED_BOARD_MOCK.completedToday}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
