// handle cart hide and show state
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
    hidden: boolean;
}

const initialState: CartState = { hidden: true };

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartHidden: (state: CartState) => {
            state.hidden = !state.hidden;
        },
        hideCart: (state: CartState) => {
            state.hidden = true;
        },
        showCart: (state: CartState) => {
            state.hidden = false;
        }
    }
});

export const { toggleCartHidden, hideCart, showCart } = cartSlice.actions;

export const { reducer: cartReducer } = cartSlice;
