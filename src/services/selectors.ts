import type { RootState } from './store';
import type { TIngredientWithCounter } from '@utils/types';

export const selectCurrentIngredient = (
  state: RootState
): TIngredientWithCounter | null => state.ingredientsDetails.currentIngredient;

export const selectOrder = (state: RootState): number | null => state.order.orderNumber;
