import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    loading: true,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct(state, action) {
            state.productList = [...action.payload]        
        },
        deleteItem(state, action) {
            const newList = state.productList.filter(item => item._id !== action.payload);
            state.productList = [...newList];
        },
        editItem(state, action) {
            const updatedProducts = state.productList.map(item => item._id === action.payload._id ? action.payload : item)
            state.productList = [...updatedProducts];
        },
        isLoading(state, action) {
            state.loading = action.payload;
        }
    }
})

export const { setDataProduct, deleteItem, editItem, isLoading } = productSlice.actions;

export default productSlice.reducer;