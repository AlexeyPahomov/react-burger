import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-card.module.css';

const maxImagesBeforeMore = 5;
const statusLabelMap = new Map<TOrderStatus, string>([
  ['done', 'Выполнен'],
  ['pending', 'В работе'],
  ['created', 'Создан'],
]);

export type TOrderCardIngredient = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export type TOrderStatus = 'done' | 'pending' | 'created';

export type TOrderCardProps = {
  orderNumber: string;
  timeLabel: string;
  name: string;
  ingredients: TOrderCardIngredient[];
  totalPrice: number;
  status: TOrderStatus;
};

type TOrderCardViewProps = Omit<TOrderCardProps, 'totalPrice'>;

export const OrderCard = ({
  orderNumber,
  timeLabel,
  name,
  ingredients,
  status,
}: TOrderCardViewProps): React.JSX.Element => {
  const extraCount =
    ingredients.length > maxImagesBeforeMore
      ? ingredients.length - maxImagesBeforeMore
      : 0;
  const totalPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

  const visible = ingredients.slice(0, maxImagesBeforeMore);

  const morePreview =
    ingredients[maxImagesBeforeMore - 1] ?? ingredients[ingredients.length - 1];
  const statusLabel = statusLabelMap.get(status);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`text text_type_digits-default ${styles.order_id}`}>
          #{orderNumber}
        </span>
        <span className={`text text_type_main-default ${styles.time}`}>{timeLabel}</span>
      </div>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{name}</h2>
      {statusLabel && (
        <span
          className={`text text_type_main-default ${styles.status} ${
            status === 'done' ? styles.status_done : ''
          }`}
        >
          {statusLabel}
        </span>
      )}
      <div className={styles.footer}>
        <ul className={styles.icons}>
          {visible.map((ingredient, index) => (
            <li
              key={`${ingredient.id}-${index}`}
              className={styles.icon_item}
              style={{ zIndex: index + 1 }}
            >
              <div className={styles.icon_ring}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.icon_img}
                />
              </div>
            </li>
          ))}
          {extraCount > 0 && morePreview && (
            <li className={styles.icon_item} style={{ zIndex: maxImagesBeforeMore + 1 }}>
              <div className={`${styles.icon_ring} ${styles.icon_ring_more}`}>
                <img src={morePreview.image} alt="" className={styles.icon_img} />
                <div className={styles.more_overlay} aria-hidden />
                <span className={`text text_type_digits-default ${styles.more_count}`}>
                  +{extraCount}
                </span>
              </div>
            </li>
          )}
        </ul>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" className={styles.price_icon} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
