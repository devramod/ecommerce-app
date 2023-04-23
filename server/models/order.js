import mongoose from "mongoose";

// Order schema

const orderSchema = mongoose.Schema(
  {
    userId: String,
    customerId: String,
    paymentIntentId: String,
    products: [
      {
        _id: String,
        name: String,
        brand: String,
        description: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    subtotal: Number,
    total: Number,
    shipping: Object,
    delivery_status: {
      type: String,
      default: "pending",
    },
    payment_status: String,
  },
  { timestamps: true }
);

// Model
const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
