import { useAppSelector, useAppDispatch } from '@/services/hooks';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { setIngredients } from '@/services/ingredients/ingredientsSlice';
import { selectIngredients } from '@/services/selectors';
import { useCallback, useEffect } from 'react';

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
  const dispatch = useAppDispatch();
  const { data } = useGetIngredientsQuery();
  useEffect(() => {
    if (data !== undefined) {
      dispatch(setIngredients(data));
    }
  }, []);

  const ingredients = useAppSelector(selectIngredients);
  const filtredIngredients = useCallback(
    (key: TIngredientType): TIngredientWithCounter[] =>
      ingredients !== undefined ? ingredients.filter(({ type }) => type === key) : [],
    [ingredients]
  );

  const { addIngredient } = useBurger();

  return { ingredients: filtredIngredients, onAddIngredient: addIngredient };
}
