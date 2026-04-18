import { defaultTestIngredientWithCounter } from '@/test-utils/constants';
import { describe, expect, it } from 'vitest';

import reducer, {
  clearBunsCount,
  clearIngredientsCount,
  decreaseIngredientCount,
  increaseIngredientCount,
  setIngredients,
} from './ingredientsSlice';

import type { TIngredientWithCounter } from '@/utils/types';

const createIngredient = (
  overrides: Partial<TIngredientWithCounter> = {}
): TIngredientWithCounter => ({
  ...defaultTestIngredientWithCounter,
  ...overrides,
});

describe('ingredientsSlice reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ ingredients: [] });
  });

  it('sets ingredients list', () => {
    const ingredients = [
      createIngredient({ _id: 'bun-id', type: 'bun' }),
      createIngredient({ _id: 'main-id', type: 'main' }),
    ];

    const state = reducer(undefined, setIngredients(ingredients));
    expect(state.ingredients).toEqual(ingredients);
  });

  it('increases ingredient count by default value', () => {
    const state = reducer(
      { ingredients: [createIngredient({ _id: 'main-id', count: 1 })] },
      increaseIngredientCount({ id: 'main-id' })
    );

    expect(state.ingredients[0].count).toBe(2);
  });

  it('increases ingredient count by custom value', () => {
    const state = reducer(
      { ingredients: [createIngredient({ _id: 'main-id', count: 1 })] },
      increaseIngredientCount({ id: 'main-id', value: 3 })
    );

    expect(state.ingredients[0].count).toBe(4);
  });

  it('decreases ingredient count by default value', () => {
    const state = reducer(
      { ingredients: [createIngredient({ _id: 'main-id', count: 3 })] },
      decreaseIngredientCount({ id: 'main-id' })
    );

    expect(state.ingredients[0].count).toBe(2);
  });

  it('decreases ingredient count by custom value', () => {
    const state = reducer(
      { ingredients: [createIngredient({ _id: 'main-id', count: 5 })] },
      decreaseIngredientCount({ id: 'main-id', value: -2 })
    );

    expect(state.ingredients[0].count).toBe(3);
  });

  it('clears only bun counters', () => {
    const bun = createIngredient({ _id: 'bun-id', type: 'bun', count: 2 });
    const main = createIngredient({ _id: 'main-id', type: 'main', count: 3 });

    const state = reducer({ ingredients: [bun, main] }, clearBunsCount());
    expect(state.ingredients).toEqual([
      { ...bun, count: 0 },
      { ...main, count: 3 },
    ]);
  });

  it('clears all ingredient counters', () => {
    const bun = createIngredient({ _id: 'bun-id', type: 'bun', count: 2 });
    const main = createIngredient({ _id: 'main-id', type: 'main', count: 3 });

    const state = reducer({ ingredients: [bun, main] }, clearIngredientsCount());
    expect(state.ingredients).toEqual([
      { ...bun, count: 0 },
      { ...main, count: 0 },
    ]);
  });
});
