import { Modal } from '@/components/modal/modal';
import { useCategoryScroll } from '@/hooks/useCategoryScroll';
import { useIngredientDetailsModal } from '@/hooks/useIngredientDetailsModal';
import { useIngredients } from '@/hooks/useIngredients';
import { ingredientTypeValues } from '@/utils/constants';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { IngredientsList, IngredientDetails } from './components';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { activeTab, scrollToCategory, setRef, listContainerRef } = useCategoryScroll();

  const { ingredients, onAddIngredient } = useIngredients();

  const { isModalOpen, currentIngredient, toggleIngredientDetails } =
    useIngredientDetailsModal();

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
              ingredients={ingredients(type)}
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
