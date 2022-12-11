import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
import mainSlice from './main-slice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
