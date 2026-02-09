import { Modal } from '@/components/modal/modal';
import { useOrderData } from '@/hooks/useOrderData';
import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type TBurgerOrder = {
  isOpen: boolean;
  onClose: () => void;
};

export const OrderDetails = ({ isOpen, onClose }: TBurgerOrder): React.JSX.Element => {
  const { data } = useOrderData();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <span className="text text_type_digits-large mt-4 mb-8">{data.id}</span>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <CheckMarkIcon type="primary" className={styles.icon_check} />
      <span className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </span>
      <span className={`mb-15 text text_type_main-default ${styles.text_secondary}`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </Modal>
  );
};
