//filter product by how many product in one page
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type FilterState = {
  limit: number;
};

const initialState: FilterState = {
  limit: 10,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setLimit } = filterSlice.actions;
export default filterSlice.reducer;

export const selectLimit = (state: RootState) => state.filter.limit;
