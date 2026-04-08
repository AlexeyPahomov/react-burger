import { baseUrl, feedWsUrl, profileOrdersWsUrl } from '@/utils/constants';
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from '@/utils/tokens';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TOrder, TCreateOrderResponse, TFeedWsResponse } from '@/utils/types';

const initialFeedState: TFeedWsResponse = {
  success: true,
  orders: [],
  total: 0,
  totalToday: 0,
};

type TFeedWsErrorResponse = {
  success: boolean;
  message: string;
};

const parseFeedOrder = (value: unknown): TFeedWsResponse['orders'][number] | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate: Record<string, unknown> = value as Record<string, unknown>;
  if (
    typeof candidate._id !== 'string' ||
    !Array.isArray(candidate.ingredients) ||
    !candidate.ingredients.every((item) => typeof item === 'string') ||
    typeof candidate.status !== 'string' ||
    typeof candidate.number !== 'number' ||
    typeof candidate.createdAt !== 'string' ||
    typeof candidate.updatedAt !== 'string'
  ) {
    return null;
  }

  return {
    _id: candidate._id,
    ingredients: candidate.ingredients,
    status: candidate.status,
    number: candidate.number,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
    name: typeof candidate.name === 'string' ? candidate.name : undefined,
  };
};

const parseFeedWsResponse = (value: unknown): TFeedWsResponse | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate: Record<string, unknown> = value as Record<string, unknown>;
  if (
    typeof candidate.success !== 'boolean' ||
    !Array.isArray(candidate.orders) ||
    typeof candidate.total !== 'number' ||
    typeof candidate.totalToday !== 'number'
  ) {
    return null;
  }

  const parsedOrders = candidate.orders
    .map((order) => parseFeedOrder(order))
    .filter((order): order is NonNullable<typeof order> => order !== null);

  return {
    success: candidate.success,
    orders: parsedOrders,
    total: candidate.total,
    totalToday: candidate.totalToday,
  };
};

const parseFeedWsErrorResponse = (value: unknown): TFeedWsErrorResponse | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate: Record<string, unknown> = value as Record<string, unknown>;
  if (typeof candidate.success !== 'boolean' || typeof candidate.message !== 'string') {
    return null;
  }

  return {
    success: candidate.success,
    message: candidate.message,
  };
};

const trimBearerPrefix = (token: string): string => token.replace(/^Bearer\s+/i, '');

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    removeTokens();
    return null;
  }

  const response = await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (!response.ok) {
    removeTokens();
    return null;
  }

  const data: unknown = await response.json();
  if (!data || typeof data !== 'object') {
    removeTokens();
    return null;
  }

  const candidate: Record<string, unknown> = data as Record<string, unknown>;
  if (
    typeof candidate.accessToken !== 'string' ||
    typeof candidate.refreshToken !== 'string'
  ) {
    removeTokens();
    return null;
  }

  setTokens(candidate.accessToken, candidate.refreshToken);
  return trimBearerPrefix(candidate.accessToken);
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFeedOrders: builder.query<TFeedWsResponse, void>({
      queryFn: (): { data: TFeedWsResponse } => ({ data: initialFeedState }),
      async onCacheEntryAdded(_arg, lifecycleApi) {
        const socket: WebSocket = new WebSocket(feedWsUrl);

        try {
          await lifecycleApi.cacheDataLoaded;

          socket.onmessage = (event): void => {
            try {
              const parsedData = parseFeedWsResponse(JSON.parse(event.data as string));

              if (parsedData?.success) {
                lifecycleApi.updateCachedData((draft) => {
                  draft.success = parsedData.success;
                  draft.orders = parsedData.orders;
                  draft.total = parsedData.total;
                  draft.totalToday = parsedData.totalToday;
                });
              }
            } catch {
              return;
            }
          };
          await lifecycleApi.cacheEntryRemoved;
        } catch {
          return;
        } finally {
          socket.close();
        }
      },
    }),
    getProfileOrders: builder.query<TFeedWsResponse, void>({
      queryFn: (): { data: TFeedWsResponse } => ({ data: initialFeedState }),
      async onCacheEntryAdded(_arg, lifecycleApi) {
        let socket: WebSocket | null = null;
        const closeSocket = (): void => {
          if (socket instanceof WebSocket) {
            socket.close();
          }
        };

        const connectWithToken = (token: string): void => {
          socket = new WebSocket(`${profileOrdersWsUrl}?token=${token}`);

          socket.onmessage = (event): void => {
            try {
              const rawData: unknown = JSON.parse(event.data as string);
              const parsedData = parseFeedWsResponse(rawData);

              if (parsedData?.success) {
                lifecycleApi.updateCachedData((draft) => {
                  draft.success = parsedData.success;
                  draft.orders = parsedData.orders;
                  draft.total = parsedData.total;
                  draft.totalToday = parsedData.totalToday;
                });
                return;
              }

              const errorData = parseFeedWsErrorResponse(rawData);
              if (errorData?.message === 'Invalid or missing token') {
                void (async (): Promise<void> => {
                  const refreshedToken = await refreshAccessToken();
                  if (!refreshedToken) {
                    closeSocket();
                    return;
                  }

                  closeSocket();
                  connectWithToken(refreshedToken);
                })();
              }
            } catch {
              return;
            }
          };
        };

        try {
          await lifecycleApi.cacheDataLoaded;

          const accessToken = getAccessToken();
          if (!accessToken) {
            return;
          }

          connectWithToken(trimBearerPrefix(accessToken));
          await lifecycleApi.cacheEntryRemoved;
        } catch {
          return;
        } finally {
          closeSocket();
        }
      },
    }),
    createOrder: builder.mutation<TCreateOrderResponse, TOrder>({
      query: (body) => {
        const accessToken = getAccessToken();

        return {
          url: 'orders',
          method: 'POST',
          body,
          headers: accessToken ? { authorization: accessToken } : undefined,
        };
      },
    }),
  }),
});

export const {
  useGetFeedOrdersQuery,
  useGetProfileOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
