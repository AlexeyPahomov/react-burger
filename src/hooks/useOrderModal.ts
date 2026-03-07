import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useCreateOrderMutation } from '@/services/orders/api';
import { setOrderNumber, clearOrder } from '@/services/orders/orderSlice';
import { selectOrder } from '@/services/selectors';
import { useNavigate } from 'react-router-dom';

import { useBurger } from './useBurger';

type TUseOrderResult = {
  isModalOpen: boolean;
  isLoading: boolean;
  orderNumber: number | null;
  createOrder: () => void;
  closeModal: () => void;
};

export function useOrderModal(): TUseOrderResult {
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const orderNumber = useAppSelector(selectOrder);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { burger, clearBurger } = useBurger();

  const getIngredientsToOrder = (): string[] | null => {
    const { bun, ingredients } = burger;
    if (!bun) return null;

    const ingredientsToOrder = ingredients.map(({ _id }) => _id);
    ingredientsToOrder.unshift(bun._id);
    ingredientsToOrder.push(bun._id);

    return ingredientsToOrder;
  };

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleCreateOrder = (): void => {
    if (!isAuth) {
      navigate('/login', { replace: true }) as void;
      return;
    }

    const ingredientsToOrder = getIngredientsToOrder();
    if (!ingredientsToOrder) return;

    createOrder({ ingredients: ingredientsToOrder })
      .then((response) => {
        if (!response.data) {
          throw new Error('Ошибка запроса');
        }
        dispatch(setOrderNumber(response.data.order.number));
        openModal();
      })
      .catch((error) => {
        console.error('Ошибка создания заказа:', error);
      });
  };

  const handleClearOrder = (): void => {
    dispatch(clearOrder());
    dispatch(clearBurger);
    closeModal();
  };

  return {
    orderNumber,
    isModalOpen,
    isLoading,
    createOrder: handleCreateOrder,
    closeModal: handleClearOrder,
  };
}
