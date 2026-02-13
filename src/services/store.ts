import { configureStore } from '@reduxjs/toolkit';

// import burgerReducer from './burgerSlice';
import { ingredientsApi } from './ingredients/api';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    // burger: burgerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
