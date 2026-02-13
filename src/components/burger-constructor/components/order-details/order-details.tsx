import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber: number | null;
};

export const OrderDetails = ({ orderNumber }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.order_details}>
      <span className="text text_type_digits-large mt-4 mb-8">{orderNumber}</span>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <CheckMarkIcon type="primary" className={styles.icon_check} />
      <span className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </span>
      <span className={`mb-15 text text_type_main-default ${styles.text_secondary}`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
