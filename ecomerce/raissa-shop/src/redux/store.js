import { configureStore } from '@reduxjs/toolkit';
import panierReducer from './panierSlice';

export const store = configureStore({
  reducer: {
    panier: panierReducer,
  },
});
