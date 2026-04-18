import type { TIngredient, TIngredientWithCounter } from '@/utils/types';

export const defaultTestIngredient: TIngredient = {
  _id: 'ingredient-id',
  name: 'Ingredient',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 100,
  image: 'image.png',
  image_large: 'image-large.png',
  image_mobile: 'image-mobile.png',
  __v: 0,
};

export const defaultTestIngredientWithCounter: TIngredientWithCounter = {
  ...defaultTestIngredient,
  count: 0,
};
