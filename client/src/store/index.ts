import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./signinSlice";
import productApi from "./productApiSlice";
import filterSlice from "./filterSlice";
import addToCartSlice from "./addToCartSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    signin: signinSlice,
    filter: filterSlice,
    [productApi.reducerPath]: productApi.reducer,
    addToCart: addToCartSlice,
    search: searchSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
