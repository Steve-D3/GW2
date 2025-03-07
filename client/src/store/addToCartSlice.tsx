import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface CartItem {
  // Define the properties of a cart item here
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialState = {
  isShowCart: false,
  cartItems: [] as CartItem[],
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    showCart: (state) => {
      state.isShowCart = true;
    },
    hideCart: (state) => {
      state.isShowCart = false;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const { showCart, hideCart, addToCart } = addToCartSlice.actions;

export const selectCart = (state: RootState) => state.addToCart.cartItems;
export const selectIsShowCart = (state: RootState) =>
  state.addToCart.isShowCart;
export default addToCartSlice.reducer;
