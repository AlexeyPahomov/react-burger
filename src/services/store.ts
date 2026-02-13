import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredients/api';
import ingredientDetailsReducer from './ingredients/ingredientDetailsSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    ingredientsDetails: ingredientDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
