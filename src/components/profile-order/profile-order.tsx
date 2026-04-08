import { OrderCard } from '@/components/feed/components/order-card/order-card';
import { useIngredients } from '@/hooks/useIngredients';
import { useGetProfileOrdersQuery } from '@/services/orders/api';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import type { TOrderCardProps } from '@/components/feed/components/order-card/order-card';

import styles from './profile-order.module.css';

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

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

const getStatusLabel = (status: string): string => {
  if (status === 'done') {
    return 'Выполнен';
  }

  if (status === 'pending') {
    return 'Готовится';
  }

  return 'Создан';
};

export const ProfileOrder = (): React.JSX.Element => {
  const location = useLocation();
  const { getIngredient } = useIngredients();
  const { data } = useGetProfileOrdersQuery();

  const orders = useMemo<TOrderCardProps[]>(() => {
    const sourceOrders = data?.orders ?? [];

    return sourceOrders.map((order) => {
      const ingredients = order.ingredients
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

      return {
        orderNumber: String(order.number).padStart(6, '0'),
        timeLabel: getTimeLabel(order.createdAt),
        name: order.name ?? 'Соберите бургер',
        ingredients,
        totalPrice: ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
        statusLabel: getStatusLabel(order.status),
        statusType:
          order.status === 'done'
            ? 'done'
            : order.status === 'pending'
              ? 'pending'
              : 'created',
      };
    });
  }, [data?.orders, getIngredient]);

  return (
    <section className={styles.wrapper}>
      <ul className={`custom-scroll ${styles.list}`}>
        {orders.map((order) => (
          <li key={order.orderNumber} className={styles.item}>
            <NavLink
              to={`/profile/orders/${order.orderNumber}`}
              state={{ modal: location, order }}
              className={styles.card_link}
            >
              <OrderCard
                orderNumber={order.orderNumber}
                timeLabel={order.timeLabel}
                name={order.name}
                ingredients={order.ingredients}
                statusLabel={order.statusLabel}
                statusType={order.statusType}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileOrder;
