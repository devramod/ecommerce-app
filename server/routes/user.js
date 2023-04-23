import express from "express";

import { getOrderDetails } from "../controllers/userControllers.js";

const router = express.Router();

// Get orders
router.get("/getorderdetails/:userId", getOrderDetails);

export default router;
