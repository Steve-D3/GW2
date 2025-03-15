import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./signinSlice";
import productApi from "./productApiSlice";
import filterSlice from "./filterSlice";
import addToCartSlice from "./addToCartSlice";

import authApi from "./authApi";

const store = configureStore({
  reducer: {
    signin: signinSlice,
    filter: filterSlice,
    [productApi.reducerPath]: productApi.reducer, 
  addToCart: addToCartSlice,
  [authApi.reducerPath]: authApi.reducer,
  },


    
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, authApi.middleware),

  },
);

export type RootState = ReturnType<typeof store.getState>;
export default store;