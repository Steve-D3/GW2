import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "./index";

interface SigninState {
  isShowLogin: boolean;
  user: {
    name: string | null;
    email: string | null;
    _id: string | null;
  } | null;
  isLoading: boolean;
}

const initialState: SigninState = {
  isShowLogin: false,
  user: null,
  isLoading: false,
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

    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; _id: string }>
    ) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isShowLogin = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { showLogin, hideLogin, setUser, logout, setLoading } =
  signinSlice.actions;
export default signinSlice.reducer;

export const selectIsShowLogin = (state: RootState) => state.signin.isShowLogin;
export const selectUser = (state: RootState) => state.signin.user;
export const selectIsLoading = (state: RootState) => state.signin.isLoading;
