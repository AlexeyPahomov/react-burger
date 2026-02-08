import { ingredientsApi } from '@/utils/constants';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type {
  TIngredient,
  TIngredientWithCounter,
  TBurgerIngredient,
} from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ingredients, setIngredients] = useState<TIngredientWithCounter[]>([]);
  const [burger, setBurger] = useState<TBurgerIngredient[]>([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(ingredientsApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Статус ответа: ${response.status}`);
        }
        return response.json();
      })
      .then(({ data }: { data: TIngredient[] }) => {
        setIngredients(data.map((ingredient) => ({ ...ingredient, count: 0 })));
      })
      .catch((e) => {
        console.error('Ошибка загрузки данных:', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

    const foundIngredient = ingredients.find(({ _id }) => _id === ingredient._id);
    if (foundIngredient !== undefined) {
      if (bun === undefined) {
        foundIngredient.count += 1;
      } else {
        if (!isSameBun) {
          ingredients.forEach((i) => {
            if (i.type === 'bun') {
              i.count = 0;
            }
          });
          foundIngredient.count += 1;
        }
      }
    }

    setIngredients(ingredients);
  };

  const handleRemoveIngredient = (id: TBurgerIngredient['id']): void => {
    const burgerIngredient = burger.find((item) => item.id === id);
    if (burgerIngredient === undefined) return;

    setBurger(burger.filter((item) => item.id !== id));

    const ingredient = ingredients.find(({ _id }) => _id === burgerIngredient._id);
    if (ingredient !== undefined) {
      ingredient.count += -1;
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients
              onAddIngredient={handleAddIngredient}
              ingredients={ingredients}
            />
            <BurgerConstructor
              onRemoveIngredient={handleRemoveIngredient}
              ingredients={burger}
            />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
