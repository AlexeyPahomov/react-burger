import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TIngredient, TIngredientWithCounter } from '@utils/types';

const baseUrl = 'https://new-stellarburgers.education-services.ru/api';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientWithCounter[], void>({
      query: () => 'ingredients',
      transformResponse: (response: { data: TIngredient[] }) => {
        return response.data.map((ingredient) => ({
          ...ingredient,
          count: 0,
        }));
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
