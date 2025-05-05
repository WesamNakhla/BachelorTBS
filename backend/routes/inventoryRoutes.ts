import express from "express";
import { CreateInventory } from "../controllers/inventoryController"
const router  = express.Router();

router.post("/create-inventory", CreateInventory);

export default router;