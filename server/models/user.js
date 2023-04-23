import mongoose from "mongoose";

// User schema
const userSchema = mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {
      type: String,
      unique: true,
    },
    city: String,
    state: String,
    country: String,
    phone: String,
    occupation: String,
    password: String,
    confirmPassword: String,
    image: String,
  },
  { timestamps: true }
);

// Model
const userModel = mongoose.model("user", userSchema);

export default userModel;


