import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TOrderCardProps } from '../order-card/order-card';

import styles from './order-detail.module.css';

type TOrderDetailProps = {
  order: TOrderCardProps;
};

type TGroupedIngredient = {
  id: string;
  image: string;
  name: string;
  price: number;
  count: number;
};

export const OrderDetail = ({ order }: TOrderDetailProps): React.JSX.Element => {
  const groupedIngredients = order.ingredients.reduce<TGroupedIngredient[]>(
    (acc, ingredient) => {
      const existedIngredient = acc.find((item) => item.id === ingredient.id);
      if (existedIngredient) {
        existedIngredient.count += 1;
        return acc;
      }

      return [...acc, { ...ingredient, count: 1 }];
    },
    []
  );

  return (
    <section className={styles.container}>
      <span className="text text_type_digits-default">#{order.orderNumber}</span>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{order.name}</h2>
      <span className={`text text_type_main-default ${styles.status}`}>Выполнен</span>

      <h3 className={`text text_type_main-medium ${styles.composition_title}`}>
        Состав:
      </h3>
      <ul className={`custom-scroll ${styles.composition_list}`}>
        {groupedIngredients.map((ingredient) => (
          <li key={ingredient.id} className={styles.composition_item}>
            <div className={styles.ingredient_meta}>
              <div className={styles.icon_ring}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.icon_img}
                />
              </div>
              <span className="text text_type_main-default">{ingredient.name}</span>
            </div>
            <span className={`text text_type_digits-default ${styles.price_row}`}>
              {ingredient.count} x {ingredient.price}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive">
          {order.timeLabel} i-GMT+3
        </span>
        <div className={styles.total}>
          <span className="text text_type_digits-default">{order.price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};
