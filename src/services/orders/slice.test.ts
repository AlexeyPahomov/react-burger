import { describe, expect, it } from 'vitest';

import reducer, { clearOrder, setOrderNumber } from './orderSlice';

describe('orderSlice reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      orderNumber: null,
    });
  });

  it('sets order number', () => {
    const state = reducer(undefined, setOrderNumber(123456));

    expect(state.orderNumber).toBe(123456);
  });

  it('clears order', () => {
    const state = reducer({ orderNumber: 123456 }, clearOrder());

    expect(state.orderNumber).toBeNull();
  });
});
