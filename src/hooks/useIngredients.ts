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
  getIngredient: (id: string) => TIngredientWithCounter | null;
};

export function useIngredients(): TUseIngredientsResult {
  const dispatch = useAppDispatch();
  const { data } = useGetIngredientsQuery();
  useEffect(() => {
    if (data !== undefined) {
      dispatch(setIngredients(data));
    }
  }, [data, dispatch]);

  const ingredients = useAppSelector(selectIngredients);
  const filtredIngredients = useCallback(
    (key: TIngredientType): TIngredientWithCounter[] =>
      ingredients !== undefined ? ingredients.filter(({ type }) => type === key) : [],
    [ingredients]
  );

  const { addIngredient } = useBurger();

  const getIngredient = (id: string): TIngredientWithCounter | null => {
    return ingredients.find(({ _id }) => _id === id) ?? null;
  };

  return {
    ingredients: filtredIngredients,
    onAddIngredient: addIngredient,
    getIngredient,
  };
}
