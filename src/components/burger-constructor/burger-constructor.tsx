import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  const ingredientsToShow = useMemo(() => {
    const itemsToShow: TBurgerIngredient[] = [];
    const bun = ingredients.find(({ type }) => type === 'bun');
    if (bun === undefined) {
      ingredients.forEach((ingredient) => {
        itemsToShow.push(ingredient);
      });
    } else {
      itemsToShow.push({ ...bun, name: `${bun.name} (верх)`, id: uuidv4() });
      ingredients
        .filter(({ type }) => type !== 'bun')
        .forEach((ingredient) => {
          itemsToShow.push(ingredient);
        });
      itemsToShow.push({ ...bun, name: `${bun.name} (низ)`, id: uuidv4() });
    }

    return itemsToShow;
  }, [ingredients]);

  return (
    <section className={`pt-25 pl-4 ${styles.burger_constructor}`}>
      <ul className="custom-scroll">
        {ingredientsToShow.map(({ id, name, image, price, type }, indx) => (
          <li key={id}>
            {type !== 'bun' && <DragIcon type="primary" className="mr-2" />}
            <ConstructorElement
              handleClose={() => onRemoveIngredient(id)}
              text={name}
              thumbnail={image}
              price={price}
              isLocked={type === 'bun'}
              type={
                !indx
                  ? 'top'
                  : indx === ingredientsToShow.length - 1
                    ? 'bottom'
                    : undefined
              }
            />
          </li>
        ))}
      </ul>
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
