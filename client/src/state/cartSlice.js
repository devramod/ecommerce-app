import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItem: [],
  disable: false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const check = state.cartItem.some(
        (item) => item._id === action.payload._id
      );
      if (check) {
        toast("Product already in cart");
      } else {
        toast("Product added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          {
            ...action.payload,
            purchaseQuantity: 1,
            total: total,
            description: "Product Description",
          },
        ];
        console.log(state.cartItem);
      }
    },
    deleteCartItems: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItem.splice(index, 1);
    },
    increaaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      let qty = state.cartItem[index].purchaseQuantity;
      let totalQuantity = state.cartItem[index].quantity
      const qtyInc = ++qty;
      state.cartItem[index].purchaseQuantity = qtyInc;

      if (qty >= totalQuantity) {
        state.disable = true;
      }

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      let qty = state.cartItem[index].purchaseQuantity;
      let totalQuantity = state.cartItem[index].quantity
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].purchaseQuantity = qtyDec;
        if (qty < totalQuantity) {
          state.disable = false;
        }

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  addCartItems,
  deleteCartItems,
  increaaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
