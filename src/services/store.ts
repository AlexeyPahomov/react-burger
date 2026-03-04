import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './auth/api';
import burgerReducer from './burger/burgerSlice';
import { ingredientsApi } from './ingredients/api';
import ingredientsReducer from './ingredients/ingredientsSlice';
import { ordersApi } from './orders/api';
import orderReducer from './orders/orderSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    order: orderReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      ordersApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
