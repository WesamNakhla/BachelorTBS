import express from "express";
import { getAllInventoryCustomer } from "../controllers/inventoryController"
const router  = express.Router();

router.get("/all-customer-inventory", getAllInventoryCustomer);

export default router;