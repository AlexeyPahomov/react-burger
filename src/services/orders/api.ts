import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TOrder, TCreateOrderResponse } from '@utils/types';

const baseUrl = 'https://new-stellarburgers.education-services.ru/api';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<TCreateOrderResponse, TOrder>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
