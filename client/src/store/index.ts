import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./signinSlice";
import productApi from "./productApiSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    signin: signinSlice,
    filter: filterSlice,
    [productApi.reducerPath]: productApi.reducer, },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),

  },
);

export type RootState = ReturnType<typeof store.getState>;
export default store;