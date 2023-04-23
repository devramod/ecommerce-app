import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monthUsers: [],
  userPercentage: 0,
  monthOrders: [],
  orderPercentage: 0,
  monthIncome: [],
  incomePercentage: 0,
};

export const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    setMonUsers: (state, action) => {
      state.monthUsers = [...action.payload];
    },
    setUserPercentage: (state, action) => {
      state.userPercentage = action.payload;
    },
    setMonOrders: (state, action) => {
      state.monthOrders = [...action.payload];
    },
    setOrderPercentage: (state, action) => {
      state.orderPercentage = action.payload;
    },
    setMonIncome: (state, action) => {
      state.monthIncome = [...action.payload];
    },
    setIncomePercentage: (state, action) => {
      state.incomePercentage = action.payload;
    },
  },
});

export const {
  setMonUsers,
  setUserPercentage,
  setMonOrders,
  setOrderPercentage,
  setMonIncome,
  setIncomePercentage
} = monthSlice.actions;

export default monthSlice.reducer;
