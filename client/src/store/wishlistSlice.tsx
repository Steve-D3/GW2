import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const initialState: { toggelWishlist: boolean } = {
  toggelWishlist: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state) => {
      state.toggelWishlist = !state.toggelWishlist;
    },
  },
});

export default wishlistSlice.reducer;
export const { toggleWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: RootState) =>
  state.wishlist.toggelWishlist;
