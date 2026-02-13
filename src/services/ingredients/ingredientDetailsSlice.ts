import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredientWithCounter } from '@utils/types';

type IngredientDetailsState = {
  currentIngredient: TIngredientWithCounter | null;
};

const initialState: IngredientDetailsState = {
  currentIngredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setCurrentIngredient: (
      state,
      action: PayloadAction<TIngredientWithCounter | null>
    ) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
