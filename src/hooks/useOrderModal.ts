import { useModal } from '@/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useCreateOrderMutation } from '@/services/orders/api';
import { setOrderNumber, clearOrder } from '@/services/orders/orderSlice';
import { selectOrder } from '@/services/selectors';

type TUseOrderResult = {
  isModalOpen: boolean;
  orderNumber: number | null;
  createOrder: () => void;
  closeModal: () => void;
};

export function useOrderModal(): TUseOrderResult {
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const orderNumber = useAppSelector(selectOrder);

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleCreateOrder = (): void => {
    // TODO
    const ingredients = [
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d7',
      '692889f16bf770001bfeb4cc',
    ];

    createOrder({ ingredients })
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
    closeModal();
  };

  return {
    orderNumber,
    isModalOpen,
    createOrder: handleCreateOrder,
    closeModal: handleClearOrder,
  };
}
