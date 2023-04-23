import mongoose from "mongoose";

// Product schema
const productSchema = mongoose.Schema(
  {
    name: String,
    brand: String,
    description: String,
    price: Number,
    image: String,
    quantity: Number,
  },
  { timestamps: true }
);

// Model
const productModel = mongoose.model("product", productSchema);

export default productModel;
