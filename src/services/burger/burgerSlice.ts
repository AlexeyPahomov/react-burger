import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TIngredient, TBurgerIngredient } from '@utils/types';

type BurgerState = {
  ingredients: TBurgerIngredient[];
};

const initialState: BurgerState = {
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.ingredients = state.ingredients.filter((item) => item.type !== 'bun');
        state.ingredients.unshift({ ...ingredient, id: uuidv4() });
      } else {
        state.ingredients.push({ ...ingredient, id: uuidv4() });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    clearBurger: (state) => {
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearBurger } = burgerSlice.actions;
export default burgerSlice.reducer;
