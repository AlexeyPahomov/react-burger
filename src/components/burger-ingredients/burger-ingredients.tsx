import { ingredientTypeValues } from '@/utils/constants';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { IngredientsList } from './components';

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

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <ul className={`custom-scroll ${styles.ingredients_list}`}>
        {ingredientTypeValues.map(({ id, title, type }) => (
          <li key={id}>
            <IngredientsList
              onAddIngredient={onAddIngredient}
              title={title}
              ingredients={filtredIngredients(type)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
