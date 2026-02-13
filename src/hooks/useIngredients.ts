import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { useCallback } from 'react';

import type { TIngredientType, TIngredientWithCounter } from '@/utils/types';

type TUseIngredientsResult = {
  ingredients: (key: TIngredientType) => TIngredientWithCounter[];
  onAddIngredient: (i: TIngredientWithCounter) => void;
};

export function useIngredients(): TUseIngredientsResult {
  const { data: ingredients } = useGetIngredientsQuery();
  const filtredIngredients = useCallback(
    (key: TIngredientType): TIngredientWithCounter[] =>
      ingredients !== undefined ? ingredients.filter(({ type }) => type === key) : [],
    [ingredients]
  );

  const onAddIngredient = (i: TIngredientWithCounter): void => {
    // TODO
    console.log(i);
  };

  return { ingredients: filtredIngredients, onAddIngredient };
}
