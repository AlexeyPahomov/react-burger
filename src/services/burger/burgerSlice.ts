import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TBurger, TBurgerIngredient, TIngredient } from '@utils/types';

const initialState: TBurger = {
  bun: null,
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TBurgerIngredient>) => {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient): PayloadAction<TBurgerIngredient> => ({
        type: 'burger/addIngredient',
        payload: { ...ingredient, id: uuidv4() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    setIngredientPosition: (
      state,
      action: PayloadAction<{ ingredient: TBurgerIngredient; position: number }>
    ) => {
      const { ingredient, position } = action.payload;

      state.ingredients = state.ingredients.filter((item) => item.id !== ingredient.id);
      state.ingredients.splice(position, 0, ingredient);
    },
    clearBurger: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, setIngredientPosition, clearBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
