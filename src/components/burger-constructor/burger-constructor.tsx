import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import type { TBurgerIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TBurgerIngredient[];
  onRemoveIngredient: (id: TBurgerIngredient['id']) => void;
};

export const BurgerConstructor = ({
  ingredients,
  onRemoveIngredient,
}: TBurgerConstructorProps): React.JSX.Element => {
  const totalPrice = ingredients.reduce((sum, item) => sum + item.price, 0);

  const bun = useMemo(
    () => ingredients.find(({ type }) => type === 'bun'),
    [ingredients]
  );

  return (
    <section className={`pt-25 pl-4 ${styles.burger_constructor}`}>
      <div className={`${styles.column}`}>
        {bun === undefined ? null : (
          <ConstructorElement
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
            isLocked
            type={'top'}
            extraClass={`mb-4 mr-4 ${styles.locked}`}
          />
        )}
        <ul className="custom-scroll">
          {ingredients
            .filter(({ type }) => type !== 'bun')
            .map(({ id, name, image, price }) => (
              <li key={id}>
                <DragIcon type="primary" className="mr-2" />
                <ConstructorElement
                  handleClose={() => onRemoveIngredient(id)}
                  text={name}
                  thumbnail={image}
                  price={price}
                />
              </li>
            ))}
        </ul>
        {bun === undefined ? null : (
          <ConstructorElement
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
            isLocked
            type={'bottom'}
            extraClass={`mt-4 mr-4 ${styles.locked}`}
          />
        )}
      </div>
      <footer className="mt-10">
        <div className={styles.price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" className={styles.price_icon} />
        </div>
        <Button size="large" type="primary" htmlType="button">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};
