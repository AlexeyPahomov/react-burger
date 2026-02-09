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

export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TOrder = {
  id: string;
  status: string;
};
