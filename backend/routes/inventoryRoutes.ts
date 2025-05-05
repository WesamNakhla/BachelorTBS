import express from "express";
import { 
    CreateInventory,
    UpdateInventory,
    DeleteInventory,
    getAllCustomerForInventory,
    getAllInventoryPerCustomer
 } from "../controllers/inventoryController"
const router  = express.Router();

router.post("/create-inventory", CreateInventory);
router.put("/update-inventory/:id", UpdateInventory);
router.delete("/delete-inventory/:id", DeleteInventory);
router.get("/getAllCustomerInventory", getAllCustomerForInventory);
router.get("/getAllInventoryPerCustomer/:id", getAllInventoryPerCustomer);

export default router;