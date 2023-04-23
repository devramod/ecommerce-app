import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  income: [],
  orders: [],
  customers: [],
};

export const last30DaysSlice = createSlice({
  name: "last30Days",
  initialState,
  reducers: {
    setIncome: (state, action) => {
      state.income = [...action.payload];
    },
    setOrders: (state, action) => {
      state.orders = [...action.payload];
    },
    setCustomers: (state, action) => {
      state.customers = [...action.payload];
    },
  },
});

export const { setIncome, setOrders, setCustomers } = last30DaysSlice.actions;

export default last30DaysSlice.reducer;
