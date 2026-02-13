import type { RootState } from './store';
import type { TIngredientWithCounter, TBurgerIngredient } from '@utils/types';

export const selectIngredients = (state: RootState): TIngredientWithCounter[] =>
  state.ingredients.ingredients;

export const selectCurrentIngredient = (
  state: RootState
): TIngredientWithCounter | null => state.ingredientsDetails.currentIngredient;

export const selectBurger = (state: RootState): TBurgerIngredient[] =>
  state.burger.ingredients;

export const selectOrder = (state: RootState): number | null => state.order.orderNumber;
