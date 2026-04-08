import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-card.module.css';

const MAX_IMAGES_BEFORE_MORE = 5;

export type TOrderCardIngredient = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export type TOrderCardProps = {
  orderNumber: string;
  timeLabel: string;
  name: string;
  ingredients: TOrderCardIngredient[];
  price: number;
};

export const OrderCard = ({
  orderNumber,
  timeLabel,
  name,
  ingredients,
  price,
}: TOrderCardProps): React.JSX.Element => {
  const extraCount =
    ingredients.length > MAX_IMAGES_BEFORE_MORE
      ? ingredients.length - MAX_IMAGES_BEFORE_MORE
      : 0;

  const visible = ingredients.slice(0, MAX_IMAGES_BEFORE_MORE);

  const morePreview =
    ingredients[MAX_IMAGES_BEFORE_MORE - 1] ?? ingredients[ingredients.length - 1];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`text text_type_digits-default ${styles.order_id}`}>
          #{orderNumber}
        </span>
        <span className={`text text_type_main-default ${styles.time}`}>{timeLabel}</span>
      </div>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{name}</h2>
      <div className={styles.footer}>
        <ul className={styles.icons}>
          {visible.map((ingredient, index) => (
            <li
              key={ingredient.id}
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
            <li
              className={styles.icon_item}
              style={{ zIndex: MAX_IMAGES_BEFORE_MORE + 1 }}
            >
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
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" className={styles.price_icon} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
