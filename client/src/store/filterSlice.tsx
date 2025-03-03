import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type FilterState = {
  limit: number;
  sortBy: "name" | "price";
};

const initialState: FilterState = {
  limit: 10,
  sortBy: "name",
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
  },
});

export const { setLimit, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;

export const selectLimit = (state: RootState) => state.filter.limit;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
