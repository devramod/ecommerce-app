import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: []
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state, action) => {
        state.contact = [...action.payload] 
    },
    deleteEmail: (state, action) => {
      const newList = state.contact.filter(item => item._id !== action.payload);
      state.contact = [...newList];
    }
  },
});

export const { setContactData, deleteEmail } = contactSlice.actions;

export default contactSlice.reducer;