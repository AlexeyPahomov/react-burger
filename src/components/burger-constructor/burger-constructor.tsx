import { Modal } from '@/components/modal/modal';
import { useBurger } from '@/hooks/useBurger';
import { useDndRef } from '@/hooks/useDndRef';
import { useOrderModal } from '@/hooks/useOrderModal';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ModalOverlay } from '../modal/components/modal-overlay/modal-overlay';
import { OrderDetails, DraggableElement } from './components';

import type { TBurgerIngredient, TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { createOrder, orderNumber, isModalOpen, closeModal, isLoading } =
    useOrderModal();

  const { burger, addIngredient, removeIngredient, setIngredientPosition } = useBurger();
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
    drop(ingredient: TIngredient, monitor) {
      if (monitor.didDrop()) {
        return;
      }
      addIngredient(ingredient);
    },
  });
  const dropRef = useDndRef(dropTarget);

  const dropIngredient = (ingredient: TBurgerIngredient, index: number): void => {
    setIngredientPosition(ingredient, index);
  };

  return (
    <section className={`pt-25 pl-4 ${styles.burger_constructor}`}>
      {isLoading && (
        <ModalOverlay>
          <Preloader />
        </ModalOverlay>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      <div
        className={`${styles.column}`}
        data-test="constructor-drop-area"
        ref={dropRef}
      >
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
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.id}>
                <DraggableElement
                  handleClose={() => removeIngredient(ingredient)}
                  handleDrop={(item) => dropIngredient(item, index)}
                  ingredient={ingredient}
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
        <Button
          onClick={createOrder}
          size="large"
          type="primary"
          htmlType="button"
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};
