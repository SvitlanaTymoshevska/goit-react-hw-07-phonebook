import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: builder => {
      builder.addCase(setFilter, (state, action) => {
        state.filter = action.payload;
      },)
  },
});

export const filterReducer = filterSlice.reducer;
export const { setFilter } = filterSlice.actions;

export const getFilter = state => state.filter;