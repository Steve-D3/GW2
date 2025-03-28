import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export type CartItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: { url: string }[];
  stock_quantity: number;
  quantity: number;
};

const getCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const { items } = JSON.parse(storedCart);
    return items;
  }
  return [];
};

const updateLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
};

const getItemsCountFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const { items } = JSON.parse(storedCart);
    return items.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
  }
  return 0;
};

const initialState = {
  isShowCart: false,
  cartItems: getCartFromStorage(),
  totalCartItems: getItemsCountFromStorage(),
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
      const existingItem = state.cartItems.find(
        (item: CartItem) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      updateLocalStorage(state.cartItems);
      state.totalCartItems = state.cartItems.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item._id !== action.payload
      );
      updateLocalStorage(state.cartItems);
      state.totalCartItems = state.cartItems.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },
    cartItemsCount: (state) => {
      state.totalCartItems = state.cartItems.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item: CartItem) => item._id === _id
      );

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          state.cartItems = state.cartItems.filter(
            (item: CartItem) => item._id !== _id
          );
        }
      }

      updateLocalStorage(state.cartItems);
      state.totalCartItems = state.cartItems.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },
  },
});

export const {
  showCart,
  hideCart,
  addToCart,
  removeFromCart,
  cartItemsCount,
  updateQuantity,
} = addToCartSlice.actions;

export const selectCart = (state: RootState) => state.addToCart.cartItems;
export const selectTotalCartItems = (state: RootState) =>
  state.addToCart.totalCartItems;
export const selectIsShowCart = (state: RootState) =>
  state.addToCart.isShowCart;

export default addToCartSlice.reducer;
