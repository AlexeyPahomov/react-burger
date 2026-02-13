import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredientWithCounter } from '@/utils/types';
import type { WritableDraft } from 'immer';

type TIngredientsState = {
  ingredients: TIngredientWithCounter[];
};

const initialState: TIngredientsState = {
  ingredients: [],
};

const updateIngredientCount = (
  state: WritableDraft<TIngredientsState>,
  id: string,
  value: number
): void => {
  const ingredient = state.ingredients.find(({ _id }) => _id === id);
  if (ingredient) {
    ingredient.count += value;
  }
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredientWithCounter[]>) => {
      state.ingredients = action.payload;
    },
    increaseIngredientCount: (state, action: PayloadAction<string>) => {
      updateIngredientCount(state, action.payload, 1);
    },
    decreaseIngredientCount: (state, action: PayloadAction<string>) => {
      updateIngredientCount(state, action.payload, -1);
    },
    clearBunsCount: (state) => {
      state.ingredients = state.ingredients.map((i) => ({
        ...i,
        count: i.type === 'bun' ? 0 : i.count,
      }));
    },
  },
});

export const {
  setIngredients,
  increaseIngredientCount,
  decreaseIngredientCount,
  clearBunsCount,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
