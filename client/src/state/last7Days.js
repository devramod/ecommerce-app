import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  last7DaysIncome: [],
};

export const last7DaysSlice = createSlice({
  name: "last7Days",
  initialState,
  reducers: {
    setlast7DaysIncome: (state, action) => {
      state.last7DaysIncome = [...action.payload];
    },
  },
});

export const {
  setlast7DaysIncome
} = last7DaysSlice.actions;

export default last7DaysSlice.reducer;
