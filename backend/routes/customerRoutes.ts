import express from "express";


import { 
    CreateCustomer,
    GetAllCustomer,
    DeleteCustomer,
    UpdateCustomer
 } from "../controllers/customerController" 


const router = express.Router();


router.post("/create-customer", CreateCustomer);
router.get("/all-customer", GetAllCustomer);
router.delete("/delete-customer/:id", DeleteCustomer);
router.put("/update-customer/:id", UpdateCustomer);


export default router;
