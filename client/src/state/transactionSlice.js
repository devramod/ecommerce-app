import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transaction: []
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
        state.transaction = [...action.payload]
    },
  },
});

export const { setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;