import type { RootState } from './store';
import type { TIngredientWithCounter } from '@utils/types';

export const selectCurrentIngredient = (
  state: RootState
): TIngredientWithCounter | null => state.ingredientsDetails.currentIngredient;
