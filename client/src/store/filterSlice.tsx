import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type FilterState = {
  limit: number;
  sortBy: "name" | "price";
  viewType: "grid" | "list";
};

const initialState: FilterState = {
  limit: 10,
  sortBy: "name",
  viewType: "grid",
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
  },
});

export const { setLimit, setSortBy, setViewType } = filterSlice.actions;
export default filterSlice.reducer;

export const selectLimit = (state: RootState) => state.filter.limit;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectViewType = (state: RootState) => state.filter.viewType;
