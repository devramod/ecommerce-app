import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCustomers: [],
  totalOrders: 0,
  totalEarnings: [],
};

export const totalDataSlice = createSlice({
  name: "totalData",
  initialState,
  reducers: {
    setTotalCustomers: (state, action) => {
        state.totalCustomers = [...action.payload];
    },
    setTotalOrders: (state, action) => {
        state.totalOrders = action.payload;
    },
    setTotalEarnings: (state, action) => {
        state.totalEarnings = [...action.payload];
    },
  },
});

export const { setTotalCustomers, setTotalOrders, setTotalEarnings } =
  totalDataSlice.actions;

export default totalDataSlice.reducer;
