import { addIngredient, removeIngredient } from '@/services/burger/burgerSlice';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  increaseIngredientCount,
  decreaseIngredientCount,
  clearBunsCount,
} from '@/services/ingredients/ingredientsSlice';
import { selectBurger } from '@/services/selectors';

import type { TIngredient, TBurgerIngredient } from '@utils/types';

type UseBurgerResult = {
  ingredients: TBurgerIngredient[];
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (ingredient: TBurgerIngredient) => void;
};

export function useBurger(): UseBurgerResult {
  const dispatch = useAppDispatch();
  const burgerIngredients = useAppSelector(selectBurger);

  const clearBuns = (id: TIngredient['_id'], type: TIngredient['type']): void => {
    let bun: TIngredient | undefined = undefined;
    if (type === 'bun') {
      bun = burgerIngredients.find(({ type }) => type === 'bun');
      if (bun !== undefined && bun._id !== id) {
        dispatch(clearBunsCount());
      }
    }
  };

  const add = (ingredient: TIngredient): void => {
    clearBuns(ingredient._id, ingredient.type);

    dispatch(addIngredient(ingredient));
    dispatch(increaseIngredientCount(ingredient._id));
  };

  const remove = ({ id, _id }: TBurgerIngredient): void => {
    dispatch(removeIngredient(id));
    dispatch(decreaseIngredientCount(_id));
  };

  return {
    ingredients: burgerIngredients,
    addIngredient: add,
    removeIngredient: remove,
  };
}
