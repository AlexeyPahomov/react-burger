import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredientWithCounter } from '@/utils/types';
import type { WritableDraft } from 'immer';

type TIngredientsState = {
  ingredients: TIngredientWithCounter[];
};

type TIngredientActionPayload = {
  id: string;
  value?: number;
};

const initialState: TIngredientsState = {
  ingredients: [],
};

const updateIngredientCount = (
  state: WritableDraft<TIngredientsState>,
  payload: TIngredientActionPayload
): void => {
  const { id, value } = payload;
  const ingredient = state.ingredients.find(({ _id }) => _id === id);
  if (ingredient && value) {
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
    increaseIngredientCount: (
      state,
      action: PayloadAction<TIngredientActionPayload>
    ) => {
      const { id, value } = action.payload;
      updateIngredientCount(state, { id, value: value ?? 1 });
    },
    decreaseIngredientCount: (
      state,
      action: PayloadAction<TIngredientActionPayload>
    ) => {
      const { id, value } = action.payload;
      updateIngredientCount(state, { id, value: value ?? -1 });
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
