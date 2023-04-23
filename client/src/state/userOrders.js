import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  products: [],
  dashboard: [],
};

export const userOrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setUserOrder: (state, action) => {
      state.orders = [...action.payload];
    },
    setUserProduct: (state, action) => {
      const productList = action.payload.map(({ products }) => products);
      state.products = [...productList];
    },
    setDashboardOrder: (state, action) => {
      state.dashboard = [...action.payload];
    },
  },
});

export const { setUserOrder, setUserProduct, setDashboardOrder } = userOrderSlice.actions;

export default userOrderSlice.reducer;
