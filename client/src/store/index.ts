import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./signinSlice";
import productApi from "./productApiSlice";
import filterSlice from "./filterSlice";
import addToCartSlice from "./addToCartSlice";
import searchSlice from "./searchSlice";

import authApi from "./authApi";
import wishlistApi from "./wishlistApi";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
  reducer: {
    signin: signinSlice,
    filter: filterSlice,
    [productApi.reducerPath]: productApi.reducer, 
  addToCart: addToCartSlice,
  [authApi.reducerPath]: authApi.reducer,
  search: searchSlice,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  wishlist: wishlistSlice,
  
  },


    
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, authApi.middleware, wishlistApi.middleware),

  },
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
