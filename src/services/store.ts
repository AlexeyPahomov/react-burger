import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredients/api';
import ingredientDetailsReducer from './ingredients/ingredientDetailsSlice';
import { ordersApi } from './orders/api';
import orderReducer from './orders/orderSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    ingredientsDetails: ingredientDetailsReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
