import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "./index";

type SearchState = {
  isShowSearch: boolean;
};
const initialState: SearchState = {
  isShowSearch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggelSearch: (state) => {
      state.isShowSearch = !state.isShowSearch;
    },
  },
});

export const { toggelSearch } = searchSlice.actions;

export default searchSlice.reducer;
export const selectIsShowSearch = (state: RootState) =>
  state.search.isShowSearch;
