import express from "express";
import { saveUser, logUser, getProduct,createCheckoutSession, order, contact, updateUser, updatePassword, deleteUser } from "../controllers/controllers.js";

const router = express.Router();

// Register user
router.post("/register", saveUser);

// Login user
router.post("/login", logUser);

// Update user
router.put("/edit/:userId", updateUser);

// Update password
router.put("/edit/password/:userId", updatePassword);

// Delete user
router.delete("/delete/user/:userId", deleteUser);

// Get product
router.get("/product", getProduct);

// Stripe
router.post("/create-checkout-session", createCheckoutSession);

// Order
router.post("/webhook", express.raw({ type: "application/json" }), order);

// Contact
router.post("/contact", contact)

export default router;
