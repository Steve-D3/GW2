import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type Wishlist = {
  _id: string;
  user_id: string;
  products: string[];

  created_at: string;
  updated_at: string;
  __v: number;
};

const initialState: { toggelWishlist: boolean; wishlistItems: Wishlist[] } = {
  toggelWishlist: false,
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state) => {
      state.toggelWishlist = !state.toggelWishlist;
    },

    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.wishlistItems.push(action.payload);
      }
    },
  },
});

export default wishlistSlice.reducer;
export const { toggleWishlist, addToWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: RootState) =>
  state.wishlist.toggelWishlist;
