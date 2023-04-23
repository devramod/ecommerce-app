import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    geo: []
};

export const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {
    setGeoData: (state, action) => {
        state.geo = [...action.payload]
        
    },
  },
});

export const { setGeoData } = geoSlice.actions;

export default geoSlice.reducer;
