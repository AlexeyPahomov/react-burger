import { Modal } from '@/components/modal/modal';
import { useCategoryScroll } from '@/hooks/useCategoryScroll';
import { useModal } from '@/hooks/useModal';
import { ingredientTypeValues } from '@/utils/constants';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { IngredientsList, IngredientDetails } from './components';

import type { TIngredientType, TIngredientWithCounter } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredientWithCounter[];
  onAddIngredient: (ingredient: TIngredientWithCounter) => void;
};

export const BurgerIngredients = ({
  ingredients,
  onAddIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const filtredIngredients = (key: TIngredientType): TIngredientWithCounter[] =>
    ingredients.filter(({ type }) => type === key);

  const { isModalOpen, openModal, closeModal } = useModal();
  const { activeTab, scrollToCategory, setRef, listContainerRef } = useCategoryScroll();

  const [currentIngredient, setCurrentIngredient] = useState<
    TIngredientWithCounter | undefined
  >(undefined);
  const toggleIngredientDetails = (ingredient?: TIngredientWithCounter): void => {
    setCurrentIngredient(ingredient);
    ingredient === undefined ? closeModal() : openModal();
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {ingredientTypeValues.map(({ id, type, title }) => (
            <Tab
              key={id}
              value={type}
              active={activeTab === type}
              onClick={() => scrollToCategory(type)}
            >
              {title}
            </Tab>
          ))}
        </ul>
      </nav>
      <ul ref={listContainerRef} className={`custom-scroll ${styles.ingredients_list}`}>
        {ingredientTypeValues.map(({ id, title, type }, indx) => (
          <li key={id}>
            <IngredientsList
              onClickIngredient={toggleIngredientDetails}
              onAddIngredient={onAddIngredient}
              title={title}
              ingredients={filtredIngredients(type)}
              ref={(el) => setRef(el, indx)}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={() => toggleIngredientDetails()}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};
