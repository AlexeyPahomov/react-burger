import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ingredients } from '@utils/ingredients';

import type {
  TIngredient,
  TIngredientWithCounter,
  TBurgerIngredient,
} from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [burger, setBurger] = useState<TBurgerIngredient[]>([]);
  const [ingredientsWithCounter, setIngredientsWithCounter] = useState<
    TIngredientWithCounter[]
  >(ingredients.map((ingredient) => ({ ...ingredient, count: 0 })));

  const handleAddIngredient = (ingredient: TIngredient): void => {
    let bun: TIngredient | undefined = undefined;
    let isSameBun = false;

    if (ingredient.type === 'bun') {
      bun = burger.find(({ type }) => type === 'bun');
      isSameBun = bun?._id === ingredient._id;
    }
    setBurger([
      ...(bun === undefined ? burger : burger.filter(({ type }) => type !== 'bun')),
      { ...ingredient, id: uuidv4() },
    ]);

    const foundIngredient = ingredientsWithCounter.find(
      ({ _id }) => _id === ingredient._id
    );
    if (foundIngredient !== undefined) {
      if (bun === undefined) {
        foundIngredient.count += 1;
      } else {
        if (!isSameBun) {
          ingredientsWithCounter.forEach((i) => {
            if (i.type === 'bun') {
              i.count = 0;
            }
          });
          foundIngredient.count += 1;
        }
      }
    }

    setIngredientsWithCounter(ingredientsWithCounter);
  };

  const handleRemoveIngredient = (id: TBurgerIngredient['id']): void => {
    const burgerIngredient = burger.find((item) => item.id === id);
    if (burgerIngredient === undefined) return;

    setBurger(burger.filter((item) => item.id !== id));

    const ingredientWithCount = ingredientsWithCounter.find(
      ({ _id }) => _id === burgerIngredient._id
    );
    if (ingredientWithCount !== undefined) {
      ingredientWithCount.count += -1;
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          onAddIngredient={handleAddIngredient}
          ingredients={ingredientsWithCounter}
        />
        <BurgerConstructor
          onRemoveIngredient={handleRemoveIngredient}
          ingredients={burger}
        />
      </main>
    </div>
  );
};

export default App;
