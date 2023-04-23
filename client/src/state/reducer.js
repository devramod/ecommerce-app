import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    fname: "",
    lname: "",
    email: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    occupation: "",
    image: "",
    isAuthenticated: true,
  },
  state: {
    isFetching: false,
  },
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.user._id = action.payload._id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.email = action.payload.email;
      state.user.city = action.payload.city;
      state.user.state = action.payload.state;
      state.user.country = action.payload.country;
      state.user.phone = action.payload.phone;
      state.user.occupation = action.payload.occupation;
      state.user.image = action.payload.image;
      state.user.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      console.log(action.payload);
      state.user._id = action.payload._id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.email = action.payload.email;
      state.user.city = action.payload.city;
      state.user.state = action.payload.state;
      state.user.country = action.payload.country;
      state.user.phone = action.payload.phone;
      state.user.occupation = action.payload.occupation;
      state.user.image = action.payload.image;
    },
    logoutRedux: (state) => {
      state.user._id = "";
      state.user.fname = "";
      state.user.lname = "";
      state.user.email = "";
      state.user.city = "";
      state.user.state = "";
      state.user.country = "";
      state.user.phone = "";
      state.user.occupation = "";
      state.user.image = "";
    },
    deleteUser: (state) => {
      state.user._id = "";
      state.user.fname = "";
      state.user.lname = "";
      state.user.email = "";
      state.user.city = "";
      state.user.state = "";
      state.user.country = "";
      state.user.phone = "";
      state.user.occupation = "";
      state.user.image = "";
    },
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
  },
});

export const {
  loginRedux,
  logoutRedux,
  setIsFetching,
  updateUser,
  deleteUser,
} = slice.actions;

export default slice.reducer;
