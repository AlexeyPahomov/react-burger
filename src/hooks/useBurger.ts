import {
  addIngredient,
  removeIngredient,
  setIngredientPosition,
} from '@/services/burger/burgerSlice';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  increaseIngredientCount,
  decreaseIngredientCount,
  clearBunsCount,
} from '@/services/ingredients/ingredientsSlice';
import { selectBurger } from '@/services/selectors';

import type { TIngredient, TBurgerIngredient, TBurger } from '@utils/types';

type UseBurgerResult = {
  burger: TBurger;
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (ingredient: TBurgerIngredient) => void;
  setIngredientPosition: (ingredient: TBurgerIngredient, position: number) => void;
};

export function useBurger(): UseBurgerResult {
  const dispatch = useAppDispatch();
  const burger = useAppSelector(selectBurger);

  const add = (ingredient: TIngredient): void => {
    const isBun = ingredient.type === 'bun';
    if (isBun) {
      dispatch(clearBunsCount());
    }

    dispatch(addIngredient(ingredient));
    dispatch(
      increaseIngredientCount({
        id: ingredient._id,
        value: isBun ? 2 : 1,
      })
    );
  };

  const remove = ({ id, _id }: TBurgerIngredient): void => {
    dispatch(removeIngredient(id));
    dispatch(decreaseIngredientCount({ id: _id }));
  };

  const move = (ingredient: TBurgerIngredient, position: number): void => {
    dispatch(setIngredientPosition({ ingredient, position }));
  };

  return {
    burger,
    addIngredient: add,
    removeIngredient: remove,
    setIngredientPosition: move,
  };
}
