import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/user/auth/auth.slice';
import { cartReducer } from './slices/user/cart/cart.slice';
// import { userReducer } from './slices/user/user.slice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    auth: authReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;