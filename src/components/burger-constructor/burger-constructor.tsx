import { Modal } from '@/components/modal/modal';
import { useBurger } from '@/hooks/useBurger';
import { useDndRef } from '@/hooks/useDndRef';
import { useOrderModal } from '@/hooks/useOrderModal';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { OrderDetails } from './components/order-details/order-details';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { createOrder, orderNumber, isModalOpen, closeModal } = useOrderModal();

  const { burger, addIngredient, removeIngredient } = useBurger();
  const { bun, ingredients } = burger;

  const defaultText = {
    bun: 'Выберите булки',
    ingredients: 'Выберите начинку',
  };
  const defaultStyles = `${bun ? styles.locked : styles.default} mr-4`;

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    const bunPrice = bun?.price ?? 0;

    return bunPrice * 2 + ingredientsPrice;
  }, [burger]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      addIngredient(ingredient);
    },
  });
  const dropRef = useDndRef(dropTarget);

  return (
    <section className={`pt-25 pl-4 ${styles.burger_constructor}`}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      <div className={`${styles.column}`} ref={dropRef}>
        <ConstructorElement
          text={bun ? `${bun.name} (верх)` : defaultText.bun}
          thumbnail={bun?.image ?? '_'}
          price={bun?.price ?? 0}
          isLocked
          type={'top'}
          extraClass={`mb-4 ${defaultStyles}`}
        />
        {!ingredients.length ? (
          <ConstructorElement
            text={defaultText.ingredients}
            thumbnail="_"
            price={0}
            extraClass={`${styles.default} mr-4`}
          />
        ) : (
          <ul className="custom-scroll">
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <DragIcon type="primary" className="mr-2" />
                <ConstructorElement
                  handleClose={() => removeIngredient(ingredient)}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  price={ingredient.price}
                  extraClass={`${styles.enable}`}
                />
              </li>
            ))}
          </ul>
        )}
        <ConstructorElement
          text={bun ? `${bun.name} (низ)` : defaultText.bun}
          thumbnail={bun?.image ?? '_'}
          price={bun?.price ?? 0}
          isLocked
          type={'bottom'}
          extraClass={`mt-4 ${defaultStyles}`}
        />
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
