import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { useCallback } from 'react';

import { useBurger } from './useBurger';

import type {
  TIngredientType,
  TIngredientWithCounter,
  TIngredient,
} from '@/utils/types';

type TUseIngredientsResult = {
  ingredients: (key: TIngredientType) => TIngredientWithCounter[];
  onAddIngredient: (i: TIngredient) => void;
};

export function useIngredients(): TUseIngredientsResult {
  const { data: ingredients } = useGetIngredientsQuery();
  const filtredIngredients = useCallback(
    (key: TIngredientType): TIngredientWithCounter[] =>
      ingredients !== undefined ? ingredients.filter(({ type }) => type === key) : [],
    [ingredients]
  );

  const { addIngredient } = useBurger();

  return { ingredients: filtredIngredients, onAddIngredient: addIngredient };
}
