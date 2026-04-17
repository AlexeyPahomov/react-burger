import { describe, expect, it, vi } from 'vitest';

import reducer, {
  addIngredient,
  clearBurger,
  initialState,
  removeIngredient,
  setIngredientPosition,
} from './burgerSlice';

import type { TBurger, TBurgerIngredient, TIngredient } from '@/utils/types';

vi.mock('uuid', () => ({
  v4: (): string => 'test-uuid',
}));

const createIngredient = (overrides: Partial<TIngredient> = {}): TIngredient => ({
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
  ...overrides,
});

const BUN_INGREDIENT_OVERRIDES: Partial<TIngredient> = {
  _id: 'bun-id',
  type: 'bun',
  name: 'Bun',
};

const createBurgerIngredient = (
  overrides: Partial<TBurgerIngredient> = {}
): TBurgerIngredient => ({
  ...createIngredient(),
  id: 'burger-ingredient-id',
  ...overrides,
});

describe('burgerSlice reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('adds bun to burger', () => {
    const bun = createIngredient(BUN_INGREDIENT_OVERRIDES);
    const state = reducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual({
      ...bun,
      id: 'test-uuid',
    });
    expect(state.ingredients).toEqual([]);
  });

  it('adds non-bun ingredient to ingredients list', () => {
    const ingredient = createIngredient({ _id: 'main-id', type: 'main', name: 'Main' });
    const state = reducer(undefined, addIngredient(ingredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([
      {
        ...ingredient,
        id: 'test-uuid',
      },
    ]);
  });

  it('removes ingredient by id', () => {
    const first = createBurgerIngredient({ id: 'first-id', _id: 'first-main-id' });
    const second = createBurgerIngredient({ id: 'second-id', _id: 'second-main-id' });
    const state = reducer(
      { ...initialState, ingredients: [first, second] } as TBurger,
      removeIngredient('first-id')
    );

    expect(state.ingredients).toEqual([second]);
  });

  it('sets ingredient position in constructor list', () => {
    const first = createBurgerIngredient({ id: 'first-id', name: 'First' });
    const second = createBurgerIngredient({ id: 'second-id', name: 'Second' });
    const third = createBurgerIngredient({ id: 'third-id', name: 'Third' });
    const state = reducer(
      { ...initialState, ingredients: [first, second, third] } as TBurger,
      setIngredientPosition({ ingredient: third, position: 0 })
    );

    expect(state.ingredients).toEqual([third, first, second]);
  });

  it('clears burger state', () => {
    const bun = createBurgerIngredient({ id: 'bun-id', ...BUN_INGREDIENT_OVERRIDES });
    const ingredient = createBurgerIngredient({ id: 'ingredient-id' });
    const state = reducer({ bun, ingredients: [ingredient] }, clearBurger());

    expect(state).toEqual(initialState);
  });
});
