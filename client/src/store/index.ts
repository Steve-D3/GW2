import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./signinSlice";

const store = configureStore({
  reducer: {
    signin: signinSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;