import { Modal } from '@/components/modal/modal';
import { useOrderModal } from '@/hooks/useOrderModal';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { OrderDetails } from './components/order-details/order-details';

import type { TBurgerIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { createOrder, orderNumber, isModalOpen, closeModal } = useOrderModal();

  // TODO
  const ingredients: TBurgerIngredient[] = [];
  const totalPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
  const bun = useMemo(
    () => ingredients.find(({ type }) => type === 'bun'),
    [ingredients]
  );
  const onRemoveIngredient = (id: string): void => {
    console.log(id);
  };

  return (
    <section className={`pt-25 pl-4 ${styles.burger_constructor}`}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
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
            .map((ingredient) => (
              <li key={ingredient.id}>
                <DragIcon type="primary" className="mr-2" />
                <ConstructorElement
                  handleClose={() => onRemoveIngredient(ingredient.id)}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  price={ingredient.price}
                  extraClass={`${styles.enable}`}
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
        <Button onClick={createOrder} size="large" type="primary" htmlType="button">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};
