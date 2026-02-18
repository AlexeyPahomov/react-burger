import { configureStore } from '@reduxjs/toolkit';

import burgerReducer from './burger/burgerSlice';
import { ingredientsApi } from './ingredients/api';
import ingredientDetailsReducer from './ingredients/ingredientDetailsSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import { ordersApi } from './orders/api';
import orderReducer from './orders/orderSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    ingredientsDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
