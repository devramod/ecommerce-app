import express from "express";
import {
  saveProduct,
  getProduct,
  deleteProduct,
  editProduct,
  getGeoData,
  getCustomers,
  getTransactions,
  getUserStatistics,
  getOrderStatistics,
  getIncomeStatistics,
  getIncomeLast7Days,
  getTotalOrders,
  getTotalEarnings,
  getIncomeLast30Days,
  getCustomersLast30Days,
  getOrdersLast30Days,
  getOrders,
  updateOrder,
  getContacts,
  deleteContact
} from "../controllers/adminControllers.js";

const router = express.Router();

// Save a product
router.post("/uploadProduct", saveProduct);

// Get a product
router.get("/find/:productId", getProduct);

// Delete a product
router.delete("/find/:productId", deleteProduct);

// Edit a product
router.put("/edit/:productId", editProduct);

// Get geo data
router.get("/getgeodata", getGeoData);

// Get customer data
router.get("/getcustomers", getCustomers);

// Get transaction data
router.get("/gettransactiondata", getTransactions);

// Current month and previous month customers
router.get("/getuserstatistics", getUserStatistics);

// Current month and previous month orders
router.get("/getordestatistics", getOrderStatistics);

// Current month and previous month income
router.get("/getincometatistics", getIncomeStatistics);

 // Last 7 days income
router.get("/getincomelast7days", getIncomeLast7Days);

 // Total orders
router.get("/getorders", getTotalOrders);

 // Total earnings
router.get("/getearnings", getTotalEarnings);

 // Last 30 days income
 router.get("/getincomelast30days", getIncomeLast30Days);

 // Last 30 days customers
 router.get("/getcustomerslast30days", getCustomersLast30Days);

 // Last 30 days orders
 router.get("/getorderslast30days", getOrdersLast30Days);

//  Get orders
router.get("/getorderdetails", getOrders);

// Update a order status
router.put("/find/:orderId", updateOrder);

// Get contacts
router.get("/getcontacts", getContacts);

// Delete a contact
router.delete("/find/:emailId", deleteContact);

export default router;
