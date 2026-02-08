import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type {
  TIngredient,
  TBurgerIngredient,
  TIngredientWithCounter,
} from '@utils/types';

type UseBurgerResult = {
  burger: TBurgerIngredient[];
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (id: TBurgerIngredient['id']) => void;
};

export function useBurger(
  ingredients: TIngredientWithCounter[],
  setIngredients: React.Dispatch<React.SetStateAction<TIngredientWithCounter[]>>
): UseBurgerResult {
  const [burger, setBurger] = useState<TBurgerIngredient[]>([]);

  const addIngredient = (ingredient: TIngredient): void => {
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

  const removeIngredient = (id: TBurgerIngredient['id']): void => {
    const burgerIngredient = burger.find((item) => item.id === id);
    if (burgerIngredient === undefined) return;

    setBurger(burger.filter((item) => item.id !== id));

    const ingredient = ingredients.find(({ _id }) => _id === burgerIngredient._id);
    if (ingredient !== undefined) {
      ingredient.count += -1;
    }
  };

  return { burger, addIngredient, removeIngredient };
}
