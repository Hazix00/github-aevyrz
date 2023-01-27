import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { CartState } from './cart.slice';

export const cartSelector: (state: RootState) => CartState = (
    state: RootState
  ) => state.cart;

export const cartHiddenSelector = createSelector(cartSelector, cart => {
  return cart.hidden;
});