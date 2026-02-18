import type { TIngredientType } from '@/utils/types';

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
