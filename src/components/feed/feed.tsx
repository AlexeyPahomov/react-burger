import { useIngredients } from '@/hooks/useIngredients';
import { useGetFeedOrdersQuery } from '@/services/orders/api';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { FeedBoard } from './components/feed-board/feed-board';
import { OrderCard, type TOrderCardProps } from './components/order-card/order-card';

import type { TFeedWsResponse } from '@/utils/types';

import styles from './feed.module.css';

const maxColumnsPerStatus = 2;
const maxRowsPerColumn = 10;

const getTimeLabel = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  if (isToday) {
    return `Сегодня, ${time}`;
  }

  if (isYesterday) {
    return `Вчера, ${time}`;
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

const buildStatusColumns = (numbers: string[]): string[][] => {
  const maxItems = maxColumnsPerStatus * maxRowsPerColumn;
  const limited = numbers.slice(0, maxItems);

  return Array.from({ length: maxColumnsPerStatus }, (_, index) =>
    limited.slice(index * maxRowsPerColumn, (index + 1) * maxRowsPerColumn)
  ).filter((column) => column.length > 0);
};

export const Feed = (): React.JSX.Element => {
  const location = useLocation();
  const { getIngredient } = useIngredients();
  const { data: feedOrdersData } = useGetFeedOrdersQuery();
  const wsData: TFeedWsResponse = feedOrdersData ?? {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
  };

  const orderCards = useMemo<TOrderCardProps[]>(() => {
    return wsData.orders.map((order) => {
      const orderIngredients = order.ingredients
        .map((ingredientId) => {
          const ingredient = getIngredient(ingredientId);
          if (!ingredient) {
            return null;
          }

          return {
            id: ingredient._id,
            image: ingredient.image,
            name: ingredient.name,
            price: ingredient.price,
          };
        })
        .filter(
          (ingredient): ingredient is NonNullable<typeof ingredient> =>
            ingredient !== null
        );

      const totalPrice = orderIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );

      return {
        orderNumber: String(order.number).padStart(6, '0'),
        timeLabel: getTimeLabel(order.createdAt),
        name: order.name ?? 'Соберите бургер',
        ingredients: orderIngredients,
        totalPrice,
      };
    });
  }, [getIngredient, wsData.orders]);

  const readyOrderNumbers = useMemo(
    () =>
      buildStatusColumns(
        wsData.orders
          .filter((order) => order.status === 'done')
          .map((order) => String(order.number).padStart(6, '0'))
      ),
    [wsData.orders]
  );

  const inProgressOrderNumbers = useMemo(
    () =>
      buildStatusColumns(
        wsData.orders
          .filter((order) => order.status === 'pending' || order.status === 'created')
          .map((order) => String(order.number).padStart(6, '0'))
      ),
    [wsData.orders]
  );

  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large mb-6">Лента заказов</h1>
      <div className={`${styles.feed_row}`}>
        <div className={`${styles.cards_column}`}>
          <ul className={`custom-scroll ${styles.cards} mr-2`}>
            {orderCards.map((order) => (
              <li key={order.orderNumber} className={`${styles.card_row}`}>
                <NavLink
                  to={`/feed/${order.orderNumber}`}
                  state={{ modal: location, order }}
                  className={`${styles.card_link}`}
                >
                  <OrderCard
                    orderNumber={order.orderNumber}
                    timeLabel={order.timeLabel}
                    name={order.name}
                    ingredients={order.ingredients}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.board_slot}`}>
          <FeedBoard
            readyOrderNumbers={readyOrderNumbers}
            inProgressOrderNumbers={inProgressOrderNumbers}
            totalCompleted={wsData.total}
            completedToday={wsData.totalToday}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
