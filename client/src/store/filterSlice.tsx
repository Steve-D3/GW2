import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type FilterState = {
  limit: number;
  sortBy: "name" | "price" | "relevance";
  viewType: "grid" | "list";
  viewFilter: boolean;
  category: string;
  priceRange: { min: number; max: number };
  amountOfProductsSelected: number;
  amountOfProductsFiltered: number;
  homeCategory: string;
};

const initialState: FilterState = {
  limit: 10,
  sortBy: "relevance",
  viewType: "grid",
  viewFilter: false,
  category: "",
  priceRange: { min: 0, max: 100 },
  amountOfProductsSelected: 0,
  amountOfProductsFiltered: 0,
  homeCategory: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    toggelFilter: (state) => {
      state.viewFilter = !state.viewFilter;
    },
    filterByCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setAmountOfProductsSelected: (state, action) => {
      state.amountOfProductsSelected = action.payload;
    },
    setAmountOfProductsFiltered: (state, action) => {
      state.amountOfProductsFiltered = action.payload;
    },
    setHomeCategory: (state, action) => {
      state.homeCategory = action.payload;
    },
  },
});

export const {
  setLimit,
  setSortBy,
  setViewType,
  toggelFilter,
  filterByCategory,
  setPriceRange,
  setAmountOfProductsSelected,
  setAmountOfProductsFiltered,
  setHomeCategory,
} = filterSlice.actions;
export default filterSlice.reducer;

export const selectLimit = (state: RootState) => state.filter.limit;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectViewType = (state: RootState) => state.filter.viewType;
export const selectViewFilter = (state: RootState) => state.filter.viewFilter;
export const selectCategory = (state: RootState) => state.filter.category;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;
export const selectHomeCategory = (state: RootState) =>
  state.filter.homeCategory;
export const selectAmountOfProductsSelected = (state: RootState) =>
  state.filter.amountOfProductsSelected;
export const selectAmountOfProductsFiltered = (state: RootState) =>
  state.filter.amountOfProductsFiltered;
