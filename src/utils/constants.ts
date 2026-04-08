import type { TIngredientType, TOrderStatus } from '@/utils/types';

export const ingredientTypeValues: {
  id: number;
  type: TIngredientType;
  title: string;
}[] = [
  {
    id: 1,
    type: 'bun',
    title: 'Булки',
  },
  {
    id: 2,
    type: 'sauce',
    title: 'Соусы',
  },
  {
    id: 3,
    type: 'main',
    title: 'Начинки',
  },
];

export const baseUrl = 'https://new-stellarburgers.education-services.ru/api';
export const feedWsUrl = 'wss://new-stellarburgers.education-services.ru/orders/all';
export const profileOrdersWsUrl =
  'wss://new-stellarburgers.education-services.ru/orders';
export const statusLabelMap = new Map<TOrderStatus, string>([
  ['done', 'Выполнен'],
  ['pending', 'В работе'],
  ['created', 'Создан'],
]);

export const profileMenu = [
  {
    id: '1',
    title: 'Профиль',
    to: '/profile',
  },
  {
    id: '2',
    title: 'История заказов',
    to: '/profile/orders',
  },
];
