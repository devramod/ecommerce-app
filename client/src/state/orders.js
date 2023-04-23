import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = [...action.payload]
        },
        updateOrderStatus: (state, action) => {
           const updatedStatus = state.order.map(order => order._id === action.payload._id ? action.payload : order)
           state.order = [...updatedStatus]
        }
    }
})

export const { setOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer