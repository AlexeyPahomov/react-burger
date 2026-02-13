import { addIngredient, removeIngredient } from '@/services/burger/burgerSlice';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { selectBurger } from '@/services/selectors';

import type { TIngredient, TBurgerIngredient } from '@utils/types';

type UseBurgerResult = {
  ingredients: TBurgerIngredient[];
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (id: TBurgerIngredient['id']) => void;
};

export function useBurger(): UseBurgerResult {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectBurger);

  const add = (ingredient: TIngredient): void => {
    dispatch(addIngredient(ingredient));
  };

  const remove = (id: string): void => {
    dispatch(removeIngredient(id));
  };

  return { ingredients, addIngredient: add, removeIngredient: remove };
}
