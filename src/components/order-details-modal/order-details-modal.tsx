import { OrderDetail } from '@/components/feed/components/order-detail/order-detail';
import { Modal } from '@/components/modal/modal';
import { useIngredients } from '@/hooks/useIngredients';
import { useGetFeedOrdersQuery, useGetProfileOrdersQuery } from '@/services/orders/api';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams, type Location } from 'react-router-dom';

import type { TOrderCardProps } from '@/components/feed/components/order-card/order-card';
import type { TFeedOrder } from '@/utils/types';

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

export const OrderDetailsModal = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getIngredient } = useIngredients();
  const { data: feedData } = useGetFeedOrdersQuery();
  const { data: profileData } = useGetProfileOrdersQuery();
  const state = location.state as { modal?: Location; order?: TOrderCardProps } | null;
  const sourceOrders = location.pathname.startsWith('/profile/orders')
    ? (profileData?.orders ?? [])
    : (feedData?.orders ?? []);
  const socketOrder = sourceOrders.find(
    (item: TFeedOrder) => String(item.number).padStart(6, '0') === id
  );
  const orderFromSocket = useMemo<TOrderCardProps | null>(() => {
    if (!socketOrder) {
      return null;
    }

    const ingredients = socketOrder.ingredients
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
        (ingredient): ingredient is NonNullable<typeof ingredient> => ingredient !== null
      );

    return {
      orderNumber: String(socketOrder.number).padStart(6, '0'),
      timeLabel: getTimeLabel(socketOrder.createdAt),
      name: socketOrder.name ?? 'Соберите бургер',
      ingredients,
      totalPrice: ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    };
  }, [getIngredient, socketOrder]);
  const order = state?.order ?? orderFromSocket;

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
      {order ? (
        <OrderDetail order={order} />
      ) : (
        <span className="text text_type_main-medium">Заказ не найден</span>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;
