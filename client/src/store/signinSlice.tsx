//signin on button click
import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "./index";

const initialState = {
  isShowLogin: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    showLogin: (state) => {
      state.isShowLogin = true;
    },
    hideLogin: (state) => {
      state.isShowLogin = false;
    },
  },
});

export const { showLogin, hideLogin } = signinSlice.actions;
export default signinSlice.reducer;

export const selectIsShowLogin = (state: RootState) => state.signin.isShowLogin;
