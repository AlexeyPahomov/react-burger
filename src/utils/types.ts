export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TIngredientWithCounter = TIngredient & {
  count: number;
};

export type TBurgerIngredient = TIngredient & {
  id: string;
};

export type TBurger = {
  bun: TBurgerIngredient | null;
  ingredients: TBurgerIngredient[];
};

export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TOrder = {
  ingredients: string[];
};

export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TFeedOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
};

export type TFeedWsResponse = {
  success: boolean;
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
  password?: string;
};
